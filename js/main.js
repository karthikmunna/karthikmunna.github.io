document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initMobileMenu();
  initThemeToggle();
});

function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.tab-panel');
  const mobileItems = document.querySelectorAll('.mobile-nav-item');
  const content = document.querySelector('.content');

  function switchTab(tabId) {
    panels.forEach(p => p.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));
    mobileItems.forEach(m => m.classList.remove('active'));

    const target = document.getElementById(tabId);
    if (target) {
      target.classList.add('active');
      if (content) content.scrollTop = 0;
    }

    navItems.forEach(n => {
      if (n.dataset.tab === tabId) n.classList.add('active');
    });
    mobileItems.forEach(m => {
      if (m.dataset.tab === tabId) m.classList.add('active');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });

  mobileItems.forEach(item => {
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
      closeMobileMenu();
    });
  });
}

function initMobileMenu() {
  const openBtn = document.getElementById('hamburger');
  const closeBtn = document.getElementById('mobile-close');

  openBtn?.addEventListener('click', () => {
    document.getElementById('mobile-overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('mobile-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Apply saved theme on load
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      btn.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      btn.textContent = '☀️';
    }
  });
}
