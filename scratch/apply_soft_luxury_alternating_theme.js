const fs = require('fs');

const softLuxuryAlternatingThemeCss = `

/* ================================================================
   SOFT LUXURY ALTERNATING COLOR PALETTE (ALABASTER / CASHMERE / DARK FOREST)
   ================================================================ */

:root {
  --sand-lt: #FAFAF6 !important;
  --sand-mid: #F4EEE4 !important;
  --sand-dk: #EAE2D5 !important;
  --emerald-dark: #0E2018 !important;
  --emerald-mid: #163628 !important;
  --text-dark: #0E2018 !important;
  --text-dark-muted: rgba(14, 32, 24, 0.78) !important;
  --gold: #AA820A !important;
  --gold-accent: #D4AF37 !important;
  --gold-border: rgba(197, 155, 39, 0.3) !important;
}

body, html {
  background-color: #FAFAF6 !important;
  color: #0E2018 !important;
}

/* Services Page Body & Main Containers */
#services-hub-page {
  background-color: #FAFAF6 !important;
}

/* Section 01: 4 Division Cards Section (Soft Alabaster) */
#services-hub-page .section-catering-divisions {
  background: #FAFAF6 !important;
  color: #0E2018 !important;
  padding: 64px 0 !important;
}

/* Division Cards Soft White Containers */
#services-hub-page .catering-division-card {
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.28) !important;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.06) !important;
  border-radius: 24px !important;
}

#services-hub-page .division-header h3 {
  color: #0E2018 !important;
}

#services-hub-page .division-content-col p {
  color: var(--text-dark-muted) !important;
}

/* Tag Pills Soft Light Style */
#services-hub-page .tag-pill {
  background: #F4EEE4 !important;
  border: 1.5px solid rgba(197, 155, 39, 0.3) !important;
  color: #0E2018 !important;
}

#services-hub-page .tag-pill:hover {
  background: #AA820A !important;
  color: #FFFFFF !important;
  border-color: #AA820A !important;
}

/* Section 02: 5 Royal Seals Section (Soft Cashmere) */
.section-catering-guarantee {
  background: #F4EEE4 !important;
  border-top: 1px solid rgba(197, 155, 39, 0.18) !important;
  border-bottom: 1px solid rgba(197, 155, 39, 0.18) !important;
  padding: 64px 0 72px !important;
}

.seal-pillar-card {
  background: #FFFFFF !important;
  border-top: 4px solid #AA820A !important;
  border-left: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  border-right: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  border-bottom: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  color: #0E2018 !important;
}

.seal-pillar-card h4 {
  color: #0E2018 !important;
}

.seal-pillar-card p {
  color: var(--text-dark-muted) !important;
}

.seal-number-badge {
  background: #0E2018 !important;
  color: #E8C84D !important;
  border: 1.5px solid #AA820A !important;
}

.seal-icon-wrap {
  background: linear-gradient(135deg, #F3EAD0 0%, #FAF8F2 100%) !important;
  color: #AA820A !important;
  border-color: rgba(197, 155, 39, 0.4) !important;
}

.seal-pillar-card:hover .seal-icon-wrap {
  background: #AA820A !important;
  color: #FFFFFF !important;
}

/* Section 03: Booking Console (Rich Dark Forest Anchor Box) */
.section-plan-quote {
  background: #FAFAF6 !important;
  padding: 64px 0 72px !important;
}

.plan-quote-box-dark {
  background: #0E2018 !important;
  border: 2px solid rgba(212, 175, 55, 0.4) !important;
}

.plan-form-col {
  background: #FFFFFF !important;
  color: #0E2018 !important;
  border: none !important;
}

.plan-form-col h3, 
.plan-form-col label {
  color: #0E2018 !important;
}

.plan-form-col .form-input {
  background: #FAF8F2 !important;
  border: 1px solid rgba(197, 155, 39, 0.3) !important;
  color: #0E2018 !important;
}

.plan-form-col .form-input::placeholder {
  color: rgba(14, 32, 24, 0.5) !important;
}

/* Section Headers Soft Dark Text */
.section-title {
  color: #0E2018 !important;
}

.section-title em {
  color: #AA820A !important;
}

.section-desc {
  color: var(--text-dark-muted) !important;
}

/* Primary Buttons Royal Gold */
.btn-primary-gold {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800 !important;
  box-shadow: 0 6px 18px rgba(170, 130, 10, 0.3) !important;
}

.btn-primary-gold:hover {
  background: linear-gradient(135deg, #E8C84D 0%, #D4AF37 100%) !important;
  color: #FFFFFF !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + softLuxuryAlternatingThemeCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Applied soft luxury alternating theme palette to styles.css!');
