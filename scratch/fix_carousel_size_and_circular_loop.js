const fs = require('fs');

// 1. Refine CSS in styles.css for balanced card sizing
const balancedCarouselCss = `

/* ================================================================
   BALANCED SIZE & CIRCULAR LOOP OCCASIONS CAROUSEL STYLES
   ================================================================ */

.occ-card {
  flex: 0 0 calc(20% - 16px) !important;
  min-width: 205px !important;
  height: 275px !important;
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.3) !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  cursor: pointer !important;
  box-shadow: 0 6px 20px rgba(14, 32, 24, 0.05) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
  display: flex !important;
  flex-direction: column !important;
}

.occ-img-box {
  width: 100% !important;
  height: 175px !important;
  position: relative !important;
  overflow: hidden !important;
}

.occ-card h4 {
  font-family: var(--font-head) !important;
  font-size: 0.88rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  text-align: center !important;
  padding: 10px 8px !important;
  margin: auto 0 !important;
  line-height: 1.25 !important;
}

@media (max-width: 1200px) {
  .occ-card {
    flex: 0 0 calc(25% - 15px) !important;
    min-width: 195px !important;
  }
}

@media (max-width: 992px) {
  .occ-card {
    flex: 0 0 calc(33.33% - 14px) !important;
  }
}

@media (max-width: 640px) {
  .occ-card {
    flex: 0 0 65% !important;
    height: 260px !important;
  }
  .occ-img-box {
    height: 165px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + balancedCarouselCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended balanced size carousel CSS to styles.css!');

// 2. Refine JavaScript in script.js for seamless circular infinite looping
let js = fs.readFileSync('script.js', 'utf8');

const targetOldBlock = `    const scrollNext = () => {
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
    };`;

const targetNewBlock = `    const scrollNext = () => {
      const cardWidth = occTrack.querySelector('.occ-card')?.offsetWidth || 215;
      const maxScrollLeft = occTrack.scrollWidth - occTrack.clientWidth;
      if (occTrack.scrollLeft >= maxScrollLeft - 12) {
        // Seamless Circular Loop to Start
        occTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        occTrack.scrollBy({ left: cardWidth + 22, behavior: 'smooth' });
      }
    };

    const scrollPrev = () => {
      const cardWidth = occTrack.querySelector('.occ-card')?.offsetWidth || 215;
      if (occTrack.scrollLeft <= 12) {
        // Seamless Circular Loop to End
        const maxScrollLeft = occTrack.scrollWidth - occTrack.clientWidth;
        occTrack.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
        occTrack.scrollBy({ left: -(cardWidth + 22), behavior: 'smooth' });
      }
    };`;

js = js.replace(targetOldBlock, targetNewBlock);
fs.writeFileSync('script.js', js);
console.log('Updated circular infinite loop in script.js!');
