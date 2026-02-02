/**
 * ARQUEBUS — Enhanced Interactions
 * Sophisticated animations and micro-interactions
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initCursorGlow();
    initScrollReveal();
    initSmoothScroll();
    initNavHighlight();
    initContactForm();
  }

  /**
   * Loading Screen
   */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Hide loader after animation completes
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1400);

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cursor Glow Effect
   */
  function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      glow.style.left = currentX + 'px';
      glow.style.top = currentY + 'px';

      requestAnimationFrame(animate);
    }

    animate();
  }

  /**
   * Scroll Reveal — Staggered animations
   */
  function initScrollReveal() {
    const revealTargets = [
      '.section-header',
      '.project-card',
      '.ethos-quote',
      '.ethos-text',
      '.stats-row .stat-card',
      '.connect-info',
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
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /**
   * Smooth Scroll — Anchor handling
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 100;
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
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            if (isActive) {
              link.style.color = 'var(--text-primary)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Contact Form — Enhanced submission handling
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
      btn.classList.add('loading');

      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state
        btn.classList.remove('loading');
        btn.classList.add('success');
        label.textContent = 'Message Sent!';
        form.reset();

        // Reset after delay
        setTimeout(() => {
          label.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('success');
        }, 3000);

      } catch (err) {
        // Error state
        btn.classList.remove('loading');
        label.textContent = 'Failed. Try again?';
        btn.disabled = false;

        setTimeout(() => {
          label.textContent = originalText;
        }, 3000);
      }
    });
  }

  /**
   * Parallax — Subtle depth on hero elements
   */
  function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            const rate = scrolled * 0.2;
            heroVisual.style.transform = `translateY(${rate}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

})();
