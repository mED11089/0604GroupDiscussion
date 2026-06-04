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
  // TODO: 後續章節元件於此依序掛載
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
