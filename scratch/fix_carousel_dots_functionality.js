const fs = require('fs');

// 1. Update CSS for carousel dots
const dotsFixCss = `

/* ================================================================
   100% RESPONSIVE & CLICKABLE CAROUSEL DOTS (#occDots)
   ================================================================ */

.carousel-dots-indicator {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  margin-top: 28px !important;
  padding: 8px 0 !important;
}

.carousel-dots-indicator .dot {
  display: inline-block !important;
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  background: rgba(197, 155, 39, 0.3) !important;
  border: 1.5px solid rgba(197, 155, 39, 0.5) !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  padding: 0 !important;
}

.carousel-dots-indicator .dot:hover {
  background: rgba(170, 130, 10, 0.6) !important;
  transform: scale(1.2) !important;
}

.carousel-dots-indicator .dot.active {
  width: 32px !important;
  border-radius: 14px !important;
  background: #AA820A !important;
  border-color: #AA820A !important;
  box-shadow: 0 3px 8px rgba(170, 130, 10, 0.35) !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + dotsFixCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended clickable dots CSS to styles.css!');

// 2. Update script.js to dynamically generate and handle dot clicks perfectly
let js = fs.readFileSync('script.js', 'utf8');

// Replace dot logic in script.js
const dotLogicSearch = `    // Dot navigation & sync
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
    }`;

const dotLogicReplacement = `    // Robust Dot Navigation & Scroll Synchronization
    const dotsContainer = document.getElementById('occDots');
    const cards = occTrack.querySelectorAll('.occ-card');
    
    // Build dots dynamically matching total cards or slide pages
    if (dotsContainer && cards.length > 0) {
      const cardWidth = cards[0].offsetWidth || 215;
      const visibleCards = Math.max(1, Math.floor(occTrack.clientWidth / (cardWidth + 22)));
      const numDots = Math.max(1, cards.length - visibleCards + 1);
      
      dotsContainer.innerHTML = '';
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
      }

      const updateActiveDot = () => {
        const currentScroll = occTrack.scrollLeft;
        const totalScrollable = occTrack.scrollWidth - occTrack.clientWidth;
        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length === 0) return;
        if (totalScrollable <= 0) {
          dots[0].classList.add('active');
          return;
        }
        const activeIdx = Math.min(dots.length - 1, Math.round((currentScroll / totalScrollable) * (dots.length - 1)));
        dots.forEach((dot, idx) => {
          if (idx === activeIdx) dot.classList.add('active');
          else dot.classList.remove('active');
        });
      };

      dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.dot');
        if (!dot) return;
        const idx = parseInt(dot.dataset.index, 10);
        const totalScrollable = occTrack.scrollWidth - occTrack.clientWidth;
        const dots = dotsContainer.querySelectorAll('.dot');
        const targetScroll = (idx / Math.max(1, dots.length - 1)) * totalScrollable;
        occTrack.scrollTo({ left: targetScroll, behavior: 'smooth' });
        resetAutoplay();
      });

      occTrack.addEventListener('scroll', updateActiveDot);
    }`;

js = js.replace(dotLogicSearch, dotLogicReplacement);
fs.writeFileSync('script.js', js);
console.log('Updated dot click navigation & dynamic dot generation in script.js!');
