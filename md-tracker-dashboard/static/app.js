let allFiles = [];
let currentAssignments = [];
const expandedPaths = new Set(JSON.parse(localStorage.getItem('expandedPaths') || '[]'));

// Brauzer bildiriş səsi üçün audio kontekst (klikləyəndə xoş səs gəlməsi üçün)
function playNotificationSound() {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, context.currentTime); // A5 notu
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        oscillator.stop(context.currentTime + 0.15); // 150ms çalır
    } catch (e) {
        console.log("Audio play blocked by browser policy");
    }
}

// Vizual Toast Bildirişi yaradan funksiya
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'glass';
    toast.style.cssText = `
        background: rgba(16, 185, 129, 0.95);
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 13px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.1);
        min-width: 250px;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    toast.innerHTML = `🔔 ${message}`;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateY(-20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

async function fetchData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();
        
        allFiles = data.files;
        currentAssignments = data.assignments || [];
        
        updateStats(data);
        renderTree();
        renderAssignments();
    } catch (e) {
        console.error("Dashboard datası yüklənərkən xəta:", e);
    }
}

function updateStats(data) {
    document.getElementById('progress-percent').innerText = `${data.percentage}%`;
    document.getElementById('progress-fill').style.width = `${data.percentage}%`;
    
    document.getElementById('total-count').innerText = data.total_count;
    document.getElementById('completed-count').innerText = data.completed_count;
    
    const wipCount = allFiles.filter(f => f.status === 'wip').length;
    const todoCount = allFiles.filter(f => f.status === 'todo' || f.status === 'missing').length;
    
    document.getElementById('wip-count').innerText = wipCount;
    document.getElementById('todo-count').innerText = todoCount;
    
    const masterFilesTotal = allFiles.length;
    
    const assignedTodoCount = allFiles.filter(f => {
        const isAssigned = currentAssignments.some(a => a.file_ids.includes(f.id));
        return isAssigned && f.status !== 'completed';
    }).length;
    
    document.getElementById('master-list-count').innerText = masterFilesTotal;
    document.getElementById('todo-list-count').innerText = assignedTodoCount;
    document.getElementById('completed-list-count').innerText = data.completed_count;
}

function buildTree(files) {
    const root = {};
    files.forEach(f => {
        const parts = f.path.split('/');
        let current = root;
        parts.forEach((part, i) => {
            if (i === parts.length - 1) {
                current[part] = { _file: f };
            } else {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        });
    });
    return root;
}

function calculateNodeStats(node) {
    let folders = 0;
    let files = 0;
    let completed = 0;
    
    Object.keys(node).forEach(key => {
        if (key === '_file') return;
        const child = node[key];
        if (child._file) {
            files++;
            if (child._file.status === 'completed') {
                completed++;
            }
        } else {
            folders++;
            const stats = calculateNodeStats(child);
            folders += stats.folders;
            files += stats.files;
            completed += stats.completed;
        }
    });
    
    return { folders, files, completed };
}

function savePaths() {
    localStorage.setItem('expandedPaths', JSON.stringify(Array.from(expandedPaths)));
}

async function toggleBatchAssignments(fileIds, checked) {
    if (fileIds.length === 0) return;
    try {
        const res = await fetch('/api/assign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                file_ids: fileIds,
                action: checked ? 'add' : 'remove'
            })
        });
        if (res.ok) {
            playNotificationSound();
            showToast(checked ? `${fileIds.length} fayl agentə ötürüldü!` : `${fileIds.length} fayl geri çəkildi!`);
            await fetchData();
        }
    } catch (e) {
        console.error("Batch assignment error:", e);
    }
}

function createTreeNode(name, node, path = "", showCheckbox = true, isMasterColumn = false) {
    const fullPath = path ? `${path}/${name}` : name;
    const isFile = !!node._file;
    
    const nodeEl = document.createElement('div');
    nodeEl.className = 'tree-node';
    
    const headerEl = document.createElement('div');
    headerEl.className = `tree-header-row ${isFile ? 'file-row' : 'dir-row'}`;
    
    const toggleEl = document.createElement('span');
    toggleEl.className = 'tree-toggle';
    if (!isFile) {
        toggleEl.innerText = expandedPaths.has(fullPath) ? '▼' : '▶';
        
        headerEl.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox' || e.target.tagName === 'A') return;
            if (expandedPaths.has(fullPath)) {
                expandedPaths.delete(fullPath);
            } else {
                expandedPaths.add(fullPath);
            }
            savePaths();
            renderTree();
        });
    }
    
    headerEl.appendChild(toggleEl);

    if (showCheckbox) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'tree-checkbox';
        checkbox.dataset.path = fullPath;
        if (isFile) {
            checkbox.dataset.fileId = node._file.id;
            
            const f = node._file;
            const isAssigned = currentAssignments.some(a => a.file_ids.includes(f.id));
            
            if (isMasterColumn) {
                checkbox.checked = isAssigned;
            } else {
                checkbox.checked = true;
            }
            
            checkbox.addEventListener('change', async (e) => {
                if (f.status === 'completed') {
                    alert(`⚠️ Məhdudiyyət: "${name}" faylı artıq tamamlanıb! Tamamlanmış fayl görüləcək işlərə əlavə edilə bilməz.`);
                    e.target.checked = false;
                    return;
                }
                await toggleBatchAssignments([f.id], e.target.checked);
            });
        } else {
            checkbox.addEventListener('change', async (e) => {
                const isChecked = e.target.checked;
                const childrenContainer = nodeEl.querySelector('.tree-children');
                if (childrenContainer) {
                    const childCheckboxes = childrenContainer.querySelectorAll('.tree-checkbox');
                    const targetFileIds = [];
                    
                    for (const cb of childCheckboxes) {
                        if (cb.dataset.fileId) {
                            const fileObj = allFiles.find(fl => fl.id === cb.dataset.fileId);
                            if (fileObj && fileObj.status === 'completed') {
                                cb.checked = false;
                                continue;
                            }
                            if (fileObj && cb.checked !== isChecked) {
                                cb.checked = isChecked;
                                targetFileIds.push(cb.dataset.fileId);
                            }
                        }
                    }
                    
                    if (targetFileIds.length > 0) {
                        await toggleBatchAssignments(targetFileIds, isChecked);
                    }
                }
            });
        }
        headerEl.appendChild(checkbox);
    }

    const labelEl = document.createElement('span');
    labelEl.className = 'tree-label';
    
    if (isFile && node._file && node._file.source && node._file.source !== 'app' && node._file.source !== 'Cargo.toml' && node._file.source !== 'README.md') {
        const phpName = node._file.source.split('/').pop();
        const sizeKb = node._file.size_kb || 0;
        
        let sizeBadge = '';
        if (sizeKb > 0) {
            const badgeColor = sizeKb > 25 ? '#ef4444' : '#e59c0d'; // 25KB-dan böyüklər qırmızı, kiçiklər sarı
            sizeBadge = `<span style="color: ${badgeColor}; font-weight: 800; font-size: 11px; margin-left: 8px;">[${sizeKb} KB]</span>`;
        }
        
        const isUi = node._file.path.startsWith('ui/');
        if (isUi) {
            labelEl.innerHTML = `<strong>${name}</strong>${sizeBadge} <span style="font-size: 11px; opacity: 0.5; font-weight: normal; margin-left: 6px;">(Ref: ${phpName})</span>`;
        } else {
            labelEl.innerHTML = `<strong>${phpName}</strong>${sizeBadge} <span style="font-size: 11px; opacity: 0.5; font-weight: normal; margin-left: 6px;">(${name})</span>`;
        }
    } else {
        labelEl.innerText = name;
    }
    
    headerEl.appendChild(labelEl);

    if (isFile) {
        const f = node._file;
        
        const idEl = document.createElement('span');
        idEl.className = 'task-id';
        idEl.innerText = f.id;
        
        let badgeClass = 'badge-todo';
        let badgeText = 'TODO';
        if (f.status === 'completed') {
            badgeClass = 'badge-completed';
            badgeText = '✓';
        } else if (f.status === 'wip') {
            badgeClass = 'badge-wip';
            badgeText = 'WIP';
        }
        
        const badgeEl = document.createElement('span');
        badgeEl.className = `task-badge ${badgeClass}`;
        badgeEl.innerText = badgeText;
        badgeEl.style.cursor = 'pointer';
        if (f.status === 'completed') {
            badgeEl.title = 'Bitib (Mərhələli siyahını görmək üçün klikləyin)';
        } else {
            badgeEl.title = `${badgeText} (Mərhələli siyahını görmək üçün klikləyin)`;
        }
        badgeEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSequenceModal(f.id);
        });

        const linkEl = document.createElement('a');
        linkEl.className = 'source-link';
        linkEl.href = '#';
        linkEl.innerText = '🔗';
        linkEl.title = 'PHP Source';
        linkEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showSourceViewer(f.id);
        });

        headerEl.appendChild(idEl);
        headerEl.appendChild(badgeEl);
        headerEl.appendChild(linkEl);
    } else {
        const stats = calculateNodeStats(node);
        const statsEl = document.createElement('span');
        statsEl.className = 'dir-stats';
        statsEl.innerText = `[Q-${stats.folders} F-${stats.files}] (${stats.completed}/${stats.files})`;
        headerEl.appendChild(statsEl);
    }

    nodeEl.appendChild(headerEl);

    if (!isFile) {
        const childrenEl = document.createElement('div');
        childrenEl.className = 'tree-children';
        if (!expandedPaths.has(fullPath)) {
            childrenEl.classList.add('collapsed');
        }
        
        const keys = Object.keys(node).sort((a, b) => {
            const aIsDir = !node[a]._file;
            const bIsDir = !node[b]._file;
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });

        keys.forEach(key => {
            childrenEl.appendChild(createTreeNode(key, node[key], fullPath, showCheckbox, isMasterColumn));
        });
        nodeEl.appendChild(childrenEl);
    }

    return nodeEl;
}

let currentView = 'tree'; // 'tree' və ya 'sequence'

function switchView(view) {
    currentView = view;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (view === 'tree') {
        document.getElementById('tab-tree').classList.add('active');
    } else {
        document.getElementById('tab-sequence').classList.add('active');
    }
    renderTree();
}

function renderTree() {
    const masterContainer = document.getElementById('master-tree-container');
    const todoContainer = document.getElementById('todo-tasks');
    const completedContainer = document.getElementById('completed-tasks');
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    
    const masterTodoFiles = allFiles.filter(f => {
        const matchesSearch = !searchVal || f.path.toLowerCase().includes(searchVal) || f.id.toLowerCase().includes(searchVal);
        return matchesSearch;
    });

    const assignedTodoFiles = allFiles.filter(f => {
        const isAssigned = currentAssignments.some(a => a.file_ids.includes(f.id));
        const matchesSearch = !searchVal || f.path.toLowerCase().includes(searchVal) || f.id.toLowerCase().includes(searchVal);
        return isAssigned && f.status !== 'completed' && matchesSearch;
    });

    const completedFiles = allFiles.filter(f => {
        const matchesSearch = !searchVal || f.path.toLowerCase().includes(searchVal) || f.id.toLowerCase().includes(searchVal);
        return f.status === 'completed' && matchesSearch;
    });

    masterContainer.innerHTML = '';
    todoContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    if (currentView === 'tree') {
        // --- 📂 STANDART QOVLUQ AĞACI GÖRÜNÜŞÜ ---
        const masterTree = buildTree(masterTodoFiles);
        const todoTree = buildTree(assignedTodoFiles);
        const completedTree = buildTree(completedFiles);
        
        Object.keys(masterTree).sort().forEach(key => {
            masterContainer.appendChild(createTreeNode(key, masterTree[key], "", true, true));
        });

        Object.keys(todoTree).sort().forEach(key => {
            todoContainer.appendChild(createTreeNode(key, todoTree[key], "", true, false)); 
        });
        
        Object.keys(completedTree).sort().forEach(key => {
            completedContainer.appendChild(createTreeNode(key, completedTree[key], "", false, false)); 
        });
    } else {
        // --- ⚡ MƏRHƏLƏLİ YIĞILMA ARDICILLIĞI GÖRÜNÜŞÜ ---
        
        // Mərhələləri qruplaşdıran köməkçi funksiya
        function renderPhases(files, container, showCheckbox, isMaster) {
            // Yalnız frontend fayllarını süzək
            const uiFiles = files.filter(f => f.path.startsWith('ui/'));
            
            // Mərhələ adına görə qruplayaq
            const phases = {};
            uiFiles.forEach(f => {
                const phaseName = f.phase || "Mərhələ 5: Səhifələr & Görünüşlər";
                if (!phases[phaseName]) phases[phaseName] = [];
                phases[phaseName].push(f);
            });
            
            // Mərhələləri sıralı render edək
            const sortedPhases = Object.keys(phases).sort();
            sortedPhases.forEach(phaseName => {
                const phaseFiles = phases[phaseName];
                
                // Mərhələ Başlığı
                const header = document.createElement('div');
                header.className = 'phase-group-header';
                const compInPhase = phaseFiles.filter(fl => fl.status === 'completed').length;
                header.innerHTML = `<span>${phaseName}</span> <span style="opacity: 0.6;">(${compInPhase}/${phaseFiles.length} Bitib)</span>`;
                container.appendChild(header);
                
                // Mərhələ faylları
                phaseFiles.forEach(f => {
                    const node = { _file: f };
                    const fileName = f.path.split('/').pop();
                    container.appendChild(createTreeNode(fileName, node, f.path, showCheckbox, isMaster));
                });
            });
            
            if (uiFiles.length === 0) {
                container.innerHTML = '<div style="padding: 15px; text-align: center; opacity: 0.5; font-size: 12px;">Uyğun fayl tapılmadı.</div>';
            }
        }
        
        renderPhases(masterTodoFiles, masterContainer, true, true);
        renderPhases(assignedTodoFiles, todoContainer, true, false);
        renderPhases(completedFiles, completedContainer, false, false);
    }
}

function renderAssignments() {
    const container = document.getElementById('assignments-container');
    container.innerHTML = '';
    
    const activeAssign = currentAssignments.find(a => a.agent_name === "ActiveAgent");
    if (!activeAssign || activeAssign.file_ids.length === 0) {
        container.innerHTML = '<div class="stat-card"><span class="label">Heç bir iş seçilməyib.</span></div>';
        return;
    }
    
    const total = activeAssign.file_ids.length;
    const completed = allFiles.filter(f => activeAssign.file_ids.includes(f.id) && f.status === 'completed').length;
    const pct = Math.round((completed / total) * 100) || 0;
    
    const card = document.createElement('div');
    card.className = 'agent-assignment-card';
    card.innerHTML = `
        <div class="agent-name">Ümumi Seçim Proqresi</div>
        <div class="agent-details">Aktiv Plan: ${completed}/${total} bitib (${pct}%)</div>
        <div class="progress-track" style="margin-top: 6px; height: 4px;">
            <div class="progress-fill" style="width: ${pct}%"></div>
        </div>
    `;
    container.appendChild(card);
}

document.getElementById('search-input').addEventListener('input', renderTree);

// ===== SPA SOURSE VIEWER METODLARI =====
let activeViewerData = null;

async function showSourceViewer(fileId) {
    try {
        const res = await fetch(`/api/source-data?id=${encodeURIComponent(fileId)}`);
        const data = await res.json();
        
        if (data.success) {
            activeViewerData = data;
            
            // Başlıqlar
            document.getElementById('viewer-file-id').innerText = data.file_id;
            
            // PHP Panel məlumatları
            const phpRelativePath = data.abs_php_path.replace(/\\/g, '/').split('coolify-source/')[1] || data.php_filename;
            document.getElementById('php-title').innerText = `PHP: ${phpRelativePath}`;
            document.getElementById('php-path-text').innerText = data.abs_php_path;
            document.getElementById('php-code-raw').innerText = data.php_content;
            
            // Rust Panel məlumatları
            const rustRelativePath = data.abs_rust_path.replace(/\\/g, '/').split('rust-coolify/')[1] || data.rust_filename;
            document.getElementById('rust-title').innerText = `Rust / Frontend: ${rustRelativePath}`;
            document.getElementById('rust-path-text').innerText = data.abs_rust_path;
            document.getElementById('rust-code-raw').innerText = data.rust_content;
            
            // Görünüşü dəyiş
            document.querySelector('.grid-panel').style.display = 'none';
            const viewerSection = document.getElementById('source-viewer-section');
            viewerSection.className = 'source-viewer-visible';
            
            // Header axtarışını və digər elementləri gizlət/dondur
            document.querySelector('.header-search').style.visibility = 'hidden';
            document.querySelector('.stats-modal-btn').style.visibility = 'hidden';
        } else {
            alert('Fayl məlumatları çəkilə bilmədi.');
        }
    } catch (e) {
        console.error("Mənbə kodu çəkilərkən xəta:", e);
    }
}

function closeSourceViewer() {
    activeViewerData = null;
    
    // Görünüşü qaytar (flex olaraq)
    document.querySelector('.grid-panel').style.display = 'flex';
    const viewerSection = document.getElementById('source-viewer-section');
    viewerSection.className = 'source-viewer-hidden';
    
    // Header elementlərini bərpa et
    document.querySelector('.header-search').style.visibility = 'visible';
    document.querySelector('.stats-modal-btn').style.visibility = 'visible';
}

function copyPath(type) {
    if (!activeViewerData) return;
    const path = type === 'php' ? activeViewerData.abs_php_path : activeViewerData.abs_rust_path;
    navigator.clipboard.writeText(path);
    
    const btn = document.getElementById(`btn-${type}-path`);
    btn.innerText = '✅ Yol Kopyalandı!';
    setTimeout(() => btn.innerText = 'Fayl Yolunu Kopyala', 1500);
}

function copyCode(type) {
    if (!activeViewerData) return;
    const code = type === 'php' ? activeViewerData.php_content : activeViewerData.rust_content;
    navigator.clipboard.writeText(code);
    
    const btn = document.getElementById(`btn-${type}-code`);
    btn.innerText = '✅ Kod Kopyalandı!';
    setTimeout(() => btn.innerText = 'Kodu Kopyala', 1500);
}

// ===== RESIZABLE COLUMNS LOGIC =====
function initResizers() {
    const grid = document.getElementById('resizable-grid');
    const resizer1 = document.getElementById('resizer-1');
    const resizer2 = document.getElementById('resizer-2');
    
    const colMaster = document.getElementById('col-master');
    const colTodo = document.getElementById('col-todo');
    const colCompleted = document.getElementById('col-completed');
    
    if (!resizer1 || !resizer2) return;
    
    // Resizer 1 (Master ve Todo arasi)
    resizer1.addEventListener('mousedown', function(e) {
        e.preventDefault();
        resizer1.classList.add('resizing');
        document.addEventListener('mousemove', resizeMasterTodo);
        document.addEventListener('mouseup', stopResize1);
    });
    
    function resizeMasterTodo(e) {
        const gridRect = grid.getBoundingClientRect();
        const leftWidth = e.clientX - gridRect.left;
        
        // Limitlər (min 200px, max grid-in 70%-i)
        if (leftWidth > 200 && leftWidth < gridRect.width - 400) {
            const masterPercent = (leftWidth / gridRect.width) * 100;
            const remaining = 100 - masterPercent;
            
            // Cari Todo ve Completed-in nisbetini qoruyaq
            const todoWidth = colTodo.getBoundingClientRect().width;
            const completedWidth = colCompleted.getBoundingClientRect().width;
            const ratio = todoWidth / (todoWidth + completedWidth || 1);
            
            colMaster.style.width = `${masterPercent}%`;
            colTodo.style.width = `${remaining * ratio}%`;
            colCompleted.style.width = `${remaining * (1 - ratio)}%`;
        }
    }
    
    function stopResize1() {
        resizer1.classList.remove('resizing');
        document.removeEventListener('mousemove', resizeMasterTodo);
        document.removeEventListener('mouseup', stopResize1);
    }
    
    // Resizer 2 (Todo ve Completed arasi)
    resizer2.addEventListener('mousedown', function(e) {
        e.preventDefault();
        resizer2.classList.add('resizing');
        document.addEventListener('mousemove', resizeTodoCompleted);
        document.addEventListener('mouseup', stopResize2);
    });
    
    function resizeTodoCompleted(e) {
        const gridRect = grid.getBoundingClientRect();
        const masterWidth = colMaster.getBoundingClientRect().width;
        const totalRemainingWidth = gridRect.width - masterWidth;
        
        const todoWidth = e.clientX - colTodo.getBoundingClientRect().left;
        
        if (todoWidth > 200 && (totalRemainingWidth - todoWidth) > 200) {
            const todoPercent = (todoWidth / gridRect.width) * 100;
            const masterPercent = (masterWidth / gridRect.width) * 100;
            const completedPercent = 100 - masterPercent - todoPercent;
            
            colTodo.style.width = `${todoPercent}%`;
            colCompleted.style.width = `${completedPercent}%`;
        }
    }
    
    function stopResize2() {
        resizer2.classList.remove('resizing');
        document.removeEventListener('mousemove', resizeTodoCompleted);
        document.removeEventListener('mouseup', stopResize2);
    }
}

// Resizer-i işə salaq
setTimeout(initResizers, 100);

function openSequenceModal(fileId) {
    const modal = document.getElementById('sequence-modal');
    const modalBody = document.getElementById('seq-modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = '';
    
    let matchedKeyword = '';
    if (fileId) {
        const clickedFile = allFiles.find(f => f.id === fileId);
        if (clickedFile) {
            const pathLower = clickedFile.path.toLowerCase();
            const categories = ['server', 'project', 'database', 'security', 'setting', 'team', 'storage', 'auth', 'service', 'oauth', 'toast', 'websocket', 'deploy'];
            for (const cat of categories) {
                if (pathLower.includes(cat)) {
                    matchedKeyword = cat;
                    break;
                }
            }
        }
    }

    // Set modal title dynamically
    const titleEl = modal.querySelector('.modal-header h2');
    if (titleEl) {
        if (matchedKeyword) {
            const displayCat = matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1);
            titleEl.innerHTML = `⚡ Yığılma Ardıcıllığı: <span style="color: #e59c0d;">${displayCat}</span>`;
        } else {
            titleEl.innerHTML = `⚡ Yığılma Ardıcıllığı & Yol Xəritəsi`;
        }
    }

    // Filter files: show only files starting with 'ui/' that belong to the matched category (if any)
    let filteredFiles = allFiles.filter(f => f.path.startsWith('ui/'));
    if (matchedKeyword) {
        filteredFiles = filteredFiles.filter(f => f.path.toLowerCase().includes(matchedKeyword));
    }

    // Sort the filtered files by sequence number
    const sortedFiles = filteredFiles.sort((a, b) => {
        const seqA = a.sequence !== undefined ? a.sequence : 999;
        const seqB = b.sequence !== undefined ? b.sequence : 999;
        return seqA - seqB;
    });

    // Group files by phase name
    const phases = {};
    sortedFiles.forEach(f => {
        const phaseName = f.phase || "Mərhələ 5: Səhifələr & Görünüşlər";
        if (!phases[phaseName]) {
            phases[phaseName] = [];
        }
        phases[phaseName].push(f);
    });

    // Render phases and their files
    Object.keys(phases).forEach(phaseName => {
        const phaseFiles = phases[phaseName];
        if (phaseFiles.length === 0) return;
        
        // Render phase header
        const phaseHeader = document.createElement('div');
        phaseHeader.className = 'phase-group-header';
        const completedInPhase = phaseFiles.filter(fl => fl.status === 'completed').length;
        phaseHeader.innerHTML = `<span>${phaseName}</span> <span style="opacity: 0.6;">(${completedInPhase}/${phaseFiles.length} Bitib)</span>`;
        modalBody.appendChild(phaseHeader);

        // Render files inside the phase
        phaseFiles.forEach(f => {
            const row = document.createElement('div');
            row.className = 'seq-file-row';
            row.id = `seq-item-${f.id}`;
            
            if (f.id === fileId) {
                row.classList.add('highlight-file');
            }

            const fileName = f.path.split('/').pop();
            const isUi = f.path.startsWith('ui/');
            
            const phpName = f.source && f.source !== 'app' && f.source !== 'Cargo.toml' && f.source !== 'README.md'
                ? f.source.split('/').pop()
                : '';
                
            let displayName = fileName;
            let refName = '';
            
            if (isUi) {
                displayName = fileName;
                refName = phpName ? `(Ref: ${phpName})` : '';
            } else {
                displayName = phpName || fileName;
                refName = phpName ? `(${fileName})` : '';
            }
                
            const badgeClass = f.status === 'completed' ? 'badge-completed' : (f.status === 'wip' ? 'badge-wip' : 'badge-todo');
            const badgeText = f.status === 'completed' ? '✓' : (f.status === 'wip' ? 'WIP' : 'TODO');

            row.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px; opacity: 0.5; font-family: monospace; width: 75px;">${f.id}</span>
                    <span style="font-weight: 600; color: #a5b4fc;">${displayName}</span>
                    ${refName ? `<span style="font-size: 9.5px; opacity: 0.4; margin-left: 6px;">${refName}</span>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="task-badge ${badgeClass}" style="position: static; font-size: 8px; padding: 1px 4px; border-radius: 3px; display: flex; align-items: center; justify-content: center;">${badgeText}</span>
                </div>
            `;
            modalBody.appendChild(row);
        });
    });

    // Open modal
    modal.classList.add('active');

    // Scroll the highlighted element into view
    setTimeout(() => {
        const targetEl = document.getElementById(`seq-item-${fileId}`);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 200);
}

function closeSequenceModal() {
    const modal = document.getElementById('sequence-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ===== TAB VIEW SWITCHING (QOVLUQ VS SEQUENCE VS YARIMÇIQ) =====
let yarimciqData = [];
let currentTab = 'tree';

async function loadYarimciqData() {
    try {
        const res = await fetch('/api/yarimciq');
        const data = await res.json();
        yarimciqData = (data && data.files) ? data.files : [];
        
        const badge = document.getElementById('yarimciq-badge-count');
        if (badge) {
            badge.innerText = (data && data.total_count) ? data.total_count : 0;
        }
        
        renderYarimciqList();
    } catch (e) {
        console.error("Yarımçıq fayllar datası yüklənərkən xəta:", e);
    }
}

let selectedYarimciqIds = new Set();

function toggleSelectYarimciq(id, isChecked) {
    if (isChecked) {
        selectedYarimciqIds.add(id);
    } else {
        selectedYarimciqIds.delete(id);
    }
    updateSelectedSpecsBtn();
}

function toggleSelectAllYarimciq(masterCb) {
    const checkboxes = document.querySelectorAll('.yarimciq-cb');
    checkboxes.forEach(cb => {
        cb.checked = masterCb.checked;
        if (masterCb.checked) {
            selectedYarimciqIds.add(cb.value);
        } else {
            selectedYarimciqIds.delete(cb.value);
        }
    });
    updateSelectedSpecsBtn();
}

function updateSelectedSpecsBtn() {
    const btn = document.getElementById('btn-copy-selected-specs');
    const countSpan = document.getElementById('selected-specs-count');
    if (!btn || !countSpan) return;

    const count = selectedYarimciqIds.size;
    countSpan.innerText = count;
    btn.style.display = count > 0 ? 'inline-block' : 'none';
}

function renderYarimciqList() {
    const tbody = document.getElementById('yarimciq-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const searchVal = (document.getElementById('yarimciq-search')?.value || '').toLowerCase();
    const statusVal = document.getElementById('yarimciq-status-filter')?.value || 'all';
    
    let filtered = yarimciqData.filter(item => {
        const matchSearch = item.path.toLowerCase().includes(searchVal) || 
                            item.id.toLowerCase().includes(searchVal) || 
                            item.reason.toLowerCase().includes(searchVal) ||
                            (item.source && item.source.toLowerCase().includes(searchVal));
        const matchStatus = statusVal === 'all' || item.status === statusVal;
        return matchSearch && matchStatus;
    });
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 30px;">Hər hansı bir yarımçıq fayl tapılmadı.</td></tr>`;
        return;
    }
    
    filtered.forEach(item => {
        const tr = document.createElement('tr');
        const isChecked = selectedYarimciqIds.has(item.id);
        
        let statusBadgeText = item.status;
        if (item.status === 'missing') statusBadgeText = 'ƏSKİK';
        if (item.status === 'skelet') statusBadgeText = 'SKELET';
        if (item.status === 'yarimciq') statusBadgeText = 'YARIMÇIQ (TODO)';
        if (item.status === 'wip') statusBadgeText = 'GÖZLƏYİR';
        
        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="yarimciq-cb" value="${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleSelectYarimciq('${item.id}', this.checked)" style="cursor: pointer; width: 14px; height: 14px;"></td>
            <td><code class="task-id">${item.id}</code></td>
            <td style="font-family: monospace; font-size: 11.5px; color: #a5b4fc;">${item.path}</td>
            <td><span style="font-size: 11px; opacity: 0.7;">${item.category || 'General'}</span></td>
            <td><span class="status-badge ${item.status}">${statusBadgeText}</span></td>
            <td style="font-size: 11.5px; color: #cbd5e1;">${item.reason}</td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="action-btn" onclick="showFileSpec('${item.id}')">⚙️ Metodlar</button>
                    <button class="action-btn" onclick="navigator.clipboard.writeText('${item.path}'); showToast('Fayl yolu kopyalandı!')">📋 Yol</button>
                    <button class="action-btn btn-success" onclick="showSourceViewer('${item.id}')">👁️ Kod</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateSelectedSpecsBtn();
}

async function copySelectedSpecsAsText() {
    if (selectedYarimciqIds.size === 0) return;
    
    const ids = Array.from(selectedYarimciqIds);
    let fullText = `=== SEÇİLMİŞ YARIMÇIQ FAYLLAR VƏ METOD SİYAHISI (Cəmi: ${ids.length} Fayl) ===\n\n`;
    
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        try {
            const res = await fetch(`/api/file-spec?id=${encodeURIComponent(id)}`);
            const data = await res.json();
            
            fullText += `📌 [Fayl ${i+1}/${ids.length}] ID: ${data.file_id}\n`;
            fullText += `Rust Faylı: ${data.rust_path}\n`;
            fullText += `PHP Orijinalı: ${data.php_path}\n`;
            fullText += `Tamamlanma Dərəcəsi: ${data.completion_percentage}%\n`;
            
            fullText += `❌ ƏSKİK METOD VƏ FUNKSİYALAR (${data.missing_functions ? data.missing_functions.length : 0}):\n`;
            if (data.missing_functions && data.missing_functions.length > 0) {
                data.missing_functions.forEach(fn => {
                    fullText += `  - ❌ ${fn}() [ƏSKİKDİR]\n`;
                });
            } else {
                fullText += `  (Bütün PHP metodları tamamilə yazılıb)\n`;
            }
            
            fullText += `\n✅ YAZILMIŞ VƏ TAMAMLANMIŞ METODLAR (${data.completed_functions ? data.completed_functions.length : 0}):\n`;
            if (data.completed_functions && data.completed_functions.length > 0) {
                data.completed_functions.forEach(fn => {
                    fullText += `  - ✅ ${fn}() [YAZILIB]\n`;
                });
            } else {
                fullText += `  (Hələ heç bir metod yazılmayıb)\n`;
            }
            fullText += `--------------------------------------------------\n\n`;
        } catch (e) {
            console.error(`Spec fetch error for ${id}:`, e);
        }
    }
    
    navigator.clipboard.writeText(fullText);
    showToast(`📋 Seçilmiş ${ids.length} faylın bütün metodları mətn olaraq kopyalandı!`);
}

