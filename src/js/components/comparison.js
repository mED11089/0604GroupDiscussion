/**
 * 互動藥物比較表
 * 依資料渲染表格，支援類別篩選與逐列展開詳細說明。
 */

const treatments = [
  { name: 'Dupilumab',    class: 'Biologic',      target: 'anti-IL-4Rα',          efficacy: 4, safety: 5, monitoring: 5, oral: false, boxedWarning: false, renalOK: true,  elderlyOK: true,  recommended: true },
  { name: 'Tralokinumab', class: 'Biologic',      target: 'anti-IL-13',           efficacy: 4, safety: 5, monitoring: 5, oral: false, boxedWarning: false, renalOK: true,  elderlyOK: true,  recommended: true },
  { name: 'Lebrikizumab', class: 'Biologic',      target: 'anti-IL-13',           efficacy: 4, safety: 5, monitoring: 5, oral: false, boxedWarning: false, renalOK: true,  elderlyOK: true,  recommended: false },
  { name: 'Nemolizumab',  class: 'Biologic',      target: 'anti-IL-31RA',         efficacy: 3, safety: 5, monitoring: 5, oral: false, boxedWarning: false, renalOK: true,  elderlyOK: true,  recommended: false },
  { name: 'Upadacitinib', class: 'JAK inhibitor', target: 'JAK1',                 efficacy: 5, safety: 2, monitoring: 2, oral: true,  boxedWarning: true,  renalOK: false, elderlyOK: false, recommended: false },
  { name: 'Abrocitinib',  class: 'JAK inhibitor', target: 'JAK1',                 efficacy: 5, safety: 2, monitoring: 2, oral: true,  boxedWarning: true,  renalOK: false, elderlyOK: false, recommended: false },
  { name: 'Baricitinib',  class: 'JAK inhibitor', target: 'JAK1/2',               efficacy: 4, safety: 2, monitoring: 2, oral: true,  boxedWarning: true,  renalOK: false, elderlyOK: false, recommended: false },
  { name: 'Cyclosporine', class: '傳統',          target: 'Calcineurin inhibitor', efficacy: 3, safety: 2, monitoring: 2, oral: true,  boxedWarning: false, renalOK: false, elderlyOK: false, recommended: false },
  { name: 'Methotrexate', class: '傳統',          target: 'DHFR inhibitor',       efficacy: 3, safety: 3, monitoring: 2, oral: true,  boxedWarning: false, renalOK: false, elderlyOK: false, recommended: false },
  { name: 'Azathioprine', class: '傳統',          target: 'Purine analogue',      efficacy: 2, safety: 3, monitoring: 2, oral: true,  boxedWarning: false, renalOK: true,  elderlyOK: false, recommended: false },
  { name: 'NB-UVB',       class: 'Phototherapy',  target: 'Non-pharmacologic',    efficacy: 3, safety: 5, monitoring: 5, oral: false, boxedWarning: false, renalOK: true,  elderlyOK: true,  recommended: false },
];

const DETAILS = {
  Dupilumab: '結合 IL-4Rα、同時阻斷 IL-4/IL-13；每 2 週皮下注射，無需抽血、無腎／肝劑量調整、無 boxed warning。對殷太太的 type-2 phenotype 有堅實機轉理由，且在 ≥80 歲仍有效且耐受良好。',
  Tralokinumab: 'IL-13 選擇性阻斷；皮下注射，維持期較具彈性。無 boxed warning、無例行抽血。若殷太太偏好或無法耐受 dupilumab，為合理替代。',
  Lebrikizumab: '較新的 IL-13 選擇性 biologic；皮下注射，整合性安全分析事件多為輕度。',
  Nemolizumab: '阻斷 IL-31 受體、針對搔癢；對「搔癢為主且頑固」的病人尤其有用。',
  Upadacitinib: '口服 JAK1，止癢起效最快、可達 EASI-90；但帶 class boxed warning（MACE/VTE/malignancy）。殷太太 ≥65 歲且腎功能不全，落入高風險族群。',
  Abrocitinib: '口服 JAK1，反應深度高；同樣帶 boxed warning，需治療前篩檢與定期抽血。',
  Baricitinib: '口服 JAK1/2（美國未核准用於 AD）；boxed warning 同 class。',
  Cyclosporine: 'calcineurin inhibitor，起效快（2–3 週）；但 nephrotoxicity 與升壓，使其於殷太太 eGFR 53 與高血壓為禁忌／應避免。',
  Methotrexate: '每週口服；hepatotoxicity 與經腎清除，使其於邊緣性 ALT 42 與腎功能不全須謹慎並調整劑量。',
  Azathioprine: 'purine analogue；劑量相關 myelotoxicity，於輕度貧血者須謹慎，使用前須查 TPMT/NUDT15。',
  'NB-UVB': '非藥物選項，可避免全身性免疫抑制；主要缺點是需反覆回診照光、長期效應未明。',
};

