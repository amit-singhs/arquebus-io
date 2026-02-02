/**
 * ARQUEBUS — Minimal Interactions
 * Clean, purposeful enhancements
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollReveal();
    initSmoothScroll();
    initNavHighlight();
    initContactForm();
  }

  /**
   * Scroll Reveal — Staggered fade-in for sections
   */
  function initScrollReveal() {
    const revealTargets = [
      '.section-head',
      '.project',
      '.philosophy-lead',
      '.philosophy-body',
      '.philosophy-stats .stat',
      '.contact-text',
      '.contact-form'
    ];

    revealTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.1}s`;
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /**
   * Smooth Scroll — Anchor link handling
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Navigation — Active section highlighting
   */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.style.color = isActive ? 'var(--ink)' : '';
          });
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Contact Form — Submission handling
   */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const btn = form.querySelector('.form-btn');
      const label = btn.querySelector('.btn-label');
      const originalText = label.textContent;

      // Loading state
      btn.disabled = true;
      label.textContent = 'Sending...';

      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Success
        label.textContent = 'Sent!';
        btn.classList.add('success');
        form.reset();

        // Reset after delay
        setTimeout(() => {
          label.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('success');
        }, 2500);

      } catch (err) {
        // Error state
        label.textContent = 'Failed. Retry?';
        btn.disabled = false;

        setTimeout(() => {
          label.textContent = originalText;
        }, 2500);
      }
    });
  }

})();