let activeSpecData = null;

async function showFileSpec(fileId) {
    try {
        const res = await fetch(`/api/file-spec?id=${encodeURIComponent(fileId)}`);
        const data = await res.json();
        activeSpecData = data;
        
        const modal = document.getElementById('spec-modal');
        const modalBody = document.getElementById('spec-modal-body');
        const fileIdSpan = document.getElementById('spec-file-id');
        
        if (!modal || !modalBody) return;
        
        fileIdSpan.innerText = fileId;
        
        let html = `
            <div style="margin-bottom: 15px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 12px; opacity: 0.7;">Rust Faylı: <code style="color: #60a5fa;">${data.rust_path}</code></div>
                <div style="font-size: 12px; opacity: 0.7; margin-top: 3px;">PHP Orijinalı: <code style="color: #a7f3d0;">${data.php_path}</code></div>
                <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                    <strong style="font-size: 13px;">Tamamlanma Dərəcəsi:</strong>
                    <div style="flex: 1; background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${data.completion_percentage}%; background: ${data.completion_percentage === 100 ? '#10b981' : '#f59e0b'}; height: 100%;"></div>
                    </div>
                    <span style="font-weight: 800; font-size: 12px;">${data.completion_percentage}%</span>
                </div>
            </div>

            <h3 style="font-size: 14px; color: #f87171; margin-top: 15px;">❌ ƏSKİK METOD VƏ FUNKSİYALAR (${data.missing_functions ? data.missing_functions.length : 0})</h3>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px;">
        `;

        if (data.missing_functions && data.missing_functions.length > 0) {
            data.missing_functions.forEach(fn => {
                html += `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-family: monospace; font-size: 12px; color: #fca5a5;">❌ ${fn}()</span>
                        <span style="font-size: 10px; color: #ef4444; font-weight: bold;">ƏSKİKDİR</span>
                    </div>
                `;
            });
        } else {
            html += `<div style="color: #10b981; font-size: 12px; padding: 5px;">✅ Bütün PHP metodları tamamilə yazılıb!</div>`;
        }

        html += `
            <h3 style="font-size: 14px; color: #34d399; margin-top: 15px;">✅ YAZILMIŞ VƏ TAMAMLANMIŞ METODLAR (${data.completed_functions ? data.completed_functions.length : 0})</h3>
            <div style="display: flex; flex-direction: column; gap: 6px;">
        `;

        if (data.completed_functions && data.completed_functions.length > 0) {
            data.completed_functions.forEach(fn => {
                html += `
                    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-family: monospace; font-size: 12px; color: #6ee7b7;">✅ ${fn}()</span>
                        <span style="font-size: 10px; color: #10b981; font-weight: bold;">YAZILIB</span>
                    </div>
                `;
            });
        } else {
            html += `<div style="color: #94a3b8; font-size: 12px; padding: 5px;">Hələ heç bir metod yazılmayıb.</div>`;
        }

        modalBody.innerHTML = html;
        modal.classList.add('active');
    } catch (e) {
        console.error("File spec çəkilərkən xəta:", e);
    }
}

