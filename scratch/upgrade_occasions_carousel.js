const fs = require('fs');

// 1. Update CSS in styles.css
const luxuryCarouselCss = `

/* ================================================================
   WORLD-CLASS MODERN LUXURY OCCASIONS CAROUSEL STYLES
   ================================================================ */

.section-occasions {
  padding: 64px 0 !important;
  background: #FAFAF6 !important;
  position: relative !important;
}

.occasions-carousel-wrap {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  margin-top: 36px !important;
}

.occasions-scroll-track {
  display: flex !important;
  gap: 22px !important;
  overflow-x: auto !important;
  scroll-behavior: smooth !important;
  padding: 16px 8px 24px !important;
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important;  /* IE 10+ */
}

.occasions-scroll-track::-webkit-scrollbar {
  display: none !important; /* Chrome/Safari */
}

.occ-card {
  flex: 0 0 calc(25% - 17px) !important;
  min-width: 250px !important;
  height: 330px !important;
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.3) !important;
  border-radius: 24px !important;
  overflow: hidden !important;
  cursor: pointer !important;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.06) !important;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease !important;
  display: flex !important;
  flex-direction: column !important;
}

.occ-card.active,
.occ-card:hover {
  transform: translateY(-8px) scale(1.02) !important;
  border-color: #AA820A !important;
  box-shadow: 0 16px 36px rgba(170, 130, 10, 0.22) !important;
}

.occ-img-box {
  width: 100% !important;
  height: 220px !important;
  position: relative !important;
  overflow: hidden !important;
}

.occ-img-box img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  transition: transform 0.4s ease !important;
}

.occ-card:hover .occ-img-box img {
  transform: scale(1.08) !important;
}

.occ-card h4 {
  font-family: var(--font-head) !important;
  font-size: 1.02rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  text-align: center !important;
  padding: 16px 12px !important;
  margin: auto 0 !important;
  line-height: 1.3 !important;
}

/* Floating Navigation Arrows */
.carousel-arrow {
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 48px !important;
  height: 48px !important;
  border-radius: 50% !important;
  background: #FFFFFF !important;
  border: 1.5px solid #AA820A !important;
  color: #AA820A !important;
  font-size: 1.1rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  z-index: 10 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12) !important;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease !important;
}

.arrow-prev { left: -20px !important; }
.arrow-next { right: -20px !important; }

.carousel-arrow:hover {
  background: #AA820A !important;
  color: #FFFFFF !important;
  transform: translateY(-50%) scale(1.1) !important;
}

/* Dots Indicator */
.carousel-dots-indicator {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  margin-top: 24px !important;
}

.carousel-dots-indicator .dot {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: rgba(197, 155, 39, 0.3) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.carousel-dots-indicator .dot.active {
  width: 28px !important;
  border-radius: 12px !important;
  background: #AA820A !important;
}

@media (max-width: 1024px) {
  .occ-card {
    flex: 0 0 calc(33.33% - 15px) !important;
  }
}

@media (max-width: 768px) {
  .occ-card {
    flex: 0 0 calc(50% - 11px) !important;
  }
  .arrow-prev { left: 4px !important; }
  .arrow-next { right: 4px !important; }
}

@media (max-width: 480px) {
  .occ-card {
    flex: 0 0 82% !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + luxuryCarouselCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended luxury carousel CSS to styles.css!');

// 2. Update JavaScript in script.js for Autoplay & Dot Click Synchronization
let js = fs.readFileSync('script.js', 'utf8');

const oldCarouselJs = `  if (occTrack && occPrev && occNext) {
    occNext.addEventListener('click', () => { occTrack.scrollBy({ left: 220, behavior: 'smooth' }); });
    occPrev.addEventListener('click', () => { occTrack.scrollBy({ left: -220, behavior: 'smooth' }); });
  }`;

const newCarouselJs = `  if (occTrack && occPrev && occNext) {
    let autoplayTimer = null;

    const scrollNext = () => {
      const cardWidth = occTrack.querySelector('.occ-card')?.offsetWidth || 260;
      const maxScrollLeft = occTrack.scrollWidth - occTrack.clientWidth;
      if (occTrack.scrollLeft >= maxScrollLeft - 10) {
        occTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        occTrack.scrollBy({ left: cardWidth + 22, behavior: 'smooth' });
      }
    };

    const scrollPrev = () => {
      const cardWidth = occTrack.querySelector('.occ-card')?.offsetWidth || 260;
      occTrack.scrollBy({ left: -(cardWidth + 22), behavior: 'smooth' });
    };

    occNext.addEventListener('click', () => {
      scrollNext();
      resetAutoplay();
    });

    occPrev.addEventListener('click', () => {
      scrollPrev();
      resetAutoplay();
    });

    // Dot navigation & sync
    const dotsContainer = document.getElementById('occDots');
    const updateDots = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.dot');
      const totalScrollable = occTrack.scrollWidth - occTrack.clientWidth;
      if (totalScrollable <= 0) return;
      const progress = occTrack.scrollLeft / totalScrollable;
      const activeIndex = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    };

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          const totalScrollable = occTrack.scrollWidth - occTrack.clientWidth;
          const targetScroll = (idx / (dots.length - 1)) * totalScrollable;
          occTrack.scrollTo({ left: targetScroll, behavior: 'smooth' });
          resetAutoplay();
        });
      });
    }

    occTrack.addEventListener('scroll', updateDots);

    // Autoplay Engine (3.5s interval)
    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(scrollNext, 3500);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    occTrack.addEventListener('mouseenter', stopAutoplay);
    occTrack.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }`;

js = js.replace(oldCarouselJs, newCarouselJs);
fs.writeFileSync('script.js', js);
console.log('Updated Occasions Carousel script in script.js with Autoplay & Dot Sync!');
