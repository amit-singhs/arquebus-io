/**
 * ARQUEBUS — Interactions
 * Section reveal, smooth scroll, form handling
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initSectionReveal();
    initSmoothScroll();
    initContactForm();
  }

  /**
   * Section Reveal — Triggers animations when sections enter viewport
   */
  function initSectionReveal() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
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
   * Contact Form — Submission handling
   */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        btn.textContent = 'Sent!';
        btn.classList.add('success');
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('success');
        }, 2500);

      } catch (err) {
        btn.textContent = 'Error. Try again.';
        btn.disabled = false;

        setTimeout(() => {
          btn.textContent = originalText;
        }, 2500);
      }
    });
  }

})();
