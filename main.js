/**
 * ARQUEBUS — Interactive Enhancements
 * Scroll-based reveals and subtle interactions
 */

(function() {
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollReveal();
    initSmoothScroll();
    initNavHighlight();
    initParallax();
  }

  /**
   * Scroll Reveal Animation
   * Elements with .reveal class fade in when entering viewport
   */
  function initScrollReveal() {
    // Add reveal class to elements we want to animate
    const revealSelectors = [
      '.section-header',
      '.tool-card',
      '.about-text > *',
      '.about-stats .stat',
      '.contact-inner > *'
    ];

    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    // Intersection Observer for reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 100;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Highlight active nav section
   */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Subtle parallax effect on hero visual
   */
  function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const rate = scrolled * 0.3;

          if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${rate}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Optional: Add ember particle effect to forge core
   * Uncomment to enable
   */
  /*
  function initEmberParticles() {
    const forgeCore = document.querySelector('.forge-core');
    if (!forgeCore) return;

    const createEmber = () => {
      const ember = document.createElement('span');
      ember.className = 'ember-particle';
      ember.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--ember-hot);
        border-radius: 50%;
        pointer-events: none;
        animation: emberFloat 2s ease-out forwards;
        left: ${50 + (Math.random() - 0.5) * 20}%;
        bottom: 50%;
      `;

      forgeCore.parentElement.appendChild(ember);
      setTimeout(() => ember.remove(), 2000);
    };

    setInterval(createEmber, 300);
  }
  */

})();
