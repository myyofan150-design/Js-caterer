const fs = require('fs');

const balancedClarityCss = `

/* ================================================================
   PERFECT BALANCE: VIBRANT BACKGROUND IMAGE + CRYSTAL CLEAR TEXT
   ================================================================ */

#services-hub-page .services-hero-hub {
  position: relative !important;
  background: linear-gradient(180deg, rgba(14, 32, 24, 0.48) 0%, rgba(6, 29, 18, 0.68) 100%), 
              url('assets/wedding_feast.jpg') center/cover no-repeat !important;
  color: #FFFFFF !important;
  padding: 88px 0 68px !important;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.3) !important;
  overflow: hidden !important;
  border-bottom: 3px solid #AA820A !important;
}

#services-hub-page .services-hero-hub .accent-label {
  background: rgba(14, 32, 24, 0.75) !important;
  backdrop-filter: blur(8px) !important;
  color: #E8C84D !important;
  border: 1.5px solid rgba(232, 200, 77, 0.6) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

#services-hub-page .services-hero-hub .section-title {
  color: #FFFFFF !important;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.9) !important;
}

#services-hub-page .services-hero-hub .section-title em {
  color: #E8C84D !important;
  font-style: italic !important;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.85) !important;
}

#services-hub-page .services-hero-hub .section-desc {
  color: #FFFFFF !important;
  font-weight: 500 !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.9) !important;
  max-width: 760px !important;
  margin: 0 auto 32px !important;
  background: rgba(14, 32, 24, 0.35) !important;
  backdrop-filter: blur(4px) !important;
  padding: 12px 24px !important;
  border-radius: 16px !important;
  display: inline-block !important;
}

#services-hub-page .jump-pill {
  background: rgba(14, 32, 24, 0.82) !important;
  backdrop-filter: blur(8px) !important;
  color: #FFFFFF !important;
  border: 1.5px solid #AA820A !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3) !important;
  font-weight: 700 !important;
}

#services-hub-page .jump-pill * {
  color: #E8C84D !important;
}

#services-hub-page .jump-pill:hover {
  background: #AA820A !important;
  color: #FFFFFF !important;
  border-color: #AA820A !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 20px rgba(170, 130, 10, 0.5) !important;
}

#services-hub-page .jump-pill:hover * {
  color: #FFFFFF !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + balancedClarityCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Balanced background image vibrancy and text clarity in styles.css!');
