import { showToast, playNotificationSound } from './components/utils.js';

let allFiles = [];
let currentAssignments = [];
const expandedPaths = new Set(JSON.parse(localStorage.getItem('expandedPaths') || '[]'));
let activeViewerData = null;
let currentTab = 'tree';

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
                if (!current[part]) current[part] = {};
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
            if (child._file.status === 'completed') completed++;
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
            body: JSON.stringify({ file_ids: fileIds, action: checked ? 'add' : 'remove' })
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
    headerEl.className = `tree-header-row ${isFile ? 'file-row' : 'dir-row'} ${showCheckbox ? 'has-checkbox' : 'no-checkbox'}`;
    
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
            checkbox.checked = isMasterColumn ? isAssigned : true;
            
            checkbox.addEventListener('change', async (e) => {
                if (f.status === 'completed') {
                    alert(`⚠️ Məhdudiyyət: "${name}" faylı artıq tamamlanıb!`);
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
                        if (cb.dataset.fileId) targetFileIds.push(cb.dataset.fileId);
                    }
                    if (targetFileIds.length > 0) {
                        await toggleBatchAssignments(targetFileIds, isChecked);
                    }
                }
            });
        }
        headerEl.appendChild(checkbox);
    }

    const iconEl = document.createElement('span');
    iconEl.className = 'tree-icon';
    iconEl.innerText = isFile ? '📄' : '📁';
    headerEl.appendChild(iconEl);

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
            badgeText = '✓';
        } else if (f.status === 'wip') {
            badgeClass = 'badge-wip';
            badgeText = 'WIP';
        }
        
        const badgeEl = document.createElement('span');
        badgeEl.className = `task-badge ${badgeClass}`;
        badgeEl.innerText = badgeText;
        badgeEl.style.cursor = 'pointer';
        badgeEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSequenceModal(f.id);
        });

        const linkEl = document.createElement('a');
        linkEl.className = 'source-link';
        linkEl.href = '#';
        linkEl.innerText = '🔗';
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
        statsEl.className = 'tree-stats';
        statsEl.innerText = `(${stats.completed}/${stats.files})`;
        headerEl.appendChild(statsEl);
        
        const headerCheckbox = headerEl.querySelector('.tree-checkbox');
        if (headerCheckbox) {
            const allAssigned = isAllNodeAssigned(node);
            headerCheckbox.checked = allAssigned;
        }
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

function isAllNodeAssigned(node) {
    let result = true;
    function check(n) {
        Object.keys(n).forEach(k => {
            if (k === '_file') {
                const assigned = currentAssignments.some(a => a.file_ids.includes(n._file.id));
                if (!assigned && n._file.status !== 'completed') result = false;
            } else {
                check(n[k]);
            }
        });
    }
    check(node);
    return result;
}

function renderTree() {
    const colMasterBody = document.querySelector('#col-master .column-body');
    const colTodoBody = document.querySelector('#col-todo .column-body');
    const colCompletedBody = document.querySelector('#col-completed .column-body');
    
    if (!colMasterBody || !colTodoBody || !colCompletedBody) return;

    colMasterBody.innerHTML = '';
    colTodoBody.innerHTML = '';
    colCompletedBody.innerHTML = '';

    const masterTree = buildTree(allFiles);
    Object.keys(masterTree).sort().forEach(key => {
        colMasterBody.appendChild(createTreeNode(key, masterTree[key], "", true, true));
    });

    const activeAgentFiles = allFiles.filter(f => {
        const isAssigned = currentAssignments.some(a => a.file_ids.includes(f.id));
        return isAssigned && f.status !== 'completed';
    });
    const todoTree = buildTree(activeAgentFiles);
    Object.keys(todoTree).sort().forEach(key => {
        colTodoBody.appendChild(createTreeNode(key, todoTree[key], "", true, false));
    });

    const completedFiles = allFiles.filter(f => f.status === 'completed');
    const completedTree = buildTree(completedFiles);
    Object.keys(completedTree).sort().forEach(key => {
        colCompletedBody.appendChild(createTreeNode(key, completedTree[key], "", false, false));
    });
}

