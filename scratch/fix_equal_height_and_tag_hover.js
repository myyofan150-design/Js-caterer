const fs = require('fs');

const cardRefinementsCss = `

/* ================================================================
   100% EQUAL HEIGHT CARDS & CRISP TAG PILL HOVER FIX
   ================================================================ */

/* Equal Height Grid Alignment */
#services-hub-page .division-card-grid,
#services-hub-page .division-card-grid.reverse {
  display: grid !important;
  grid-template-columns: 0.95fr 1.05fr !important;
  gap: 40px !important;
  align-items: stretch !important;
}

#services-hub-page .division-card-grid.reverse {
  grid-template-columns: 1.05fr 0.95fr !important;
}

#services-hub-page .division-media-col {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

#services-hub-page .division-image-wrap {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  flex: 1 !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.1) !important;
}

#services-hub-page .division-image-wrap img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* Crisp Tag Pill Hover Text Fix */
#services-hub-page .tag-pill {
  background: var(--sand-lt) !important;
  border: 1.5px solid rgba(197, 155, 39, 0.3) !important;
  border-radius: 20px !important;
  padding: 7px 16px !important;
  font-family: var(--font-label) !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  color: #0E2018 !important;
  transition: all 0.2s ease !important;
}

#services-hub-page .tag-pill:hover {
  background: #AA820A !important;
  border-color: #AA820A !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(170, 130, 10, 0.3) !important;
}

#services-hub-page .tag-pill:hover * {
  color: #FFFFFF !important;
}

@media (max-width: 992px) {
  #services-hub-page .division-card-grid,
  #services-hub-page .division-card-grid.reverse {
    grid-template-columns: 1fr !important;
  }
  #services-hub-page .division-image-wrap {
    height: 320px !important;
    min-height: 320px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + cardRefinementsCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed equal height images and tag pill hover text in styles.css!');
