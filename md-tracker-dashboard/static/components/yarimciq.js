import { showToast } from './utils.js';

let yarimciqData = [];
let selectedYarimciqIds = new Set();

export async function loadYarimciqData() {
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

export function toggleSelectYarimciq(id, isChecked) {
    if (isChecked) {
        selectedYarimciqIds.add(id);
    } else {
        selectedYarimciqIds.delete(id);
    }
    updateSelectedSpecsBtn();
}

export function toggleSelectAllYarimciq(masterCb) {
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

export function updateSelectedSpecsBtn() {
    const btn = document.getElementById('btn-copy-selected-specs');
    const countSpan = document.getElementById('selected-specs-count');
    if (!btn || !countSpan) return;

    const count = selectedYarimciqIds.size;
    countSpan.innerText = count;
    btn.style.display = count > 0 ? 'inline-block' : 'none';
}

export function renderYarimciqList() {
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
            <td style="text-align: center;"><input type="checkbox" class="yarimciq-cb" value="${item.id}" ${isChecked ? 'checked' : ''} onchange="window.MDSYarimciq.toggleSelectYarimciq('${item.id}', this.checked)" style="cursor: pointer; width: 14px; height: 14px;"></td>
            <td><code class="task-id">${item.id}</code></td>
            <td style="font-family: monospace; font-size: 11.5px; color: #a5b4fc;">${item.path}</td>
            <td><span style="font-size: 11px; opacity: 0.7;">${item.category || 'General'}</span></td>
            <td><span class="status-badge ${item.status}">${statusBadgeText}</span></td>
            <td style="font-size: 11.5px; color: #cbd5e1;">${item.reason}</td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="action-btn" onclick="window.MDSYarimciq.showFileSpec('${item.id}')">⚙️ Metodlar</button>
                    <button class="action-btn" onclick="navigator.clipboard.writeText('${item.path}'); showToast('Fayl yolu kopyalandı!')">📋 Yol</button>
                    <button class="action-btn btn-success" onclick="window.MDSApp.showSourceViewer('${item.id}')">👁️ Kod</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    updateSelectedSpecsBtn();
}

export async function copySelectedSpecsAsText() {
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

export async function showFileSpec(fileId) {
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

export function copySpecAsText() {
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

export function closeSpecModal() {
    activeSpecData = null;
    const modal = document.getElementById('spec-modal');
    if (modal) modal.classList.remove('active');
}

// Window namespace-ə bağlayaq ki inline HTML-lər oxuya bilsin
window.MDSYarimciq = {
    toggleSelectYarimciq,
    toggleSelectAllYarimciq,
    showFileSpec,
    copySpecAsText,
    closeSpecModal,
    copySelectedSpecsAsText,
    loadYarimciqData,
    renderYarimciqList
};
