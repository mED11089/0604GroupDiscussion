/**
 * Navbar 元件
 * - 初始透明、捲動後變白底加陰影（切換 .scrolled，樣式見 style.css）
 * - 頂部閱讀進度條
 * - 手機版漢堡選單
 */

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('reading-progress');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('nav-icon-open');
  const iconClose = document.getElementById('nav-icon-close');

  // --- 捲動：navbar 外觀 + 進度條 ---
  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);

    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (y / scrollable) * 100 : 0;
      progress.style.width = `${pct}%`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // --- 手機選單開關 ---
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      iconOpen?.classList.toggle('hidden', open);
      iconClose?.classList.toggle('hidden', !open);
    };

    toggle.addEventListener('click', () => {
      setOpen(menu.classList.contains('hidden'));
    });

    // 點選連結後自動收合
    menu.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => setOpen(false))
    );
  }
}
