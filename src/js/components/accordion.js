/**
 * Accordion 元件
 * 每個 .accordion-trigger 的下一個兄弟元素為 .accordion-panel。
 * 以 maxHeight 過渡實現平滑展開／收合。
 */

export function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains('accordion-panel')) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      trigger.classList.toggle('is-open', !isOpen);
      panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
    });
  });
}
