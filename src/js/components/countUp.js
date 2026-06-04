/**
 * countUp 元件
 * 當帶有 .count-up 的元素捲入視窗時，從 0 動畫遞增至 data-count-target。
 *   data-count-target   目標數值（必填）
 *   data-count-decimals 小數位數（預設 0）
 */

const DURATION = 1800; // ms

function animate(el) {
  const target = parseFloat(el.dataset.countTarget);
  const decimals = parseInt(el.dataset.countDecimals || '0', 10);
  if (Number.isNaN(target)) return;

  // 尊重「減少動態」偏好：直接顯示最終值
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target.toFixed(decimals);
    return;
  }

  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(decimals);
  };
  requestAnimationFrame(step);
}

export function initCountUp() {
  const els = document.querySelectorAll('.count-up');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(animate);
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  els.forEach((el) => io.observe(el));
}
