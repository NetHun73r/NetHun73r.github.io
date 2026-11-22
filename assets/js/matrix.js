(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Lightweight Matrix rain canvas; pauses when tab is hidden and scales for mobile.
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  let width = 0, height = 0, columns = 0, drops = [], fontSize = 14, raf = 0;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン<>/{}[]';
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fontSize = width < 600 ? 12 : 14;
    columns = Math.ceil(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -height / fontSize);
  }
  function draw() {
    if (document.hidden) { raf = 0; return; }
    ctx.fillStyle = 'rgba(3, 7, 5, 0.09)'; ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize, y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > .97 ? '#baffd0' : '#00a94b';
      ctx.fillText(char, x, y);
      if (y > height && Math.random() > .975) drops[i] = Math.random() * -20;
      drops[i] += .35 + Math.random() * .35;
    }
    raf = requestAnimationFrame(draw);
  }
  function start() { if (!raf && !document.hidden) raf = requestAnimationFrame(draw); }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
  resize(); start();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  // Reveal cards gently on scroll.
  const revealTargets = document.querySelectorAll('.matrix-domain, .matrix-about-panel, .matrix-section__heading');
  revealTargets.forEach(el => el.classList.add('matrix-reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));
})();
