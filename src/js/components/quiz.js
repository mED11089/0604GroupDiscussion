/**
 * 互動答題練習
 * 資料整理自歷屆醫學系國考題（異位性皮膚炎）。
 * 點選選項即時揭示正解與解析，並累計作答進度與答對題數。
 */

const LETTERS = ['A', 'B', 'C', 'D'];

const QUESTIONS = [
  {
    source: '105 年第 1 次・醫學四・第 35 題',
    stem: '關於異位性皮膚炎（atopic dermatitis）的處置，下列何者錯誤？',
    options: [
      '外用局部皮質類固醇藥劑',
      '紫外線光照治療',
      '使用潤膚劑',
      '外用維生素 D3 及其衍生物',
    ],
    answer: 3,
    explain: '維生素 D3 衍生物（如 calcipotriol）是乾癬（psoriasis）的一線外用治療，並不用於 AD。AD 正規治療包含保濕劑、外用類固醇、外用 calcineurin 抑制劑、NB-UVB，重症則使用免疫抑制劑或 dupilumab。',
  },
  {
    source: '108 年第 2 次・醫學四・第 38 題',
    stem: '關於異位性皮膚炎致病機轉的敘述，下列何者錯誤？',
    options: [
      'FLG 基因突變使 filaggrin 的製造減少',
      '可觀察到皮膚生理功能（經皮水分散失及含水量）異常',
      '病人皮膚免疫系統缺陷，因此易合併細菌感染',
      '慢性期主要以 Th2 細胞活化為主，Th1 細胞角色較少',
    ],
    answer: 3,
    explain: '急性期以 Th2（IL-4、IL-13、IL-31）主導；慢性期則轉為 Th1（IFN-γ、IL-12）為主，並有 Th17/Th22 參與。故「慢性期仍以 Th2 為主」的敘述錯誤。',
  },
  {
    source: '109 年第 2 次・醫學四・第 40 題',
    stem: '關於異位性皮膚炎（atopic dermatitis）的敘述，下列何者錯誤？',
    options: [
      'SCORAD 分數可反映異位性皮膚炎的嚴重程度',
      '病情嚴重難以控制的病人，可考慮使用口服環孢靈素（cyclosporine）',
      '大部分患者可發現血液中 IgE 及嗜中性白血球增加',
      '急性發作期，光照治療可有效作為輔助治療',
    ],
    answer: 2,
    explain: 'AD 患者升高的是 IgE 與嗜酸性白血球（eosinophils），而非嗜中性白血球（neutrophils）；嗜中性球增加多見於感染或乾癬。Cyclosporine 為重症 AD 的系統性選項，NB-UVB 可作輔助治療。',
  },
  {
    source: '113 年第 1 次・醫學四・第 34 題',
    stem: '關於異位性皮膚炎（atopic dermatitis）的敘述，下列何者錯誤？',
    options: [
      '第二型輔助 T 細胞（Th2 cells）在致病機轉扮演重要角色',
      '病灶可能合併金黃色葡萄球菌或單純性疱疹病毒（HSV）感染',
      '絕大多數患者有絲聚蛋白（filaggrin, FLG）基因突變',
      '濕疹樣病灶合併血小板低下及免疫異常，需考慮 Wiskott-Aldrich syndrome',
    ],
    answer: 2,
    explain: 'FLG 突變約見於 30–40% 的 AD 患者，並非絕大多數；它是重要的遺傳風險因子，但 AD 為多因子疾病。Wiskott-Aldrich 三聯症：濕疹＋血小板減少＋免疫功能缺陷。',
  },
  {
    source: '114 年第 1 次・醫學四・第 34 題',
    stem: '下列何者不適合用在異位性皮膚炎（atopic dermatitis）的治療？',
    options: [
      '免疫抑制劑（immunosuppressants）',
      '長期口服類固醇（long-term oral corticosteroid）',
      '外用類固醇（topical corticosteroid）',
      '窄波紫外線 B 光（narrow-band UVB）',
    ],
    answer: 1,
    explain: '長期口服類固醇副作用龐大（腎上腺抑制、骨質疏鬆、代謝症候群、皮膚萎縮等），不建議長期用於 AD，僅可短期用於急性重症。外用類固醇、免疫抑制劑與 NB-UVB 皆為合法選項；dupilumab（anti–IL-4Rα）為重症首選。',
  },
];

function render(mount) {
  mount.innerHTML = QUESTIONS.map((q, qi) => `
    <article class="quiz-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" data-answer="${q.answer}">
      <span class="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">${q.source}</span>
      <p class="mt-3 font-bold text-slate-800">Q${qi + 1}. ${q.stem}</p>
      <div class="mt-4 space-y-2">
        ${q.options.map((opt, oi) => `
          <button class="quiz-opt flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-primary hover:bg-blue-50" data-i="${oi}">
            <span class="quiz-letter flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">${LETTERS[oi]}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-explain hidden mt-4 rounded-xl bg-slate-50 p-4 text-sm">
        <p class="font-bold text-primary">解析・正解 ${LETTERS[q.answer]}</p>
        <p class="mt-1 text-slate-600">${q.explain}</p>
      </div>
    </article>`).join('');
}

export function initQuiz() {
  const mount = document.getElementById('quiz-mount');
  if (!mount) return;

  const answeredEl = document.getElementById('quiz-answered');
  const scoreEl = document.getElementById('quiz-score');
  const resetBtn = document.getElementById('quiz-reset');

  function setup() {
    render(mount);
    let answered = 0;
    let score = 0;
    if (answeredEl) answeredEl.textContent = '0';
    if (scoreEl) scoreEl.textContent = '0';

    mount.querySelectorAll('.quiz-card').forEach((card) => {
      const answer = Number(card.dataset.answer);
      const opts = card.querySelectorAll('.quiz-opt');
      let done = false;

      const markLetter = (btn, bg) => {
        const letter = btn.querySelector('.quiz-letter');
        letter.classList.remove('bg-slate-100', 'text-slate-600');
        letter.classList.add(bg, 'text-white');
      };

      opts.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (done) return;
          done = true;
          const correct = Number(btn.dataset.i) === answer;

          // 標記正解（綠）
          opts[answer].classList.add('border-emerald-400', 'bg-emerald-50');
          markLetter(opts[answer], 'bg-emerald-500');

          // 標記答錯選項（紅）
          if (!correct) {
            btn.classList.add('border-red-300', 'bg-red-50');
            markLetter(btn, 'bg-red-500');
          }

          // 鎖定本題並揭示解析
          opts.forEach((b) => b.classList.add('pointer-events-none', 'cursor-default'));
          card.querySelector('.quiz-explain').classList.remove('hidden');

          // 更新計分
          answered += 1;
          if (correct) score += 1;
          if (answeredEl) answeredEl.textContent = String(answered);
          if (scoreEl) scoreEl.textContent = String(score);
        });
      });
    });
  }

  setup();
  resetBtn?.addEventListener('click', setup);
}
