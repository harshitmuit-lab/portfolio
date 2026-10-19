/* Standalone progressive enhancement. The HTML links work before this runs. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const states = [];

for (const link of document.querySelectorAll('.work-link')) {
  for (const word of link.querySelectorAll('.word')) {
    const fragment = document.createDocumentFragment();
    for (const letter of word.textContent) {
      const glyph = document.createElement('span');
      glyph.className = 'glyph';
      glyph.dataset.letter = letter;
      const face = document.createElement('span');
      face.className = 'glyph-face';
      face.textContent = letter;
      glyph.append(face);
      fragment.append(glyph);
    }
    word.replaceChildren(fragment);
    word.dataset.typeset = '';
  }
  link.dataset.ready = '';
  const state = {
    link,
    units: [...link.querySelectorAll('.glyph, .press-arrow')],
    centers: null,
    frame: 0,
    release: 0,
    pointer: { x: 0, y: 0 },
  };
  states.push(state);

  function measure() {
    state.centers = state.units.map(unit => {
      const rect = unit.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, radius: Math.max(100, rect.height * 1.9) };
    });
  }

  function impress() {
    state.frame = 0;
    if (reducedMotion.matches || document.hidden) return;
    if (!state.centers) measure();
    state.units.forEach((unit, index) => {
      const center = state.centers[index];
      const distance = Math.hypot(state.pointer.x - center.x, (state.pointer.y - center.y) * .7);
      const pressure = Math.max(0, 1 - distance / center.radius);
      // A small, monotonic depression. CSS controls the short settling time.
      const smooth = pressure * pressure * (3 - 2 * pressure);
      unit.style.setProperty('--press', smooth.toFixed(3));
    });
  }

  function follow(event) {
    if (event.pointerType === 'touch' || reducedMotion.matches || document.hidden) return;
    state.pointer = { x: event.clientX, y: event.clientY };
    if (!state.frame) state.frame = requestAnimationFrame(impress);
  }

  state.reset = () => {
    cancelAnimationFrame(state.frame);
    clearTimeout(state.release);
    state.frame = 0;
    state.centers = null;
    link.classList.remove('is-pressed');
    state.units.forEach(unit => unit.style.removeProperty('--press'));
  };

  link.addEventListener('pointerenter', event => { state.centers = null; follow(event); });
  link.addEventListener('pointermove', follow, { passive: true });
  link.addEventListener('pointerleave', state.reset);
  link.addEventListener('pointercancel', state.reset);
  link.addEventListener('blur', state.reset);
  link.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    clearTimeout(state.release);
    link.classList.add('is-pressed');
  });
  link.addEventListener('pointerup', () => {
    // Never delay, cancel, or replay a real navigation for the visual feedback.
    state.release = setTimeout(() => link.classList.remove('is-pressed'), 160);
  });
}

const resetAll = () => states.forEach(state => state.reset());
window.addEventListener('resize', resetAll, { passive: true });
window.addEventListener('scroll', resetAll, { passive: true });
window.addEventListener('blur', resetAll);
reducedMotion.addEventListener('change', resetAll);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetAll(); });
document.fonts?.ready.then(resetAll);

const notice = document.querySelector('.notice');
let noticeTimer;
function dismissNotice() {
  clearTimeout(noticeTimer);
  notice.classList.remove('is-visible');
  notice.textContent = '';
}
for (const link of document.querySelectorAll('[data-pending]')) {
  link.addEventListener('click', event => {
    event.preventDefault();
    clearTimeout(noticeTimer);
    notice.textContent = `${link.dataset.pending} — link coming soon.`;
    notice.classList.add('is-visible');
    noticeTimer = setTimeout(dismissNotice, 3500);
  });
}
document.addEventListener('keydown', event => { if (event.key === 'Escape') { dismissNotice(); resetAll(); } });

/* Frame Scrubbing (Canvas-based for 0ms seek latency and 60/120fps fluid response) */
const canvas = document.getElementById('scrub-video');
if (canvas && window.matchMedia('(hover: hover)').matches) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const totalFrames = 58;
  const frames = [];
  let currentProgress = 0;
  let targetProgress = 0;
  let rafId = null;

  canvas.width = 1920;
  canvas.height = 1080;

  // Preload all frames asynchronously
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `/videos/frames/frame_${String(i).padStart(3, '0')}.webp`;
    img.onload = () => {
      if (i === 1 && currentProgress === 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
    frames.push(img);
  }

  const render = () => {
    currentProgress += (targetProgress - currentProgress) * 0.25;
    const diff = Math.abs(targetProgress - currentProgress);

    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.round(currentProgress * (totalFrames - 1)))
    );

    const frame = frames[frameIndex];
    if (frame && frame.complete && frame.naturalWidth > 0) {
      ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }

    if (diff > 0.001) {
      rafId = requestAnimationFrame(render);
    } else {
      currentProgress = targetProgress;
      const finalIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(targetProgress * (totalFrames - 1)))
      );
      if (frames[finalIndex]?.complete && frames[finalIndex].naturalWidth > 0) {
        ctx.drawImage(frames[finalIndex], 0, 0, canvas.width, canvas.height);
      }
      rafId = null;
    }
  };

  const handleMouseMove = (event) => {
    if (reducedMotion.matches || event.pointerType === 'touch') return;
    targetProgress = Math.max(0, Math.min(1, event.clientY / window.innerHeight));
    if (!rafId) rafId = requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', handleMouseMove, { passive: true });
}
