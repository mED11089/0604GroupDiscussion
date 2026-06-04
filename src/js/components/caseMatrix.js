/**
 * 殷太太個案分析：臨床因子 × 藥物適用性矩陣
 * 點擊左側因子 → 高亮受影響的藥物欄，其餘欄淡出。
 */

const COLUMNS = ['Dupilumab', 'Tralokinumab', 'Upadacitinib', 'Cyclosporine', 'Methotrexate', 'Azathioprine'];

// 每個因子：6 欄狀態（good / caution / bad），affects = 受此因子影響而高亮的藥物欄。
const FACTORS = [
  {
    id: 'age', label: '年齡 78 歲', sub: '年長女性',
    cells: ['good', 'good', 'bad', 'caution', 'caution', 'caution'],
    affects: ['Upadacitinib', 'Cyclosporine', 'Methotrexate', 'Azathioprine'],
    note: '年長（≥65）使 JAK inhibitors 的 MACE／VTE／惡性腫瘤風險上升（EMA 警示）；biologics 在 ≥80 歲仍有效且耐受良好。',
  },
  {
    id: 'dm', label: 'Type 2 Diabetes', sub: 'metformin + linagliptin',
    cells: ['good', 'good', 'bad', 'caution', 'good', 'good'],
    affects: ['Upadacitinib', 'Cyclosporine'],
    note: '心血管風險因子 → 進一步不利 JAK inhibitors（MACE）；systemic corticosteroids（本表未列）會惡化血糖。',
  },
  {
    id: 'htn', label: '輕度 Hypertension', sub: '未治療',
    cells: ['good', 'good', 'bad', 'bad', 'good', 'good'],
    affects: ['Cyclosporine', 'Upadacitinib'],
    note: 'Cyclosporine 會升血壓、於未控 HTN 應避免；JAK inhibitors 的 MACE 風險亦增加。',
  },
  {
    id: 'renal', label: '腎功能不全', sub: 'eGFR 53、Cr 1.5',
    cells: ['good', 'good', 'caution', 'bad', 'caution', 'good'],
    affects: ['Cyclosporine', 'Methotrexate', 'Upadacitinib'],
    note: 'Cyclosporine 具 nephrotoxicity 為禁忌；Methotrexate 經腎清除須調量；biologics 不經腎清除、無須調整。',
  },
  {
    id: 'alt', label: '邊緣性 ALT 42', sub: '肝功能',
    cells: ['good', 'good', 'caution', 'good', 'bad', 'caution'],
    affects: ['Methotrexate', 'Azathioprine'],
    note: 'Methotrexate 具 hepatotoxicity 須謹慎；Azathioprine 亦可能肝毒，需監測肝功能。',
  },
  {
    id: 'anemia', label: '輕度貧血', sub: '血小板偏高',
    cells: ['good', 'good', 'caution', 'good', 'caution', 'bad'],
    affects: ['Azathioprine', 'Methotrexate'],
    note: 'Azathioprine 具劑量相關 myelotoxicity 須謹慎；Methotrexate 亦可 myelosuppression。',
  },
  {
    id: 'atrophy', label: '皮膚萎縮', sub: '外用類固醇引起',
    cells: ['good', 'good', 'good', 'good', 'good', 'good'],
    affects: ['Dupilumab', 'Tralokinumab'],
    note: '醫源性併發症 → 支持升級至全身性治療；biologics 為理想的 steroid-sparing 選項。',
  },
  {
    id: 'refractory', label: 'AD 反覆難控', sub: '多種外用藥無效',
    cells: ['good', 'good', 'good', 'caution', 'caution', 'caution'],
    affects: ['Dupilumab', 'Tralokinumab', 'Upadacitinib'],
    note: '需要有效、持久的方案 → biologics 為首選；JAK inhibitors 雖有效但安全性受限；傳統藥物較難長期維持。',
  },
];

const STATUS = {
  good: { cls: 'text-emerald-600', svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />' },
  caution: { cls: 'text-amber-500', svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.008M10.3 3.9L1.8 18a1.5 1.5 0 001.3 2.25h17.8A1.5 1.5 0 0022 18L13.7 3.9a1.5 1.5 0 00-2.6 0z" />' },
  bad: { cls: 'text-red-500', svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />' },
};

function statusCell(status, drug) {
  const s = STATUS[status];
  return `<td class="matrix-cell px-3 py-3 text-center transition-opacity duration-300" data-drug="${drug}">
    <svg class="mx-auto h-5 w-5 ${s.cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${s.svg}</svg>
  </td>`;
}

function render(table) {
  const head = `
    <thead>
      <tr class="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
        <th class="px-4 py-3 text-left">臨床因子</th>
        ${COLUMNS.map((d) => `<th class="matrix-col-head px-3 py-3 text-center transition-opacity duration-300" data-drug="${d}">${d}</th>`).join('')}
      </tr>
    </thead>`;

  const rows = FACTORS.map((f) => `
    <tr class="matrix-row border-t border-slate-100" data-factor="${f.id}">
      <th scope="row" class="matrix-factor cursor-pointer px-4 py-3 text-left transition-colors hover:bg-slate-50">
        <span class="block font-bold text-slate-800">${f.label}</span>
        <span class="block text-xs font-normal text-slate-400">${f.sub}</span>
      </th>
      ${f.cells.map((c, i) => statusCell(c, COLUMNS[i])).join('')}
    </tr>`).join('');

  table.innerHTML = head + `<tbody>${rows}</tbody>`;
}

export function initCaseMatrix() {
  const table = document.getElementById('case-matrix');
  const note = document.getElementById('matrix-note');
  if (!table) return;

  render(table);

  let active = null;

  const clear = () => {
    table.querySelectorAll('[data-drug]').forEach((el) => el.classList.remove('matrix-dim'));
    table.querySelectorAll('.matrix-factor').forEach((el) => el.classList.remove('matrix-factor-active'));
    if (note) note.innerHTML = '點擊上方任一臨床因子以查看說明。';
    active = null;
  };

  table.querySelectorAll('.matrix-row').forEach((row) => {
    const factor = FACTORS.find((f) => f.id === row.dataset.factor);
    const trigger = row.querySelector('.matrix-factor');

    trigger.addEventListener('click', () => {
      if (active === factor.id) { clear(); return; }
      active = factor.id;

      const keep = new Set(factor.affects);
      table.querySelectorAll('[data-drug]').forEach((el) => {
        el.classList.toggle('matrix-dim', !keep.has(el.dataset.drug));
      });
      table.querySelectorAll('.matrix-factor').forEach((el) => el.classList.remove('matrix-factor-active'));
      trigger.classList.add('matrix-factor-active');

      if (note) {
        note.innerHTML = `<span class="font-bold text-primary">${factor.label}：</span>${factor.note}
          <span class="mt-1 block text-xs text-slate-400">高亮藥物：${factor.affects.join('、')}</span>`;
      }
    });
  });
}
