/**
 * Chart.js 雷達圖：四種主要選項在六個面向的比較（1–5 分）。
 * Chart.js 由 CDN 以全域 window.Chart 載入。
 */

const DIMENSIONS = ['療效', '安全性', '監測便利性', '腎臟友善性', '年長適用性', '口服方便性'];

const DATASETS = [
  { label: 'Dupilumab',    data: [4, 5, 5, 5, 5, 1], color: '30, 64, 175' },  // primary 深藍
  { label: 'Upadacitinib', data: [5, 2, 2, 2, 1, 5], color: '217, 119, 6' },  // amber
  { label: 'Cyclosporine', data: [3, 2, 2, 1, 2, 5], color: '100, 116, 139' },// slate
  { label: 'Methotrexate', data: [3, 3, 2, 2, 2, 5], color: '124, 58, 237' }, // violet
];

function build(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const gridColor = dark ? '#334155' : '#e2e8f0';
  const tickColor = dark ? '#64748b' : '#94a3b8';
  const labelColor = dark ? '#e2e8f0' : '#334155';
  const legendColor = dark ? '#cbd5e1' : '#475569';

  new window.Chart(canvas, {
    type: 'radar',
    data: {
      labels: DIMENSIONS,
      datasets: DATASETS.map((d) => ({
        label: d.label,
        data: d.data,
        borderColor: `rgb(${d.color})`,
        backgroundColor: `rgba(${d.color}, 0.15)`,
        pointBackgroundColor: `rgb(${d.color})`,
        pointRadius: 3,
        borderWidth: 2,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: reduceMotion ? false : { duration: 900 },
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: '"Noto Sans TC", sans-serif' }, padding: 16, usePointStyle: true, color: legendColor } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}：${ctx.parsed.r} / 5` } },
      },
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, backdropColor: 'transparent', color: tickColor },
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { font: { size: 13, family: '"Noto Sans TC", sans-serif', weight: 'bold' }, color: labelColor },
        },
      },
    },
  });
}

export function initRadarChart() {
  const canvas = document.getElementById('radar-chart');
  if (!canvas || typeof window.Chart === 'undefined') return;

  // 捲入視窗後再建立，動畫更明顯
  if (!('IntersectionObserver' in window)) { build(canvas); return; }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { build(canvas); obs.disconnect(); }
    });
  }, { threshold: 0.3 });
  io.observe(canvas);
}
