/* ========================================
   VITALI8 - Three.js 3D Product Viewer
   Renders a rotating product cylinder in the hero
   Falls back to CSS 3D tilt if Three.js fails
   ======================================== */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function initThreeProduct() {
    if (typeof THREE === 'undefined') {
      initFallback();
      return;
    }

    const canvas = document.getElementById('productCanvas');
    if (!canvas) return;

    const container = document.getElementById('heroProduct');
    if (!container) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x8B5CF6, 1.5, 100);
      pointLight.position.set(3, 3, 5);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0x6B21A8, 0.8, 100);
      pointLight2.position.set(-3, -2, 3);
      scene.add(pointLight2);

      // Create cylinder (tub shape)
      const geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.2, 64);

      // Try loading label texture
      const textureLoader = new THREE.TextureLoader();
      const material = new THREE.MeshPhongMaterial({
        color: 0x1A1F2E,
        specular: 0x6B21A8,
        shininess: 60,
        transparent: false
      });

      // Attempt to load product texture
      const productImageUrl = getAssetUrl('product-hero.jpg');
      if (productImageUrl) {
        textureLoader.load(
          productImageUrl,
          function(texture) {
            material.map = texture;
            material.color.set(0xffffff);
            material.needsUpdate = true;
          },
          undefined,
          function() {
            // Texture load failed, keep default material
          }
        );
      }

      const cylinder = new THREE.Mesh(geometry, material);
      scene.add(cylinder);

      // Lid
      const lidGeometry = new THREE.CylinderGeometry(1.25, 1.25, 0.15, 64);
      const lidMaterial = new THREE.MeshPhongMaterial({
        color: 0x6B21A8,
        specular: 0x8B5CF6,
        shininess: 80
      });
      const lid = new THREE.Mesh(lidGeometry, lidMaterial);
      lid.position.y = 1.175;
      scene.add(lid);

      // Group for rotation
      const group = new THREE.Group();
      group.add(cylinder);
      group.add(lid);
      scene.add(group);

      // Mouse tracking
      let mouseX = 0, mouseY = 0;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if (!isTouchDevice) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
          const rect = container.getBoundingClientRect();
          mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        }, { passive: true });
      }

      // Animation loop
      let rotationY = 0;
      function animate() {
        requestAnimationFrame(animate);

        rotationY += 0.003;
        group.rotation.y = rotationY + mouseX * 0.3;
        group.rotation.x = -0.15 + mouseY * 0.15;

        renderer.render(scene, camera);
      }
      animate();

      // Resize handler
      function onResize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }

      window.addEventListener('resize', debounce(onResize, 200));

      // Show canvas, hide noscript fallback
      canvas.style.display = 'block';

    } catch (error) {
      console.warn('Three.js product viewer failed, using fallback:', error);
      initFallback();
    }
  }

  /* ========================================
     CSS 3D Tilt Fallback (Option B)
     ======================================== */
  function initFallback() {
    const canvas = document.getElementById('productCanvas');
    if (canvas) canvas.style.display = 'none';

    const container = document.getElementById('heroProduct');
    if (!container) return;

    // Create image element
    const img = document.createElement('img');
    img.className = 'hero__product-image';
    img.src = getAssetUrl('product-mockup.png') || '';
    img.alt = 'Vitali8 Creatine Monohydrate Powder 600g tub';
    img.width = 450;
    img.height = 450;
    img.loading = 'eager';
    img.style.transition = 'transform 0.15s ease-out';
    container.insertBefore(img, container.firstChild);

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.addEventListener('mousemove', (e) => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          requestAnimationFrame(() => {
            img.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
          });
        }, { passive: true });

        hero.addEventListener('mouseleave', () => {
          img.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
      }
    } else {
      // Float animation on mobile
      img.classList.add('anim-float');
    }
  }

  /* ========================================
     Helpers
     ======================================== */
  function getAssetUrl(filename) {
    // Try to find asset URL from Shopify's asset pipeline
    // Look for image elements or data attributes that contain the URL
    const existingImg = document.querySelector(`img[src*="${filename}"]`);
    if (existingImg) return existingImg.src;

    // Try noscript content
    const noscript = document.querySelector('.hero__product noscript');
    if (noscript) {
      const temp = document.createElement('div');
      temp.innerHTML = noscript.textContent;
      const img = temp.querySelector('img');
      if (img) return img.src;
    }

    return null;
  }

  function debounce(fn, wait) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initThreeProduct, 100));
  } else {
    setTimeout(initThreeProduct, 100);
  }
})();
