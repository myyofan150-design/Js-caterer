const fs = require('fs');

const luxuryBgAndHoverFix = `

/* ================================================================
   LUXURY SOFT & WARM BG THEME + CRISP JUMP PILL HOVER FIX
   ================================================================ */

/* Site-wide Soft Warm Luxury Background */
body, .service-detail-body, .services-hub-body {
  background-color: #FAF8F2 !important;
  color: #0E2018 !important;
}

#services-hub-page, #marriage-catering-page {
  background-color: #FAF8F2 !important;
}

/* Fix Jump Pill Hover Invisible Text */
.quick-jump-nav-bar .jump-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.4) !important;
  border-radius: 30px !important;
  padding: 11px 24px !important;
  font-family: var(--font-label) !important;
  font-size: 0.88rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(14, 32, 24, 0.06) !important;
  transition: all 0.25s ease !important;
}

.quick-jump-nav-bar .jump-pill i {
  color: #AA820A !important;
  font-size: 0.95rem !important;
  transition: color 0.25s ease !important;
}

.quick-jump-nav-bar .jump-pill:hover {
  background: linear-gradient(135deg, #0E2018 0%, #163628 100%) !important;
  border-color: #AA820A !important;
  color: #FFFFFF !important;
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 0 10px 24px rgba(14, 32, 24, 0.25) !important;
}

.quick-jump-nav-bar .jump-pill:hover i {
  color: #E8C84D !important;
}

/* Ensure any internal spans also turn white on hover */
.quick-jump-nav-bar .jump-pill:hover * {
  color: #FFFFFF !important;
}

.quick-jump-nav-bar .jump-pill:hover i {
  color: #E8C84D !important;
}

/* Soft Warm Hero Hub Styling */
#services-hub-page .services-hero-hub {
  background: linear-gradient(180deg, #F3EAD0 0%, #FAF8F2 100%) !important;
  padding: 64px 0 52px !important;
}

/* Catering Division Card Warm Background */
#services-hub-page .catering-division-card {
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.3) !important;
  box-shadow: 0 12px 32px rgba(14, 32, 24, 0.06) !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + luxuryBgAndHoverFix.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed jump pill hover text visibility and applied soft warm luxury background in styles.css!');
