/* ==========================================================================
   Archenaa J — Shared JavaScript
   Mobile menu, active nav, contact modal, AJAX form handler, abstract toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     ------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  const navBackdrop = document.querySelector('.nav-backdrop');

  function openMobileNav() {
    if (!navList || !hamburger) return;
    navList.classList.add('is-open');
    hamburger.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-open');
    document.body.classList.add('body-no-scroll');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!navList || !hamburger) return;
    navList.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    document.body.classList.remove('body-no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navList) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navList.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close mobile nav when a link is clicked
    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on backdrop click
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close on click outside nav
    document.addEventListener('click', (e) => {
      if (navList.classList.contains('is-open')) {
        const isClickInsideNav = navList.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInsideNav) {
          closeMobileNav();
        }
      }
    });

    // Escape key closes mobile nav
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // Close mobile nav on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navList.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }


  /* ------------------------------------------------------------------
     2. ACTIVE NAV HIGHLIGHTING
     Compares the current page filename to each nav link's href.
     ------------------------------------------------------------------ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });


  /* ------------------------------------------------------------------
     3. CONTACT MODAL (sitewide popup)
     Opened by any element with [data-open-modal="contact"]
     ------------------------------------------------------------------ */
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCard = modalOverlay ? modalOverlay.querySelector('.modal-card') : null;
  const modalCloseBtn = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
  let lastFocusedEl = null; // For returning focus on close

  function openModal() {
    if (!modalOverlay) return;
    lastFocusedEl = document.activeElement;
    modalOverlay.classList.add('is-open');
    document.body.classList.add('body-no-scroll');

    // Move focus into modal
    const firstInput = modalCard.querySelector('input, textarea, button');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    document.body.classList.remove('body-no-scroll');

    // Clear any form messages inside modal
    const msg = modalCard.querySelector('.form-message');
    if (msg) { msg.className = 'form-message'; msg.textContent = ''; }

    // Return focus to trigger element
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  // Open triggers — any element with data-open-modal="contact"
  document.querySelectorAll('[data-open-modal="contact"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    // Click on backdrop (outside modal card)
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Basic focus trap inside modal
  if (modalCard) {
    modalCard.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = modalCard.querySelectorAll(
        'input:not([type="hidden"]):not(.hp-field input), textarea, button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }


  /* ------------------------------------------------------------------
     4. SHARED AJAX FORM HANDLER
     Works for both the inline contact form and the modal contact form.
     Each form should have class "contact-form" and a child ".form-message".
     ------------------------------------------------------------------ */
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const msgEl = form.querySelector('.form-message');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      // Clear previous messages
      if (msgEl) {
        msgEl.className = 'form-message';
        msgEl.textContent = '';
      }

      try {
        const formData = new FormData(form);

        const response = await fetch('contact-handler.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          if (msgEl) {
            msgEl.className = 'form-message form-message--success';
            msgEl.textContent = 'Thank you — your message has been sent.';
          }
          form.reset();
        } else {
          if (msgEl) {
            msgEl.className = 'form-message form-message--error';
            msgEl.textContent = data.error || 'Something went wrong. Please try again.';
          }
        }
      } catch (err) {
        if (msgEl) {
          msgEl.className = 'form-message form-message--error';
          msgEl.textContent = 'Network error. Please check your connection and try again.';
        }
      } finally {
        // Restore button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });


  /* ------------------------------------------------------------------
     5. PUBLICATION ABSTRACT TOGGLE
     ------------------------------------------------------------------ */
  document.querySelectorAll('.abstract-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const contentEl = btn.nextElementSibling; // .abstract-content
      if (!contentEl) return;

      const isOpen = contentEl.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

});
