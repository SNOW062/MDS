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
    labelEl.innerText = name;
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
            badgeText = 'BİTİB';
        } else if (f.status === 'wip') {
            badgeClass = 'badge-wip';
            badgeText = 'WIP';
        }
        
        const badgeEl = document.createElement('span');
        badgeEl.className = `task-badge ${badgeClass}`;
        badgeEl.innerText = badgeText;

        const coolifyLink = `/api/view-source?id=${encodeURIComponent(f.id)}`;
        const linkEl = document.createElement('a');
        linkEl.className = 'source-link';
        linkEl.href = coolifyLink;
        linkEl.target = '_blank';
        linkEl.innerText = '🔗 PHP Source';

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

    const masterTree = buildTree(masterTodoFiles);
    const todoTree = buildTree(assignedTodoFiles);
    const completedTree = buildTree(completedFiles);
    
    masterContainer.innerHTML = '';
    todoContainer.innerHTML = '';
    completedContainer.innerHTML = '';
    
    Object.keys(masterTree).sort().forEach(key => {
        masterContainer.appendChild(createTreeNode(key, masterTree[key], "", true, true));
    });

    Object.keys(todoTree).sort().forEach(key => {
        todoContainer.appendChild(createTreeNode(key, todoTree[key], "", true, false)); 
    });
    
    Object.keys(completedTree).sort().forEach(key => {
        completedContainer.appendChild(createTreeNode(key, completedTree[key], "", false, false)); 
    });
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

fetchData();
setInterval(fetchData, 4000);
