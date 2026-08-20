/* ==========================================================================
   Archenaa J — Reusable Components
   Centralized header, footer, and contact modal rendered via JavaScript.
   Single source of truth for site-wide configuration.
   ========================================================================== */

/**
 * SITE CONFIGURATION
 * Change logo, navigation, email, or copyright in one place.
 */
const SITE_CONFIG = {
  /* Logo — set logoSrc to an image path (e.g. 'assets/logos/logo.png')
     to use an image logo. Leave empty string to use the text monogram. */
  logoSrc: '',
  logoAlt: 'Archenaa J',
  monogram: 'AJ',
  siteName: 'Archenaa J',

  /* Navigation links */
  navLinks: [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'research.html', label: 'Research' },
    { href: 'publications.html', label: 'Publications' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'contact.html', label: 'Contact' }
  ],

  /* Contact */
  email: 'saiarchenaastudy@gmail.com',

  /* Footer */
  tagline: 'Industry Researcher — Artificial Intelligence | Software Testing | Healthcare Technology',
  profilesText: 'Professional profiles coming soon',
  copyrightYear: new Date().getFullYear(),

  /* Contact Modal */
  formAction: 'contact-handler.php'
};

/* ---------- Utility ---------- */

/** Get the current page filename for active nav detection */
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  // Normalize: treat empty path or '/' as index.html
  return page === '' ? 'index.html' : page;
}

/** Escape HTML special characters to prevent injection */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Build the logo HTML — image with onerror fallback, or monogram.
 * @param {string} context - 'header' or 'footer' for class names
 */
function buildLogoHtml(context) {
  const safeAlt = escapeHtml(SITE_CONFIG.logoAlt);
  const safeName = escapeHtml(SITE_CONFIG.siteName);
  const safeMonogram = escapeHtml(SITE_CONFIG.monogram);

  if (SITE_CONFIG.logoSrc && typeof SITE_CONFIG.logoSrc === 'string' && SITE_CONFIG.logoSrc.trim() !== '') {
    // Validate that the logo path is a relative path or starts with assets/
    const src = escapeHtml(SITE_CONFIG.logoSrc.trim());
    return `
      <img
        src="${src}"
        alt="${safeAlt}"
        class="${context}-logo-img"
        width="38" height="38"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';this.parentElement.querySelector('.${context}-brand-text').style.display='';"
      >
      <div class="monogram" style="display:none;">${safeMonogram}</div>
      <span class="${context}-brand-text" style="display:none;">${safeName}</span>
    `;
  }

  // Default: monogram + text
  return `
    <div class="monogram">${safeMonogram}</div>
    <span>${safeName}</span>
  `;
}

/* ---------- Renderers ---------- */

/** Render the site header into #site-header */
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;

  const currentPage = getCurrentPage();
  const navItems = SITE_CONFIG.navLinks.map(link => {
    const activeClass = link.href === currentPage ? ' active' : '';
    const safeLabel = escapeHtml(link.label);
    const safeHref = escapeHtml(link.href);
    return `<li><a href="${safeHref}" class="nav-link${activeClass}">${safeLabel}</a></li>`;
  }).join('\n            ');

  el.outerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="header-brand" aria-label="${escapeHtml(SITE_CONFIG.siteName)} — Home">
        ${buildLogoHtml('header')}
      </a>
      <nav aria-label="Main navigation">
        <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-backdrop" id="nav-backdrop"></div>
        <ul class="nav-list">
            ${navItems}
        </ul>
      </nav>
    </div>
  </header>`;
}

/** Render the site footer into #site-footer */
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const safeEmail = escapeHtml(SITE_CONFIG.email);
  const safeTagline = escapeHtml(SITE_CONFIG.tagline);
  const safeProfiles = escapeHtml(SITE_CONFIG.profilesText);
  const safeName = escapeHtml(SITE_CONFIG.siteName);

  el.outerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-left">
          <div class="footer-brand">
            ${buildLogoHtml('footer')}
          </div>
          <p class="footer-tagline">${safeTagline}</p>
        </div>
        <div class="footer-right">
          <a href="mailto:${safeEmail}" class="footer-email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            ${safeEmail}
          </a>
          <p class="footer-profiles">${safeProfiles}</p>
        </div>
      </div>
      <p class="footer-copyright">&copy; ${SITE_CONFIG.copyrightYear} ${safeName}. All rights reserved.</p>
    </div>
  </footer>`;
}

/** Render the contact modal into #site-modal */
function renderModal() {
  const el = document.getElementById('site-modal');
  if (!el) return;

  const safeAction = escapeHtml(SITE_CONFIG.formAction);

  el.outerHTML = `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Contact form">
    <div class="modal-card">
      <button class="modal-close" aria-label="Close contact form">&times;</button>
      <h3>Get in Touch</h3>
      <p class="subtitle">Send a message for research discussion, collaboration, or inquiry.</p>

      <form class="contact-form" action="${safeAction}" method="POST" novalidate>
        <div class="form-group">
          <label for="modal-name">Name</label>
          <input type="text" id="modal-name" name="name" required autocomplete="name" placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="modal-email">Email</label>
          <input type="email" id="modal-email" name="email" required autocomplete="email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label for="modal-message">Message</label>
          <textarea id="modal-message" name="message" required placeholder="Your message\u2026"></textarea>
        </div>
        <div class="hp-field" aria-hidden="true">
          <label for="modal-website">Website</label>
          <input type="text" id="modal-website" name="website" tabindex="-1" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-primary form-submit-btn">Send Message \u2709</button>
        <div class="form-message"></div>
      </form>
    </div>
  </div>`;
}

/* ---------- Initialize ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderModal();
});
