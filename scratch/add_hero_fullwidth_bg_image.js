const fs = require('fs');

const heroBgImageCss = `

/* ================================================================
   FULL-WIDTH LUXURY CATERING BACKGROUND IMAGE FOR SERVICES HERO
   ================================================================ */

#services-hub-page .services-hero-hub {
  position: relative !important;
  background: linear-gradient(180deg, rgba(14, 32, 24, 0.82) 0%, rgba(6, 29, 18, 0.88) 100%), 
              url('assets/wedding_feast.jpg') center/cover no-repeat !important;
  color: #FFFFFF !important;
  padding: 88px 0 68px !important;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.3) !important;
  overflow: hidden !important;
  border-bottom: 3px solid #AA820A !important;
}

#services-hub-page .services-hero-hub .accent-label {
  background: rgba(232, 200, 77, 0.18) !important;
  color: #E8C84D !important;
  border-color: rgba(232, 200, 77, 0.4) !important;
}

#services-hub-page .services-hero-hub .section-title {
  color: #FFFFFF !important;
  text-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
}

#services-hub-page .services-hero-hub .section-title em {
  color: #E8C84D !important;
  font-style: italic !important;
}

#services-hub-page .services-hero-hub .section-desc {
  color: rgba(255, 255, 255, 0.92) !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
  max-width: 760px !important;
  margin: 0 auto 32px !important;
}

#services-hub-page .jump-pill {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #0E2018 !important;
  border: 1.5px solid #AA820A !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
  font-weight: 700 !important;
}

#services-hub-page .jump-pill:hover {
  background: #AA820A !important;
  color: #FFFFFF !important;
  border-color: #AA820A !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 20px rgba(170, 130, 10, 0.4) !important;
}

#services-hub-page .jump-pill:hover * {
  color: #FFFFFF !important;
}

@media (max-width: 640px) {
  #services-hub-page .services-hero-hub {
    padding: 56px 16px 44px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + heroBgImageCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended full-width catering background image CSS for services hero in styles.css!');
