/**
 * Tabs 元件
 * 容器加上 [data-tabs]；按鈕用 [data-tab="name"]，對應內容用 [data-panel="name"]。
 */

export function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');

    const activate = (name) => {
      tabs.forEach((tab) => {
        const on = tab.dataset.tab === name;
        tab.classList.toggle('tab-active', on);
        tab.setAttribute('aria-selected', String(on));
      });
      panels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.dataset.panel !== name);
      });
      // 切換分頁後重新計算 AOS 位置，讓新顯示的卡片觸發動畫
      if (typeof window.AOS !== 'undefined') window.AOS.refresh();
    };

    tabs.forEach((tab) =>
      tab.addEventListener('click', () => activate(tab.dataset.tab))
    );
  });
}
