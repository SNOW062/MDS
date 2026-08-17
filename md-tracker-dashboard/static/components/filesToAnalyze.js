import { showToast } from './utils.js';


export async function renderFilesToAnalyze() {
    // Köhnə kopyalanma keşini birdəfəlik localstorage-dən təmizləyirik ki, heç bir marker qalmasın
    localStorage.removeItem('copiedPathsSet');
    
    const tbody = document.getElementById('files-to-analyze-table-body');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Yüklənir...</td></tr>';
    
    try {
        // Mövcud analizləri (allAnalyzedEntries) əvvəlcə yükləyirik ki, keşi dolduraq
        if (window.MDSAnalyzed && window.MDSAnalyzed.loadAnalyzedDataImpl) {
            await window.MDSAnalyzed.loadAnalyzedDataImpl();
        }
        
        const res = await fetch('/api/files-to-analyze');
        const data = await res.json();
        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Analiz siyahısı boşdur.</td></tr>';
            return;
        }
        tbody.innerHTML = '';
        data.forEach(item => {
            const tr = document.createElement('tr');
            const phpClean = item.php_file;
            const bladeClean = item.blade_file;
            const tsClean = item.ts_file;
            const rsClean = item.rs_file;

            const phpCompleted = item.php_completed;
            const bladeCompleted = item.blade_completed;

            let phpDisplay = '';
            if (phpClean) {
                const phpStyle = phpCompleted 
                    ? 'background: #fffbeb; padding: 4px 6px; border-radius: 4px; border: 1px solid #f59e0b;' 
                    : 'background: transparent; padding: 4px 6px;';
                const escapedSinglePhp = phpClean.replace(/\\/g, '\\\\');
                phpDisplay += `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; ${phpStyle}">
                        <span class="file-link" onclick="window.MDSApp.openCodePopup('${phpClean}', 'PHP Source')" style="cursor: pointer; color: #047857; text-decoration: underline; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;">${phpClean}</span>
                        <div style="display: flex; align-items: center; gap: 4px; margin-left: auto; flex-shrink: 0;">
                            <button class="action-btn copy-feedback-btn" onclick="window.MDSFilesToAnalyze.copyPathWithFeedback('${phpClean}', this)" style="padding: 2px 5px; font-size: 9px; line-height: 1;" title="Yolu Kopyala">📋</button>
                            <button class="action-btn btn-success" onclick="window.MDSAnalyzed.openAnalysisModal('${item.id}', '${escapedSinglePhp}')" style="padding: 2px 5px; font-size: 9px; line-height: 1;" title="Analiz et">📝</button>
                        </div>
                    </div>
                `;
            }
            if (bladeClean) {
                const bladeStyle = bladeCompleted 
                    ? 'background: #fffbeb; padding: 4px 6px; border-radius: 4px; border: 1px solid #f59e0b;' 
                    : 'background: transparent; padding: 4px 6px;';
                const escapedSingleBlade = bladeClean.replace(/\\/g, '\\\\');
                phpDisplay += `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 6px; font-size: 10.5px; ${bladeStyle}">
                        <div style="display: flex; align-items: center; gap: 4px; min-width: 0;">
                            <span style="opacity: 0.7; color: #475569; font-weight: bold; flex-shrink: 0;">Blade:</span>
                            <span class="file-link" onclick="window.MDSApp.openCodePopup('${bladeClean}', 'Blade View')" style="cursor: pointer; color: #b91c1c; text-decoration: underline; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px;">${bladeClean}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px; margin-left: auto; flex-shrink: 0;">
                            <button class="action-btn copy-feedback-btn" onclick="window.MDSFilesToAnalyze.copyPathWithFeedback('${bladeClean}', this)" style="padding: 2px 5px; font-size: 9px; line-height: 1;" title="Yolu Kopyala">📋</button>
                            <button class="action-btn btn-success" onclick="window.MDSAnalyzed.openAnalysisModal('${item.id}', '${escapedSingleBlade}')" style="padding: 2px 5px; font-size: 9px; line-height: 1;" title="Analiz et">📝</button>
                        </div>
                    </div>
                `;
            }

            let tsDisplay = '';
            if (tsClean) {
                tsDisplay = `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 6px;">
                        <span class="file-link" onclick="window.MDSApp.openCodePopup('${tsClean}', 'TypeScript React UI')" style="cursor: pointer; color: #1d4ed8; text-decoration: underline; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px;">${tsClean}</span>
                        <button class="action-btn copy-feedback-btn" onclick="window.MDSFilesToAnalyze.copyPathWithFeedback('${tsClean}', this)" style="padding: 2px 5px; font-size: 9px; line-height: 1; margin-left: auto; flex-shrink: 0;">📋</button>
                    </div>
                `;
            } else {
                tsDisplay = '<span style="opacity: 0.5; color: #94a3b8; padding-left: 6px;">-</span>';
            }

            let rsDisplay = '';
            if (rsClean) {
                rsDisplay = `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 6px;">
                        <span class="file-link" onclick="window.MDSApp.openCodePopup('${rsClean}', 'Rust Backend')" style="cursor: pointer; color: #475569; text-decoration: underline; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px;">${rsClean}</span>
                        <button class="action-btn copy-feedback-btn" onclick="window.MDSFilesToAnalyze.copyPathWithFeedback('${rsClean}', this)" style="padding: 2px 5px; font-size: 9px; line-height: 1; margin-left: auto; flex-shrink: 0;">📋</button>
                    </div>
                `;
            } else {
                rsDisplay = '<span style="opacity: 0.5; color: #94a3b8; padding-left: 6px;">-</span>';
            }
                
            let statusBadge = '';
            let trRowStyle = '';
            
            if (phpCompleted && bladeCompleted) {
                statusBadge = '<span class="status-badge completed" style="background: #d1fae5; color: #065f46; border: 1px solid #10b981;">TAMAMLANIB</span>';
                trRowStyle = 'background: #f0fdf4 !important; border-left: 4px solid #10b981;';
            } else if (phpCompleted || bladeCompleted) {
                statusBadge = '<span class="status-badge partial" style="background: #fef3c7; color: #92400e; border: 1px solid #f59e0b;">YARIMÇIQ</span>';
                trRowStyle = 'background: #ffffff !important; border-left: 4px solid #f59e0b;';
            } else {
                statusBadge = '<span class="status-badge todo" style="background: rgba(76, 82, 105, 0.15); color: #475569; border: 1px solid rgba(76, 82, 105, 0.3);">GÖZLƏYİR</span>';
                trRowStyle = 'background: #ffffff !important; border-left: 3px solid transparent !important;';
            }

            tr.innerHTML = `
                <td><code class="task-id" style="color: #4f46e5; font-weight: 600;">${item.id}</code></td>
                <td style="font-family: monospace; font-size: 11px; text-align: left;">${phpDisplay}</td>
                <td style="font-family: monospace; font-size: 11px; text-align: left;">${tsDisplay}</td>
                <td style="font-family: monospace; font-size: 11px; text-align: left;">${rsDisplay}</td>
                <td style="font-size: 11.5px; color: #1e293b; text-align: left; font-weight: 500;">${item.description}</td>
                <td>${statusBadge}</td>
            `;
            if (trRowStyle) {
                tr.setAttribute('style', trRowStyle);
            }
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error("Analiz siyahısı yüklənərkən xəta:", e);
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: red;">Datanı yükləyərkən xəta baş verdi.</td></tr>';
    }
}

export function copyPathWithFeedback(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Fayl yolu kopyalandı!');
    }).catch(err => {
        console.error('Kopyalama xətası:', err);
    });
}

// Window bindings
window.MDSFilesToAnalyze = {
    renderFilesToAnalyze,
    copyPathWithFeedback
};