const CLASS_BADGE = {
  Biologic: 'bg-blue-50 text-primary',
  'JAK inhibitor': 'bg-amber-50 text-amber-700',
  傳統: 'bg-slate-100 text-slate-600',
  Phototherapy: 'bg-cyan-50 text-accent',
};

/** 5 個圓點視覺化 1–5 分。 */
function dots(score, colorClass) {
  let circles = '';
  for (let i = 0; i < 5; i++) {
    circles += `<circle cx="${8 + i * 16}" cy="8" r="5.5" fill="${i < score ? 'currentColor' : '#e5e7eb'}" />`;
  }
  return `<span class="${colorClass}" title="${score}/5"><svg viewBox="0 0 88 16" class="h-4 w-[88px]" aria-label="${score} / 5">${circles}</svg></span>`;
}

const checkIcon = '<svg class="mx-auto h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>';
const xIcon = '<svg class="mx-auto h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
const warnIcon = '<span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">⚠ 警告</span>';
const dashIcon = '<span class="text-slate-300">—</span>';

function render(table) {
  const head = `
    <thead>
      <tr class="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
        <th class="px-4 py-3">藥物</th>
        <th class="px-4 py-3">類別</th>
        <th class="px-4 py-3">標靶</th>
        <th class="px-4 py-3">療效</th>
        <th class="px-4 py-3">安全性</th>
        <th class="px-4 py-3">監測便利性</th>
        <th class="px-4 py-3 text-center">口服</th>
        <th class="px-4 py-3 text-center">Boxed Warning</th>
        <th class="px-4 py-3 text-center">腎功能安全</th>
        <th class="px-4 py-3 text-center">年長適用</th>
      </tr>
    </thead>`;

  const rows = treatments.map((t, i) => {
    const unsuitable = !t.recommended && (!t.renalOK || !t.elderlyOK);
    const rowTone = t.recommended
      ? 'bg-emerald-50/70 hover:bg-emerald-50'
      : unsuitable
        ? 'bg-red-50/50 hover:bg-red-50'
        : 'bg-white hover:bg-slate-50';

    const recMark = t.recommended
      ? '<svg class="h-4 w-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
      : '';

    const main = `
      <tr class="comparison-row cursor-pointer border-t border-slate-100 transition-colors ${rowTone}" data-class="${t.class}" data-row="${i}">
        <td class="px-4 py-3 font-bold text-slate-800">
          <span class="flex items-center gap-1.5">${recMark}${t.name}</span>
          ${t.recommended ? '<span class="mt-1 inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">推薦給殷太太</span>' : ''}
        </td>
        <td class="px-4 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-semibold ${CLASS_BADGE[t.class] || 'bg-slate-100 text-slate-600'}">${t.class}</span></td>
        <td class="px-4 py-3 text-slate-600">${t.target}</td>
        <td class="px-4 py-3">${dots(t.efficacy, 'text-amber-500')}</td>
        <td class="px-4 py-3">${dots(t.safety, 'text-emerald-600')}</td>
        <td class="px-4 py-3">${dots(t.monitoring, 'text-sky-600')}</td>
        <td class="px-4 py-3 text-center">${t.oral ? '<span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-primary">口服</span>' : '<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">注射</span>'}</td>
        <td class="px-4 py-3 text-center">${t.boxedWarning ? warnIcon : dashIcon}</td>
        <td class="px-4 py-3 text-center">${t.renalOK ? checkIcon : xIcon}</td>
        <td class="px-4 py-3 text-center">${t.elderlyOK ? checkIcon : xIcon}</td>
      </tr>`;

    const detail = `
      <tr class="comparison-detail hidden" data-class="${t.class}" data-detail="${i}">
        <td colspan="10" class="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-sm leading-relaxed text-slate-600">
          <span class="font-bold text-primary">${t.name}・</span>${DETAILS[t.name] || ''}
        </td>
      </tr>`;

    return main + detail;
  }).join('');

  table.innerHTML = head + `<tbody>${rows}</tbody>`;
}

export function initComparison() {
  const table = document.getElementById('comparison-table');
  const filters = document.getElementById('comparison-filters');
  if (!table) return;

  render(table);

  // 逐列展開
  table.querySelectorAll('.comparison-row').forEach((row) => {
    row.addEventListener('click', () => {
      const detail = table.querySelector(`[data-detail="${row.dataset.row}"]`);
      detail?.classList.toggle('hidden');
      row.classList.toggle('ring-2');
      row.classList.toggle('ring-primary');
    });
  });

  // 類別篩選
  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('filter-active'));
      btn.classList.add('filter-active');

      const want = btn.dataset.filter;
      table.querySelectorAll('[data-class]').forEach((el) => {
        const match = want === 'all' || el.dataset.class === want;
        el.classList.toggle('hidden', !match);
        // 篩選時一併收合已展開的詳細列
        if (el.classList.contains('comparison-detail') && match) el.classList.add('hidden');
      });
    });
  }
}