function copySpecAsText() {
    if (!activeSpecData) return;
    
    let text = `⚙️ Fayl Metod və Funksiya Siyahısı (${activeSpecData.file_id})\n`;
    text += `Rust Faylı: ${activeSpecData.rust_path}\n`;
    text += `PHP Orijinalı: ${activeSpecData.php_path}\n`;
    text += `Tamamlanma Dərəcəsi: ${activeSpecData.completion_percentage}%\n\n`;
    
    text += `❌ ƏSKİK METOD VƏ FUNKSİYALAR (${activeSpecData.missing_functions ? activeSpecData.missing_functions.length : 0}):\n`;
    if (activeSpecData.missing_functions && activeSpecData.missing_functions.length > 0) {
        activeSpecData.missing_functions.forEach(fn => {
            text += `  - ❌ ${fn}() [ƏSKİKDİR]\n`;
        });
    } else {
        text += `  (Bütün PHP metodları tamamilə yazılıb)\n`;
    }
    
    text += `\n✅ YAZILMIŞ VƏ TAMAMLANMIŞ METODLAR (${activeSpecData.completed_functions ? activeSpecData.completed_functions.length : 0}):\n`;
    if (activeSpecData.completed_functions && activeSpecData.completed_functions.length > 0) {
        activeSpecData.completed_functions.forEach(fn => {
            text += `  - ✅ ${fn}() [YAZILIB]\n`;
        });
    } else {
        text += `  (Hələ heç bir metod yazılmayıb)\n`;
    }

    navigator.clipboard.writeText(text);
    showToast('📋 Bütün metod siyahısı mətn olaraq kopyalandı!');
}

