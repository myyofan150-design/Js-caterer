const fs = require('fs');

const smoothSoftDarkThemeCss = `

/* ================================================================
   SMOOTH & SOFT DARK LUXURY COLOR PALETTE (SITE-WIDE OVERRIDE)
   ================================================================ */

:root {
  --sand-lt: #18241F !important;
  --sand-mid: #1C2B25 !important;
  --sand-dk: #111915 !important;
  --emerald-dark: #111915 !important;
  --emerald-mid: #18241F !important;
  --text-dark: #F4EFE6 !important;
  --text-dark-muted: rgba(244, 239, 230, 0.78) !important;
  --gold: #D4B366 !important;
  --gold-accent: #E5C87E !important;
  --gold-border: rgba(212, 179, 102, 0.25) !important;
}

body, html {
  background-color: #111915 !important;
  color: #F4EFE6 !important;
}

/* Services Page Body & Main Containers */
#services-hub-page {
  background-color: #111915 !important;
}

/* Section Backgrounds Soft Dark */
#services-hub-page .section-catering-divisions,
.section-catering-guarantee,
.section-plan-quote,
.section-infographic-process {
  background: #111915 !important;
  color: #F4EFE6 !important;
}

/* Division Cards Soft Dark Containers */
#services-hub-page .catering-division-card {
  background: #18241F !important;
  border: 1.5px solid rgba(212, 179, 102, 0.22) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35) !important;
}

#services-hub-page .division-header h3 {
  color: #F4EFE6 !important;
}

#services-hub-page .division-content-col p {
  color: rgba(244, 239, 230, 0.82) !important;
}

/* Tag Pills Soft Dark Style */
#services-hub-page .tag-pill {
  background: rgba(212, 179, 102, 0.12) !important;
  border: 1.5px solid rgba(212, 179, 102, 0.3) !important;
  color: #E5C87E !important;
}

#services-hub-page .tag-pill:hover {
  background: #D4B366 !important;
  color: #111915 !important;
  border-color: #D4B366 !important;
}

/* 5 Royal Seals Soft Dark Style */
.seal-pillar-card {
  background: #18241F !important;
  border-top: 4px solid #D4B366 !important;
  border-left: 1.5px solid rgba(212, 179, 102, 0.2) !important;
  border-right: 1.5px solid rgba(212, 179, 102, 0.2) !important;
  border-bottom: 1.5px solid rgba(212, 179, 102, 0.2) !important;
  color: #F4EFE6 !important;
}

.seal-pillar-card h4 {
  color: #F4EFE6 !important;
}

.seal-pillar-card p {
  color: rgba(244, 239, 230, 0.78) !important;
}

.seal-number-badge {
  background: #111915 !important;
  color: #E5C87E !important;
  border: 1.5px solid #D4B366 !important;
}

.seal-icon-wrap {
  background: rgba(212, 179, 102, 0.15) !important;
  color: #E5C87E !important;
  border-color: rgba(212, 179, 102, 0.35) !important;
}

.seal-pillar-card:hover .seal-icon-wrap {
  background: #D4B366 !important;
  color: #111915 !important;
}

/* Booking Form Soft Dark Style */
.plan-quote-box-dark {
  background: #141E19 !important;
  border: 1.5px solid rgba(212, 179, 102, 0.35) !important;
}

.plan-form-col {
  background: #1C2B25 !important;
  color: #F4EFE6 !important;
  border: 1px solid rgba(212, 179, 102, 0.25) !important;
}

.plan-form-col h3, 
.plan-form-col label {
  color: #F4EFE6 !important;
}

.plan-form-col .form-input {
  background: #141E19 !important;
  border: 1px solid rgba(212, 179, 102, 0.3) !important;
  color: #F4EFE6 !important;
}

.plan-form-col .form-input::placeholder {
  color: rgba(244, 239, 230, 0.5) !important;
}

/* Section Headers Soft Light Text */
.section-title {
  color: #F4EFE6 !important;
}

.section-title em {
  color: #E5C87E !important;
}

.section-desc {
  color: rgba(244, 239, 230, 0.8) !important;
}

/* Primary Buttons Soft Gold */
.btn-primary-gold {
  background: linear-gradient(135deg, #D4B366 0%, #B89445 100%) !important;
  color: #111915 !important;
  font-weight: 800 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3) !important;
}

.btn-primary-gold:hover {
  background: linear-gradient(135deg, #E5C87E 0%, #D4B366 100%) !important;
  color: #111915 !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + smoothSoftDarkThemeCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Applied smooth soft dark luxury theme palette to styles.css!');
