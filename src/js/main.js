/**
 * 應用程式進入點
 * 異位性皮膚炎全身性治療 SDM 指引
 */

import { initNavbar } from './components/navbar.js';
import { initCountUp } from './components/countUp.js';
import { initTabs } from './components/tabs.js';
import { initAccordion } from './components/accordion.js';
import { initComparison } from './components/comparison.js';
import { initCaseMatrix } from './components/caseMatrix.js';
import { initRadarChart } from './components/radarChart.js';
import { initQuiz } from './components/quiz.js';

/**
 * 點圖看大圖：點擊任一 <figure> 內的圖片（含主機轉圖、演算法圖與所有圖集），
 * 以新分頁開啟該圖片「已解析的網址」（img.src 已含 Vite base 前綴）。
 *
 * Vite 會為 <img src> 加上 base，但不會處理 <a href>；於子路徑部署
 * （GitHub Pages）時直接點原始的 /images/... 連結會 404。因此這裡一律改用
 * img.src，並對包在 <a> 內的圖片 preventDefault，避免錯誤的原生導向。
 */
function initImageZoom() {
  document.querySelectorAll('figure img').forEach((img) => {
    img.classList.add('cursor-zoom-in');
    if (!img.title) img.title = '點擊看大圖';
  });

  document.addEventListener('click', (e) => {
    const figure = e.target.closest('figure');
    if (!figure || e.target.closest('figcaption')) return;
    const img = figure.querySelector('img');
    const url = img && (img.currentSrc || img.src);
    if (!url) return;
    e.preventDefault(); // 阻止包在 <a> 內圖片的錯誤原生導向
    window.open(url, '_blank', 'noopener');
  });
}

/** 初始化 AOS scroll animation（由 CDN 以全域 AOS 載入）。 */
function initAOS() {
  if (typeof window.AOS === 'undefined') return;
  window.AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/** 啟動所有元件。 */
function bootstrap() {
  initAOS();
  initNavbar();
  initCountUp();
  initTabs();
  initAccordion();
  initComparison();
  initCaseMatrix();
  initRadarChart();
  initQuiz();
  initImageZoom();
  // TODO: 後續章節元件於此依序掛載
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
