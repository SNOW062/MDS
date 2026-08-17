import { showToast } from './utils.js';

let allAnalyzedEntries = [];
const expandedAnalyzedPaths = new Set(JSON.parse(localStorage.getItem('expandedAnalyzedPaths') || '[]'));
let activeAnalysisEntry = null;

export async function loadAnalyzedDataImpl() {
    try {
        const res = await fetch('/api/analyzed');
        const data = await res.json();
        allAnalyzedEntries = data.entries || [];
        filterAnalyzedTree();
    } catch (e) {
        console.error("Analiz datası yüklenirken hata:", e);
    }
}

export function filterAnalyzedTree() {
    const searchVal = (document.getElementById('analyzed-search')?.value || '').toLowerCase();
    let filtered = allAnalyzedEntries;
    if (searchVal) {
        filtered = allAnalyzedEntries.filter(entry => {
            const phpMatch = entry.php_file && entry.php_file.toLowerCase().includes(searchVal);
            const tsMatch = entry.ts_file && entry.ts_file.toLowerCase().includes(searchVal);
            const rsMatch = entry.rs_file && entry.rs_file.toLowerCase().includes(searchVal);
            const idMatch = entry.id && entry.id.toLowerCase().includes(searchVal);
            return phpMatch || tsMatch || rsMatch || idMatch;
        });
        
        filtered.forEach(entry => {
            let cleanPath = entry.php_file || "";
            if (cleanPath.startsWith("file:///d:/MDS/coolify-source/")) {
                cleanPath = cleanPath.replace("file:///d:/MDS/coolify-source/", "");
            } else if (cleanPath.startsWith("file:///")) {
                cleanPath = cleanPath.replace("file:///", "");
            }
            if (!cleanPath) {
                cleanPath = `Bağlantısızlar/${entry.id}`;
            }
            const parts = cleanPath.split('/');
            let currentPath = "";
            parts.forEach((part, i) => {
                if (i < parts.length - 1) {
                    currentPath = currentPath ? `${currentPath}/${part}` : part;
                    expandedAnalyzedPaths.add(currentPath);
                }
            });
        });
    }
    renderAnalyzedList(filtered);
}

