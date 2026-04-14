/* ========================================
   VITALI8 - Interactive JS
   GSAP ScrollTrigger, Cursor, Nav, Interactions
   ======================================== */

(function() {
  'use strict';

  // Wait for DOM + GSAP
  const init = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(init, 100);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      hideLoader();
      return;
    }

    initLoader();
    initScrollProgress();
    initNavigation();
    initCursor();
    initHeroAnimations();
    initScrollAnimations();
    initProductGallery();
    initQuantitySelector();
    initAddToCart();
    initFAQ();
    initReviewsCarousel();
    initEmailCapture();
    initButtonRipple();
    initParallax();
    initCounters();
  };

  /* ========================================
     Loading Screen
     ======================================== */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hasVisited = sessionStorage.getItem('vitali8_visited');

    if (hasVisited) {
      loader.style.display = 'none';
      return;
    }

    const logo = loader.querySelector('.loader__logo');
    gsap.timeline()
      .to(logo, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })
      .to(logo, { scale: 0.5, duration: 0.5, ease: 'power2.inOut', delay: 0.5 })
      .to(loader, { opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: hideLoader });

    sessionStorage.setItem('vitali8_visited', 'true');
  }

  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
  }

  /* ========================================
     Scroll Progress Bar
     ======================================== */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ========================================
     Navigation
     ======================================== */
  function initNavigation() {
    const header = document.getElementById('siteHeader');
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll behavior
    if (header) {
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
      }, { passive: true });
    }

    // Mobile menu
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        mobileMenu.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ========================================
     Custom Cursor
     ======================================== */
  function initCursor() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animate() {
      // Dot follows immediately
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      // Ring trails behind
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

      requestAnimationFrame(animate);
    }
    animate();

    // Expand on interactive elements
    const interactiveElements = 'a, button, input, .glass-card, .who-for__card, .product-gallery__thumb, .pill';
    document.querySelectorAll(interactiveElements).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
    });
  }

  /* ========================================
     Hero Animations
     ======================================== */
  function initHeroAnimations() {
    // Word stagger animation
    const words = document.querySelectorAll('.hero__title .word');
    if (words.length) {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.8
      });
    }

    // Subtitle
    const subtitle = document.querySelector('.hero__subtitle');
    if (subtitle) {
      gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.4 });
    }

    // CTA
    const cta = document.querySelector('.hero__cta');
    if (cta) {
      gsap.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.6 });
    }

    // Trust badges
    const badges = document.querySelectorAll('.trust-badge');
    if (badges.length) {
      gsap.to(badges, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.trust-strip',
          start: 'top 90%'
        }
      });
    }

    // Spotlight follows mouse
    const spotlight = document.getElementById('heroSpotlight');
    if (spotlight) {
      document.querySelector('.hero').addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
          spotlight.style.left = e.clientX + 'px';
          spotlight.style.top = e.clientY + 'px';
        });
      }, { passive: true });
    }
  }

  /* ========================================
     Scroll Reveal Animations
     ======================================== */
  function initScrollAnimations() {
    // Generic reveal elements
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Divider draw animations
    gsap.utils.toArray('.divider-draw').forEach(el => {
      gsap.fromTo(el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Heading letter-spacing animations
    gsap.utils.toArray('.heading-animate').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => el.classList.add('visible')
      });
    });

    // How-to-use step circle draw
    document.querySelectorAll('.step').forEach(step => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        once: true,
        onEnter: () => step.classList.add('visible')
      });
    });

    // Brand story word stagger
    const brandWords = document.querySelectorAll('.brand-story__title .word');
    if (brandWords.length) {
      gsap.fromTo(brandWords,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.brand-story__title',
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Ingredients big number
    const bigNum = document.querySelector('.ingredients__big-number');
    if (bigNum) {
      gsap.fromTo(bigNum,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bigNum,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    const bigText = document.querySelector('.ingredients__big-text');
    if (bigText) {
      gsap.fromTo(bigText,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: bigText,
            start: 'top 80%',
            once: true
          }
        }
      );
    }
  }

  /* ========================================
     Counter Animations
     ======================================== */
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      const hasSuffix = counter.textContent.includes('%');
      const suffix = hasSuffix ? '%' : '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              counter.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });
    });
  }

  /* ========================================
     Parallax
     ======================================== */
  function initParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;

      gsap.to(el, {
        yPercent: -20 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  /* ========================================
     Product Gallery
     ======================================== */
  function initProductGallery() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbs = document.querySelectorAll('.product-gallery__thumb');
    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.getAttribute('data-image');
        if (!newSrc || mainImage.src === newSrc) return;

        // Crossfade
        gsap.to(mainImage, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            mainImage.src = newSrc;
            mainImage.alt = thumb.getAttribute('aria-label') || 'Product image';
            gsap.to(mainImage, { opacity: 1, duration: 0.3 });
          }
        });

        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  /* ========================================
     Quantity Selector
     ======================================== */
  function initQuantitySelector() {
    const minus = document.getElementById('qtyMinus');
    const plus = document.getElementById('qtyPlus');
    const value = document.getElementById('qtyValue');
    if (!minus || !plus || !value) return;

    let qty = 1;

    minus.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        value.textContent = qty;
      }
    });

    plus.addEventListener('click', () => {
      if (qty < 10) {
        qty++;
        value.textContent = qty;
      }
    });
  }

  /* ========================================
     Add to Cart
     ======================================== */
  function initAddToCart() {
    const btn = document.getElementById('addToCartBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = 'ADDED \u2713';
      btn.classList.add('added');

      // Ripple effect
      btn.classList.add('ripple');
      setTimeout(() => btn.classList.remove('ripple'), 600);

      // Update cart count in header
      const qty = parseInt((document.getElementById('qtyValue') || {}).textContent, 10) || 1;
      updateCartCount(qty);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('added');
      }, 2000);
    });
  }

  function updateCartCount(addQty) {
    document.querySelectorAll('.header__cart-count').forEach(badge => {
      const current = parseInt(badge.textContent, 10) || 0;
      const newCount = current + addQty;
      badge.textContent = newCount;
      // Brief scale animation
      badge.style.transform = 'scale(1.4)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    });
  }

  /* ========================================
     FAQ Accordion
     ======================================== */
  function initFAQ() {
    document.querySelectorAll('[data-faq]').forEach(item => {
      const question = item.querySelector('.faq-item__question');
      const answer = item.querySelector('.faq-item__answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('[data-faq].active').forEach(activeItem => {
          activeItem.classList.remove('active');
          const activeAnswer = activeItem.querySelector('.faq-item__answer');
          if (activeAnswer) activeAnswer.style.maxHeight = '0';
          const activeBtn = activeItem.querySelector('.faq-item__question');
          if (activeBtn) activeBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ========================================
     Reviews Carousel
     ======================================== */
  function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const carousel = document.getElementById('reviewsCarousel');
    if (!track || !carousel) return;

    // Clone cards for infinite loop
    const cards = track.children;
    const cardCount = cards.length;
    if (cardCount === 0) return;

    // Clone all cards
    for (let i = 0; i < cardCount; i++) {
      track.appendChild(cards[i].cloneNode(true));
    }

    let offset = 0;
    const speed = 0.5; // px per frame
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    // Auto scroll
    function autoScroll() {
      if (!isPaused && !isDragging) {
        offset += speed;
        const singleSetWidth = track.scrollWidth / 2;
        if (offset >= singleSetWidth) offset = 0;
        track.style.transform = `translateX(-${offset}px)`;
      }
      requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; isDragging = false; });

    // Drag
    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      scrollStart = offset;
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = startX - e.clientX;
      offset = Math.max(0, scrollStart + dx);
      track.style.transform = `translateX(-${offset}px)`;
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support
    carousel.addEventListener('touchstart', (e) => {
      isPaused = true;
      startX = e.touches[0].clientX;
      scrollStart = offset;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      const dx = startX - e.touches[0].clientX;
      offset = Math.max(0, scrollStart + dx);
      track.style.transform = `translateX(-${offset}px)`;
    }, { passive: true });

    carousel.addEventListener('touchend', () => { isPaused = false; });
  }

  /* ========================================
     Email Capture
     ======================================== */
  function initEmailCapture() {
    const form = document.getElementById('emailCaptureForm');
    const submitBtn = document.getElementById('emailSubmitBtn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (!email || !email.value) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "YOU'RE IN \u2713";
      submitBtn.classList.add('submitted');
      email.value = '';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('submitted');
      }, 3000);
    });
  }

  /* ========================================
     Button Ripple Effect
     ======================================== */
  function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty('--ripple-x', x + '%');
        this.style.setProperty('--ripple-y', y + '%');
        this.classList.add('ripple');
        setTimeout(() => this.classList.remove('ripple'), 600);
      });
    });
  }

  /* ========================================
     3D Product Tilt (CSS fallback for hero)
     ======================================== */
  function initProductTilt() {
    const product = document.querySelector('.hero__product-image');
    if (!product) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      requestAnimationFrame(() => {
        product.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
      });
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      product.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
