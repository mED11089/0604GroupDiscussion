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
 * 讓「圖集」連結指向與圖片相同的解析後網址（含 Vite base）。
 * Vite 會為 <img src> 加上 base 前綴，但不會處理 <a href>；於子路徑
 * 部署（GitHub Pages）時，原始的 /images/... 連結會 404。改用 img.src
 * （已解析的絕對網址）即可在 dev 與 production 皆正確開啟。
 */
function syncGalleryLinks() {
  document.querySelectorAll('figure a > img').forEach((img) => {
    const link = img.parentElement;
    if (link && link.tagName === 'A') link.setAttribute('href', img.src);
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
  syncGalleryLinks();
  // TODO: 後續章節元件於此依序掛載
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