function buildAnalyzedTree(entries) {
    const root = {};
    entries.forEach(entry => {
        let cleanPath = entry.php_file || "";
        if (cleanPath.startsWith("file:///d:/MDS/coolify-source/")) {
            cleanPath = cleanPath.replace("file:///d:/MDS/coolify-source/", "");
        } else if (cleanPath.startsWith("file:///")) {
            cleanPath = cleanPath.replace("file:///", "");
        }
        if (!cleanPath) {
            cleanPath = `Bağlantısızlar/${entry.id}`;
        }
        const parts = cleanPath.split('/');
        let current = root;
        parts.forEach((part, i) => {
            if (i === parts.length - 1) {
                current[part] = { _entry: entry };
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

function getGapsCount(entry) {
    let count = 0;
    if (!entry.analysis) return 0;
    if (entry.analysis.analysis && entry.analysis.analysis.missing_parts && entry.analysis.analysis.missing_parts.gaps) {
        count += entry.analysis.analysis.missing_parts.gaps.length;
    }
    if (entry.analysis.php_analysis && entry.analysis.php_analysis.analysis && entry.analysis.php_analysis.analysis.missing_parts && entry.analysis.php_analysis.analysis.missing_parts.gaps) {
        count += entry.analysis.php_analysis.analysis.missing_parts.gaps.length;
    }
    if (entry.analysis.target_analysis && entry.analysis.target_analysis.analysis && entry.analysis.target_analysis.analysis.missing_parts && entry.analysis.target_analysis.analysis.missing_parts.gaps) {
        count += entry.analysis.target_analysis.analysis.missing_parts.gaps.length;
    }
    return count;
}

function createAnalyzedTreeNode(name, node, path = "") {
    const fullPath = path ? `${path}/${name}` : name;
    const isFile = !!node._entry;
    
    const nodeEl = document.createElement('div');
    nodeEl.className = 'tree-node';
    
    const headerEl = document.createElement('div');
    headerEl.className = `tree-header-row ${isFile ? 'file-row' : 'dir-row'}`;
    headerEl.style.cssText = `
        display: grid;
        grid-template-columns: ${isFile ? '24px auto 1fr auto' : '24px auto 1fr'};
        align-items: center;
        padding: 6px 12px;
        border-radius: 8px;
        margin-bottom: 3px;
        cursor: pointer;
        transition: background 0.15s;
        gap: 12px;
    `;
    
    const iconEl = document.createElement('span');
    iconEl.className = 'tree-icon';
    iconEl.innerText = isFile ? '📄' : '📁';
    iconEl.style.marginRight = '8px';
    headerEl.appendChild(iconEl);
    
    const labelEl = document.createElement('span');
    labelEl.className = 'tree-label';
    labelEl.innerText = name;
    labelEl.style.cssText = `
        font-weight: ${isFile ? '600' : 'bold'};
        color: ${isFile ? '#e4e4e7' : '#f59e0b'};
        margin-right: 12px;
    `;
    
    if (isFile) {
        labelEl.style.textDecoration = 'underline';
        labelEl.title = 'Faylın kodunu görmək üçün klikləyin';
        labelEl.addEventListener('click', (e) => {
            e.stopPropagation();
            window.MDSApp.openCodePopup(node._entry.php_file, 'Coolify PHP Mənbə Kodu');
        });
    }
    headerEl.appendChild(labelEl);
    
    if (isFile) {
        const entry = node._entry;
        const detailsEl = document.createElement('div');
        detailsEl.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            margin-left: auto;
            font-size: 11px;
        `;
        
        const getBasename = (url) => url ? url.split('/').pop() : 'N/A';
        const linksContainer = document.createElement('div');
        linksContainer.style.cssText = 'display: flex; gap: 6px;';
        
        if (entry.ts_file) {
            const badge = document.createElement('span');
            badge.style.cssText = `background: rgba(129, 140, 248, 0.15); color: #818cf8; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(129, 140, 248, 0.25); cursor: pointer;`;
            badge.innerText = `TSX: ${getBasename(entry.ts_file)}`;
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                window.MDSApp.openCodePopup(entry.ts_file, 'MasterDeploy TSX Hədəf Kodu');
            });
            linksContainer.appendChild(badge);
        }
        
        if (entry.rs_file) {
            const badge = document.createElement('span');
            badge.style.cssText = `background: rgba(96, 165, 250, 0.15); color: #60a5fa; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(96, 165, 250, 0.25); cursor: pointer;`;
            badge.innerText = `RS: ${getBasename(entry.rs_file)}`;
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                window.MDSApp.openCodePopup(entry.rs_file, 'MasterDeploy Rust Hədəf Kodu');
            });
            linksContainer.appendChild(badge);
        }
        
        if (!entry.ts_file && !entry.rs_file) {
            const badge = document.createElement('span');
            badge.style.cssText = 'color: #ef4444; font-size: 10px;';
            badge.innerText = '⚠️ Hədəf Bağlı deyil';
            linksContainer.appendChild(badge);
        }
        
        const gapCount = getGapsCount(entry);
        let gapsHtml = '';
        if (gapCount > 0) {
            gapsHtml = `<span style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(239, 68, 68, 0.25); font-weight: bold;">⚠️ ${gapCount} Gaps</span>`;
        } else {
            gapsHtml = '<span style="color: #10b981; font-weight: bold;">✓ OK</span>';
        }
        
        detailsEl.innerHTML = `
            <span style="opacity: 0.5; font-family: monospace;">[${entry.id}]</span>
        `;
        detailsEl.appendChild(linksContainer);
        const gapsEl = document.createElement('div');
        gapsEl.innerHTML = gapsHtml;
        detailsEl.appendChild(gapsEl);
        
        const opsEl = document.createElement('div');
        opsEl.style.cssText = `display: flex; gap: 6px; margin-left: 15px;`;
        
        const escapedSource = entry.php_file ? entry.php_file.replace(/\\/g, '\\\\') : '';
        const escapedTarget = (entry.ts_file || entry.rs_file || '').replace(/\\/g, '\\\\');
        
        opsEl.innerHTML = `
            <button class="action-btn" onclick="event.stopPropagation(); window.MDSApp.openLinkModal('${entry.id}', '${escapedSource}', '${escapedTarget}')" style="padding: 2px 8px; font-size: 10px;">🔗 Bağla</button>
            <button class="action-btn btn-success" onclick="event.stopPropagation(); window.MDSAnalyzed.openAnalysisModal('${entry.id}')" style="padding: 2px 8px; font-size: 10px;">📝 Analiz</button>
        `;
        detailsEl.appendChild(opsEl);
        headerEl.appendChild(detailsEl);
    } else {
        headerEl.addEventListener('click', () => {
            const childContainer = nodeEl.querySelector('.tree-children');
            if (childContainer) {
                const isCollapsed = childContainer.classList.toggle('collapsed');
                if (!isCollapsed) {
                    expandedAnalyzedPaths.add(fullPath);
                } else {
                    expandedAnalyzedPaths.delete(fullPath);
                }
                localStorage.setItem('expandedAnalyzedPaths', JSON.stringify(Array.from(expandedAnalyzedPaths)));
            }
        });
    }
    
    nodeEl.appendChild(headerEl);
    if (!isFile) {
        const childrenEl = document.createElement('div');
        childrenEl.className = 'tree-children';
        childrenEl.style.paddingLeft = '20px';
        if (!expandedAnalyzedPaths.has(fullPath)) {
            childrenEl.classList.add('collapsed');
        }
        const keys = Object.keys(node).sort((a, b) => {
            const aIsDir = !node[a]._entry;
            const bIsDir = !node[b]._entry;
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });
        keys.forEach(key => {
            childrenEl.appendChild(createAnalyzedTreeNode(key, node[key], fullPath));
        });
        nodeEl.appendChild(childrenEl);
    }
    return nodeEl;
}

export function renderAnalyzedList(entries) {
    const container = document.getElementById('analyzed-tree-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (!entries || entries.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 30px;">Hələ heç bir fayl analiz edilməyib.</div>`;
        return;
    }
    const tree = buildAnalyzedTree(entries);
    Object.keys(tree).sort().forEach(key => {
        container.appendChild(createAnalyzedTreeNode(key, tree[key], ""));
    });
}

export function openAnalysisModal(fileId, phpFile = "") {
    let entry = allAnalyzedEntries.find(e => e.id === fileId);
    
    // Hər zaman istifadəçinin kliklədiyi konkret faylı əsas götürürük
    const targetPhpFile = phpFile ? (phpFile.startsWith("file://") ? phpFile : "file:///d:/MDS/coolify-source/" + phpFile) : "";
    
    if (!entry) {
        entry = {
            id: fileId,
            php_file: targetPhpFile,
            analysis: { php_analysis: null, target_analysis: null }
        };
        allAnalyzedEntries.push(entry);
    } else if (targetPhpFile) {
        entry.php_file = targetPhpFile; // Kliklənən konkret PHP və ya Blade faylı
    }
    
    activeAnalysisEntry = entry;
    
    document.getElementById('analysis-file-id').value = fileId;
    document.getElementById('analysis-file-id-display').value = fileId;
    
    const displayPath = entry.php_file ? entry.php_file.replace("file:///d:/MDS/coolify-source/", "") : "Yol yoxdur";
    document.getElementById('analysis-filepath-display').value = displayPath;
    document.getElementById('analysis-side-select').value = 'php';
    
    onAnalysisSideChanged();
    document.getElementById('analysis-modal').classList.add('active');
}

export function onAnalysisSideChanged() {
    if (!activeAnalysisEntry) return;
    const side = document.getElementById('analysis-side-select').value;
    let val = null;
    if (activeAnalysisEntry.analysis) {
        if (side === 'php') {
            const isBlade = activeAnalysisEntry.php_file && activeAnalysisEntry.php_file.includes('.blade.php');
            if (isBlade) {
                val = activeAnalysisEntry.analysis.blade_analysis;
            } else {
                val = activeAnalysisEntry.analysis.php_analysis;
            }
        } else {
            val = activeAnalysisEntry.analysis.target_analysis;
        }

        // Fallback: Köhnə tip tək analizdirsə və php_analysis yoxdursa özünü götür
        if (!val && side === 'php' && !activeAnalysisEntry.analysis.php_analysis && !activeAnalysisEntry.analysis.target_analysis) {
            if (activeAnalysisEntry.analysis.analysis || activeAnalysisEntry.analysis.layout_structure) {
                val = activeAnalysisEntry.analysis;
            }
        }
    }
    
    // Əgər dəyər null və ya boşdursa, istifadəçiyə içi boş null vermək əvəzinə strukturlu şablon göstəririk
    if (val && Object.keys(val).length > 0) {
        document.getElementById('analysis-json-text').value = JSON.stringify(val, null, 2);
    } else {
        const defaultJson = {
            "file": side === 'php' ? "app/Livewire/Server/..." : "ui/src/pages/server/...",
            "type": side === 'php' ? "LIVEWIRE_COMPONENT" : "REACT_COMPONENT",
            "purpose": "Faylın əsas təyinatı...",
            "analysis": {
                "missing_parts": {
                    "gaps": [
                        "Əskik məntiq, funksiya və ya validation buraya yazılacaq"
                    ]
                }
            }
        };
        document.getElementById('analysis-json-text').value = JSON.stringify(defaultJson, null, 2);
    }
}

export function closeAnalysisModal() {
    document.getElementById('analysis-modal').classList.remove('active');
    activeAnalysisEntry = null;
}

export async function saveAnalysisJson(e) {
    e.preventDefault();
    const fileId = document.getElementById('analysis-file-id').value;
    const side = document.getElementById('analysis-side-select').value;
    const jsonText = document.getElementById('analysis-json-text').value;
    let parsedJson = null;
    try {
        parsedJson = JSON.parse(jsonText);
    } catch (err) {
        alert('Daxil edilən mətn düzgün JSON formatında deyil!');
        return;
    }
    try {
        const filepath = activeAnalysisEntry ? activeAnalysisEntry.php_file : "";
        const res = await fetch('/api/analyzed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_id: fileId, side, analysis: parsedJson, filepath: filepath })
        });
        if (res.ok) {
            const data = await res.json();
            const pathsMsg = data.saved_paths ? "\nFayllar: " + data.saved_paths.join(', ') : '';
            showToast('JSON analizi uğurla qeyd edildi!' + pathsMsg);
            closeAnalysisModal();
            loadAnalyzedDataImpl();
            if (window.MDSFilesToAnalyze && window.MDSFilesToAnalyze.renderFilesToAnalyze) {
                window.MDSFilesToAnalyze.renderFilesToAnalyze();
            }
        } else {
            showToast('Xəta baş verdi!');
        }
    } catch (err) {
        console.error(err);
    }
}

// Window bindings
window.MDSAnalyzed = {
    loadAnalyzedDataImpl,
    filterAnalyzedTree,
    openAnalysisModal,
    onAnalysisSideChanged,
    closeAnalysisModal,
    saveAnalysisJson,
    getAllAnalyzedEntries: () => allAnalyzedEntries
};
