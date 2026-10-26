/**
 * Abdul Wahab Talha Portfolio - Main Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMobileMenu() {
    if (navMenu && mobileToggle) {
      navMenu.classList.remove('is-active');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('is-active');
      mobileToggle.classList.toggle('is-active', isExpanded);
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-active')) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // 2. Smooth Scrolling for Anchor Links with dynamic header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = window.innerWidth <= 768 ? 64 : 74;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Subtle Scroll Reveal Animations
  const revealElements = document.querySelectorAll(
    '.moment-card, .service-card, .wts-nova-left, .footer-paper-sticker, .footer-middle-col'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }

  // 5. Mobile Horizontal Slider Scroll Buttons
  function setupSliderScroll(prevId, nextId, containerId) {
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const container = document.getElementById(containerId);

    if (prevBtn && nextBtn && container) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  }

  setupSliderScroll('reelsPrevBtn', 'reelsNextBtn', 'reelsGrid');
  setupSliderScroll('momentsPrevBtn', 'momentsNextBtn', 'momentsGrid');
});