function renderAssignments() {
    const listEl = document.getElementById('agent-assignments-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    currentAssignments.forEach(agent => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px; font-size: 11px; margin-bottom: 6px; border: 1px solid rgba(255,255,255,0.05);';
        
        const activeCount = allFiles.filter(f => agent.file_ids.includes(f.id) && f.status !== 'completed').length;
        const doneCount = allFiles.filter(f => agent.file_ids.includes(f.id) && f.status === 'completed').length;
        
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:bold; color: #a5b4fc; margin-bottom: 4px;">
                <span>👤 ${agent.agent_name}</span>
                <span style="color:#10b981;">${doneCount} Bitib / ${activeCount} Aktiv</span>
            </div>
            <div style="opacity: 0.6; font-size: 10px;">ID-lər: ${agent.file_ids.join(', ') || 'Heç biri'}</div>
        `;
        listEl.appendChild(item);
    });
}

async function showSourceViewer(fileId) {
    try {
        const res = await fetch(`/api/source-data?id=${fileId}`);
        const data = await res.json();
        if (data.success) {
            activeViewerData = data;
            document.getElementById('source-viewer-title').innerText = `Menbe ve Hedef Kod: ${fileId}`;
            
            document.getElementById('src-php-title').innerText = `PHP: ${data.php_filename}`;
            document.getElementById('src-php-path').innerText = data.abs_php_path;
            document.getElementById('src-php-code').innerText = data.php_content;
            
            document.getElementById('src-rust-title').innerText = `Rust/TSX: ${data.rust_filename}`;
            document.getElementById('src-rust-path').innerText = data.abs_rust_path;
            document.getElementById('src-rust-code').innerText = data.rust_content;
            
            document.querySelector('.grid-panel').style.display = 'none';
            const viewerSection = document.getElementById('source-viewer-section');
            viewerSection.className = 'source-viewer-visible';
            
            document.querySelector('.header-search').style.visibility = 'hidden';
            document.querySelector('.stats-modal-btn').style.visibility = 'hidden';
        }
    } catch (e) {
        console.error("Source viewer loading error:", e);
    }
}

function closeSourceViewer() {
    activeViewerData = null;
    document.querySelector('.grid-panel').style.display = 'flex';
    const viewerSection = document.getElementById('source-viewer-section');
    viewerSection.className = 'source-viewer-hidden';
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

function openSequenceModal(fileId) {
    switchView('sequence');
    setTimeout(() => {
        const activeRow = document.getElementById(`seq-inline-item-${fileId}`);
        if (activeRow) activeRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

function renderSequenceInline(fileId) {
    const container = document.getElementById('seq-panel-body');
    if (!container) return;
    container.innerHTML = '';
    
    let filteredFiles = allFiles.filter(f => f.path.startsWith('ui/'));
    const sortedFiles = filteredFiles.sort((a, b) => {
        const seqA = a.sequence !== undefined ? a.sequence : 999;
        const seqB = b.sequence !== undefined ? b.sequence : 999;
        return seqA - seqB;
    });

    const phases = {};
    sortedFiles.forEach(f => {
        const phaseName = f.phase || "Mərhələ 5: Səhifələr & Görünüşlər";
        if (!phases[phaseName]) phases[phaseName] = [];
        phases[phaseName].push(f);
    });

    Object.keys(phases).forEach(phaseName => {
        const phaseFiles = phases[phaseName];
        if (phaseFiles.length === 0) return;
        
        const phaseHeader = document.createElement('div');
        phaseHeader.className = 'phase-group-header';
        phaseHeader.style.cssText = `
            background: rgba(99, 102, 241, 0.1);
            border-left: 3px solid #6366f1;
            padding: 10px 15px;
            margin: 15px 0 10px 0;
            font-weight: bold;
            font-size: 13px;
            color: #a5b4fc;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
        `;
        const completedInPhase = phaseFiles.filter(fl => fl.status === 'completed').length;
        phaseHeader.innerHTML = `<span>${phaseName}</span> <span style="opacity: 0.6;">(${completedInPhase}/${phaseFiles.length} Bitib)</span>`;
        container.appendChild(phaseHeader);

        phaseFiles.forEach(f => {
            const row = document.createElement('div');
            row.className = 'seq-file-row';
            row.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.05);
                padding: 10px 15px;
                margin-bottom: 6px;
                border-radius: 6px;
                transition: all 0.2s ease;
            `;
            row.id = `seq-inline-item-${f.id}`;
            if (f.id === fileId) {
                row.style.border = '1px solid #f59e0b';
                row.style.background = 'rgba(245, 158, 11, 0.05)';
            }
            const fileName = f.path.split('/').pop();
            const isUi = f.path.startsWith('ui/');
            const phpName = f.source && f.source !== 'app' && f.source !== 'Cargo.toml' && f.source !== 'README.md'
                ? f.source.split('/').pop() : '';
            let displayName = isUi ? fileName : (phpName || fileName);
            let refName = isUi ? (phpName ? `(Ref: ${phpName})` : '') : (phpName ? `(${fileName})` : '');
            const badgeText = f.status === 'completed' ? '✓' : (f.status === 'wip' ? 'WIP' : 'TODO');

            row.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px; opacity: 0.5; font-family: monospace; width: 75px;">${f.id}</span>
                    <span style="font-weight: 600; color: #a5b4fc;">${displayName}</span>
                    ${refName ? `<span style="font-size: 9.5px; opacity: 0.4; margin-left: 6px;">${refName}</span>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="status-badge ${f.status}" style="font-size: 9px; padding: 2px 6px;">${badgeText}</span>
                </div>
            `;
            container.appendChild(row);
        });
    });
}

