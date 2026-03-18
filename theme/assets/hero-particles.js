/* ========================================
   VITALI8 - Purple Particle Background
   Floating particles in the hero section
   ======================================== */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    const particleCount = 40;
    let animationId;
    let isVisible = true;

    function resize() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 200 + 100,
        maxLife: 0,
        pulse: Math.random() * Math.PI * 2
      };
    }

    function initParticleArray() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const p = createParticle();
        p.maxLife = p.life;
        particles.push(p);
      }
    }

    function draw() {
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.pulse += 0.02;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, (p.maxLife - p.life) / 30);
        const fadeOut = Math.min(1, p.life / 30);
        const currentOpacity = p.opacity * fadeIn * fadeOut * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${currentOpacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 33, 168, ${currentOpacity * 0.15})`;
        ctx.fill();

        // Reset dead particles
        if (p.life <= 0 || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          particles[i] = createParticle();
          particles[i].maxLife = particles[i].life;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    // Visibility observer - pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvas.parentElement);

    // Init
    resize();
    initParticleArray();
    draw();

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initParticleArray();
      }, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})();