function closeSpecModal() {
    activeSpecData = null;
    const modal = document.getElementById('spec-modal');
    if (modal) modal.classList.remove('active');
}

function switchView(viewName) {
    currentTab = viewName;
    const tabTree = document.getElementById('tab-tree');
    const tabSeq = document.getElementById('tab-sequence');
    const tabYarimciq = document.getElementById('tab-yarimciq');
    
    const treeGrid = document.getElementById('resizable-grid');
    const yarimciqPanel = document.getElementById('yarimciq-view-panel');
    const viewerSection = document.getElementById('source-viewer-section');
    
    if (viewerSection) viewerSection.className = 'source-viewer-hidden';
    
    tabTree.classList.remove('active');
    tabSeq.classList.remove('active');
    if (tabYarimciq) tabYarimciq.classList.remove('active');
    
    if (viewName === 'tree') {
        tabTree.classList.add('active');
        treeGrid.style.setProperty('display', 'flex', 'important');
        if (yarimciqPanel) yarimciqPanel.style.setProperty('display', 'none', 'important');
        closeSequenceModal();
    } else if (viewName === 'sequence') {
        tabSeq.classList.add('active');
        openSequenceModal();
    } else if (viewName === 'yarimciq') {
        if (tabYarimciq) tabYarimciq.classList.add('active');
        treeGrid.style.setProperty('display', 'none', 'important');
        if (yarimciqPanel) yarimciqPanel.style.setProperty('display', 'flex', 'important');
        closeSequenceModal();
        loadYarimciqData();
    }
}

fetchData();
loadYarimciqData();
setInterval(fetchData, 4000);

