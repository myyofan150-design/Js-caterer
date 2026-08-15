const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

const bulletproofCarouselModule = `
  /* ─────────────────────────────────────────────────────
     BULLETPROOF OCCASIONS CAROUSEL WITH AUTOPLAY & DOT SYNC
  ───────────────────────────────────────────────────── */
  const occTrack = document.getElementById('occTrack');
  const occPrev = document.getElementById('occPrev');
  const occNext = document.getElementById('occNext');
  const dotsContainer = document.getElementById('occDots');

  if (occTrack) {
    let autoplayInterval = null;
    const cards = occTrack.querySelectorAll('.occ-card');

    const getScrollStep = () => {
      const firstCard = occTrack.querySelector('.occ-card');
      return firstCard ? firstCard.offsetWidth + 22 : 230;
    };

    const scrollNext = () => {
      const step = getScrollStep();
      const maxScroll = occTrack.scrollWidth - occTrack.clientWidth;
      if (occTrack.scrollLeft >= maxScroll - 15) {
        occTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        occTrack.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const scrollPrev = () => {
      const step = getScrollStep();
      if (occTrack.scrollLeft <= 15) {
        const maxScroll = occTrack.scrollWidth - occTrack.clientWidth;
        occTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        occTrack.scrollBy({ left: -step, behavior: 'smooth' });
      }
    };

    if (occNext) {
      occNext.addEventListener('click', () => {
        scrollNext();
        restartAutoplay();
      });
    }

    if (occPrev) {
      occPrev.addEventListener('click', () => {
        scrollPrev();
        restartAutoplay();
      });
    }

    // Build dots matching scroll pages
    const buildDots = () => {
      if (!dotsContainer || cards.length === 0) return;
      const step = getScrollStep();
      const visibleCount = Math.max(1, Math.floor(occTrack.clientWidth / step));
      const totalPages = Math.max(1, cards.length - visibleCount + 1);

      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.dataset.page = i;
        dotsContainer.appendChild(dot);
      }

      dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.dot');
        if (!dot) return;
        const pageIdx = parseInt(dot.dataset.page, 10);
        const maxScroll = occTrack.scrollWidth - occTrack.clientWidth;
        const dots = dotsContainer.querySelectorAll('.dot');
        const targetLeft = (pageIdx / Math.max(1, dots.length - 1)) * maxScroll;
        occTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
        restartAutoplay();
      });
    };

    const updateActiveDot = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.dot');
      if (dots.length === 0) return;
      const maxScroll = occTrack.scrollWidth - occTrack.clientWidth;
      if (maxScroll <= 0) {
        dots[0].classList.add('active');
        return;
      }
      const progress = occTrack.scrollLeft / maxScroll;
      const activeIdx = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));
      dots.forEach((dot, idx) => {
        if (idx === activeIdx) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    };

    occTrack.addEventListener('scroll', updateActiveDot);

    // Autoplay Engine (3 seconds interval)
    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(scrollNext, 3000);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    occTrack.addEventListener('mouseenter', stopAutoplay);
    occTrack.addEventListener('mouseleave', startAutoplay);
    occTrack.addEventListener('touchstart', stopAutoplay, { passive: true });
    occTrack.addEventListener('touchend', startAutoplay, { passive: true });

    buildDots();
    startAutoplay();
    window.addEventListener('resize', buildDots);
  }`;

// Remove old occurrence
const oldBlockToReplace = `  const occTrack = document.getElementById('occTrack');
  const occPrev = document.getElementById('occPrev');
  const occNext = document.getElementById('occNext');

  if (occTrack && occPrev && occNext) {
    occNext.addEventListener('click', () => { occTrack.scrollBy({ left: 220, behavior: 'smooth' }); });
    occPrev.addEventListener('click', () => { occTrack.scrollBy({ left: -220, behavior: 'smooth' }); });
  }`;

js = js.replace(oldBlockToReplace, bulletproofCarouselModule);
fs.writeFileSync('script.js', js);
console.log('Successfully installed bulletproof carousel autoplay engine in script.js!');