function switchView(viewName) {
    currentTab = viewName;
    localStorage.setItem('activeMdsTab', viewName);
    const tabTree = document.getElementById('tab-tree');
    const tabSeq = document.getElementById('tab-sequence');
    const tabYarimciq = document.getElementById('tab-yarimciq');
    const tabAnalyzed = document.getElementById('tab-analyzed');
    const tabFilesToAnalyze = document.getElementById('tab-files-to-analyze');
    
    const treeGrid = document.getElementById('resizable-grid');
    const sequencePanel = document.getElementById('sequence-view-panel');
    const yarimciqPanel = document.getElementById('yarimciq-view-panel');
    const analyzedPanel = document.getElementById('analyzed-view-panel');
    const filesToAnalyzePanel = document.getElementById('files-to-analyze-view-panel');
    const viewerSection = document.getElementById('source-viewer-section');
    
    if (viewerSection) viewerSection.className = 'source-viewer-hidden';
    
    tabTree.classList.remove('active');
    tabSeq.classList.remove('active');
    if (tabYarimciq) tabYarimciq.classList.remove('active');
    if (tabAnalyzed) tabAnalyzed.classList.remove('active');
    if (tabFilesToAnalyze) tabFilesToAnalyze.classList.remove('active');
    
    if (treeGrid) treeGrid.style.setProperty('display', 'none', 'important');
    if (sequencePanel) sequencePanel.style.setProperty('display', 'none', 'important');
    if (yarimciqPanel) yarimciqPanel.style.setProperty('display', 'none', 'important');
    if (analyzedPanel) analyzedPanel.style.setProperty('display', 'none', 'important');
    if (filesToAnalyzePanel) filesToAnalyzePanel.style.setProperty('display', 'none', 'important');
    
    if (viewName === 'tree') {
        tabTree.classList.add('active');
        if (treeGrid) treeGrid.style.setProperty('display', 'flex', 'important');
    } else if (viewName === 'sequence') {
        tabSeq.classList.add('active');
        if (sequencePanel) sequencePanel.style.setProperty('display', 'flex', 'important');
        renderSequenceInline();
    } else if (viewName === 'yarimciq') {
        if (tabYarimciq) tabYarimciq.classList.add('active');
        if (yarimciqPanel) yarimciqPanel.style.setProperty('display', 'flex', 'important');
        window.MDSYarimciq.loadYarimciqData();
    } else if (viewName === 'analyzed') {
        if (tabAnalyzed) tabAnalyzed.classList.add('active');
        if (analyzedPanel) analyzedPanel.style.setProperty('display', 'flex', 'important');
        window.MDSAnalyzed.loadAnalyzedDataImpl();
    } else if (viewName === 'files-to-analyze') {
        if (tabFilesToAnalyze) tabFilesToAnalyze.classList.add('active');
        if (filesToAnalyzePanel) filesToAnalyzePanel.style.setProperty('display', 'flex', 'important');
        window.MDSFilesToAnalyze.renderFilesToAnalyze();
    }
}

