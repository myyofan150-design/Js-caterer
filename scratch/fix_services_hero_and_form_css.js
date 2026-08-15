const fs = require('fs');

const sharedFormAndServicesHeroCss = `

/* ================================================================
   SHARED FORM & SERVICES HERO FIX (APPLIES TO ALL PAGES)
   ================================================================ */

/* Shared Dark Quote Console Box */
.section-plan-quote {
  padding: 64px 0 80px;
  background: var(--sand-lt);
}

.plan-quote-box-dark {
  background: #0E2018 !important;
  border: 2px solid rgba(212, 175, 55, 0.4) !important;
  border-radius: 28px !important;
  padding: 42px !important;
  display: grid !important;
  grid-template-columns: 1fr 1.15fr !important;
  gap: 40px !important;
  align-items: center !important;
  box-shadow: 0 16px 48px rgba(14, 32, 24, 0.25) !important;
}

.plan-copy-col {
  display: flex !important;
  flex-direction: column !important;
}

.plan-title {
  font-family: var(--font-head) !important;
  font-size: clamp(1.8rem, 3.2vw, 2.5rem) !important;
  font-weight: 800 !important;
  color: #FFFFFF !important;
  line-height: 1.2 !important;
  margin-bottom: 10px !important;
}

.plan-title em {
  font-style: italic !important;
  color: #E8C84D !important;
}

.plan-sub {
  font-family: var(--font-body) !important;
  font-size: 0.95rem !important;
  color: rgba(255, 255, 255, 0.8) !important;
  margin-bottom: 24px !important;
}

.plan-checklist {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 28px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.plan-checklist li {
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  color: rgba(255, 255, 255, 0.92) !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
}

.plan-checklist li i {
  color: #25D366 !important;
  font-size: 1rem !important;
}

.plan-mandapam-illustration {
  font-size: 3.5rem !important;
  color: rgba(232, 200, 77, 0.12) !important;
}

/* White Form Container on Right */
.plan-form-col {
  background: #FFFFFF !important;
  border-radius: 20px !important;
  padding: 32px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.plan-form-col h3 {
  font-family: var(--font-head) !important;
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  margin-bottom: 20px !important;
}

/* 2-Column Form Grid */
.quote-form-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 16px !important;
}

.form-field-wrap {
  display: flex !important;
  flex-direction: column !important;
}

.form-field-wrap label {
  display: block !important;
  font-family: var(--font-label) !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  color: #0E2018 !important;
  margin-bottom: 6px !important;
}

.form-input {
  width: 100% !important;
  height: 46px !important;
  background-color: #FAF8F2 !important;
  border: 1.5px solid rgba(170, 130, 10, 0.3) !important;
  border-radius: 10px !important;
  padding: 0 14px !important;
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  color: #0E2018 !important;
  outline: none !important;
  box-sizing: border-box !important;
}

.form-input:focus {
  border-color: #AA820A !important;
  box-shadow: 0 0 0 3px rgba(170, 130, 10, 0.15) !important;
}

.select-wrap {
  position: relative !important;
  width: 100% !important;
  display: block !important;
}

select.form-input {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  padding-right: 38px !important;
  cursor: pointer !important;
  line-height: 44px !important;
}

.select-arrow {
  position: absolute !important;
  right: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 0.8rem !important;
  color: #AA820A !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

/* Services Hero Section Alignment */
#services-hub-page .services-hero-hub {
  padding: 60px 0 44px !important;
  background: linear-gradient(180deg, var(--sand-lt) 0%, var(--cream) 100%) !important;
  text-align: center !important;
  border-bottom: 1px solid rgba(197, 155, 39, 0.18) !important;
}

#services-hub-page .services-hero-hub .section-title {
  text-align: center !important;
  margin: 12px auto 16px !important;
}

#services-hub-page .services-hero-hub .section-desc {
  text-align: center !important;
  margin: 0 auto 28px !important;
}

@media (max-width: 992px) {
  .plan-quote-box-dark {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    padding: 28px !important;
  }
  .quote-form-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + sharedFormAndServicesHeroCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended shared form and services hero CSS to styles.css!');