function openLinkModal(fileId, source, path) {
    document.getElementById('link-file-id').value = fileId;
    document.getElementById('link-file-id-display').value = fileId;
    document.getElementById('link-source-path').value = source || '';
    document.getElementById('link-target-path').value = path || '';
    document.getElementById('link-modal').classList.add('active');
}

function closeLinkModal() {
    document.getElementById('link-modal').classList.remove('active');
}

async function saveLinkMapping(e) {
    e.preventDefault();
    const fileId = document.getElementById('link-file-id').value;
    const source = document.getElementById('link-source-path').value;
    const path = document.getElementById('link-target-path').value;
    try {
        const res = await fetch('/api/link-files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_id: fileId, source, path })
        });
        if (res.ok) {
            showToast('Fayl bağlantıları uğurla yeniləndi!');
            closeLinkModal();
            window.MDSAnalyzed.loadAnalyzedDataImpl();
        } else {
            showToast('Xəta baş verdi!');
        }
    } catch (err) {
        console.error(err);
    }
}

async function openCodePopup(filePath, title) {
    if (!filePath) {
        alert('Fayl bağlantısı tapılmadı!');
        return;
    }
    document.getElementById('code-popup-title').innerText = title;
    document.getElementById('code-popup-filepath').innerText = filePath;
    document.getElementById('code-popup-pre').innerText = 'Kod yüklənir...';
    document.getElementById('code-popup-modal').classList.add('active');
    try {
        const res = await fetch(`/api/file-content?path=${encodeURIComponent(filePath)}`);
        const data = await res.json();
        document.getElementById('code-popup-pre').innerText = data.content;
    } catch (err) {
        document.getElementById('code-popup-pre').innerText = 'Kodu yükləyərkən xəta baş verdi: ' + err.message;
    }
}

function closeCodePopup() {
    document.getElementById('code-popup-modal').classList.remove('active');
}

function copyPopupCode() {
    const codeText = document.getElementById('code-popup-pre').innerText;
    navigator.clipboard.writeText(codeText)
        .then(() => showToast('Kod panoya kopyalandı!'))
        .catch(err => alert('Kopyalama xətası: ' + err));
}

// Resizer logic
function initResizers() {
    const resizer1 = document.getElementById('resizer-1');
    const resizer2 = document.getElementById('resizer-2');
    const colMaster = document.getElementById('col-master');
    const colTodo = document.getElementById('col-todo');
    const colCompleted = document.getElementById('col-completed');
    if (!resizer1 || !resizer2) return;
    
    resizer1.addEventListener('mousedown', function(e) {
        e.preventDefault();
        document.addEventListener('mousemove', resizeMasterTodo);
        document.addEventListener('mouseup', () => document.removeEventListener('mousemove', resizeMasterTodo));
    });
    resizer2.addEventListener('mousedown', function(e) {
        e.preventDefault();
        document.addEventListener('mousemove', resizeTodoCompleted);
        document.addEventListener('mouseup', () => document.removeEventListener('mousemove', resizeTodoCompleted));
    });
    
    function resizeMasterTodo(e) {
        const width = e.clientX - colMaster.getBoundingClientRect().left;
        colMaster.style.flex = `0 0 ${width}px`;
    }
    function resizeTodoCompleted(e) {
        const width = e.clientX - colTodo.getBoundingClientRect().left;
        colTodo.style.flex = `0 0 ${width}px`;
    }
}

// Initialize
fetchData();
window.MDSYarimciq.loadYarimciqData();
if (window.MDSFilesToAnalyze && window.MDSFilesToAnalyze.renderFilesToAnalyze) {
    window.MDSFilesToAnalyze.renderFilesToAnalyze();
}
initResizers();

// Səhifə yenilənəndə sonuncu aktiv tabı bərpa edirik
const savedMdsTab = localStorage.getItem('activeMdsTab') || 'tree';
setTimeout(() => {
    switchView(savedMdsTab);
}, 200);

// Avtomatik refresh (setInterval) ləğv edildi, yalnız istifadəçi əl ilə yeniləyə bilər.

// Window namespace-ə bağlamaq
window.MDSApp = {
    fetchData,
    showSourceViewer,
    closeSourceViewer,
    copyPath,
    copyCode,
    switchView,
    openLinkModal,
    closeLinkModal,
    saveLinkMapping,
    openCodePopup,
    closeCodePopup,
    copyPopupCode,
    initResizers
};
