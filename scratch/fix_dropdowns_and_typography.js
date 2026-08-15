const fs = require('fs');

const fontAndDropdownFix = `

/* ================================================================
   100% DESIGN SYSTEM ALIGNED TYPOGRAPHY & DROPDOWNS (#marriage-catering-page)
   ================================================================ */

/* Global Body Font Alignment */
.service-detail-body {
  background: var(--cream) !important;
  font-family: var(--font-body) !important;
  color: var(--text-dark) !important;
  -webkit-font-smoothing: antialiased;
}

/* Breadcrumb Bar */
#marriage-catering-page .breadcrumb-bar {
  background: var(--sand-lt);
  padding: 14px 0;
  border-bottom: 1px solid rgba(197, 155, 39, 0.18);
}
#marriage-catering-page .breadcrumb-links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-label);
  font-size: 0.82rem;
  color: var(--text-dark-muted);
}
#marriage-catering-page .breadcrumb-links a {
  color: var(--emerald);
  text-decoration: none;
  font-weight: 600;
}
#marriage-catering-page .breadcrumb-links a:hover {
  color: var(--gold-dark);
}
#marriage-catering-page .breadcrumb-links i {
  font-size: 0.65rem;
  color: var(--gold);
}
#marriage-catering-page .breadcrumb-links .current {
  color: var(--gold-dark);
  font-weight: 700;
}

/* Hero Section Typography & Spacing */
#marriage-catering-page .detail-hero-section {
  padding: 56px 0 64px;
  background: linear-gradient(180deg, var(--sand-lt) 0%, var(--cream) 100%);
}
#marriage-catering-page .detail-hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}
#marriage-catering-page .hero-category-tag {
  display: inline-block;
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--gold-dark);
  text-transform: uppercase;
  margin-bottom: 12px;
}
#marriage-catering-page .detail-hero-title {
  font-family: var(--font-head);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 800;
  color: var(--emerald-dark);
  line-height: 1.18;
  margin-bottom: 18px;
  letter-spacing: -0.01em;
}
#marriage-catering-page .detail-hero-title em {
  font-style: italic;
  font-family: var(--font-head);
  color: var(--gold-dark);
}
#marriage-catering-page .detail-hero-desc {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-dark-muted);
  line-height: 1.65;
  margin-bottom: 30px;
}

/* 4 Value Badges Row */
#marriage-catering-page .hero-value-badges-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 34px;
}
#marriage-catering-page .value-badge-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-label);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--emerald-dark);
}
#marriage-catering-page .badge-icon-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--sand-lt);
  border: 1px solid rgba(197, 155, 39, 0.3);
  color: var(--gold-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  flex-shrink: 0;
}

/* Hero CTA Buttons */
#marriage-catering-page .hero-cta-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}
#marriage-catering-page .btn-hero-gold {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
  color: #FFFFFF;
  font-family: var(--font-label);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 15px 32px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(170, 130, 10, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
#marriage-catering-page .btn-hero-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(170, 130, 10, 0.45);
}
#marriage-catering-page .btn-hero-wa-outline {
  background: transparent;
  border: 1.5px solid var(--emerald-dark);
  color: var(--emerald-dark);
  font-family: var(--font-label);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
#marriage-catering-page .btn-hero-wa-outline:hover {
  background: var(--emerald-dark);
  color: #FFFFFF;
}

/* Form Dropdown Un-Collapse Fix */
#marriage-catering-page .select-wrap {
  position: relative;
  width: 100%;
  display: block;
}

#marriage-catering-page select.form-input {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 100% !important;
  height: 46px !important;
  background-color: var(--cream) !important;
  border: 1.5px solid rgba(197, 155, 39, 0.35) !important;
  border-radius: 10px !important;
  padding: 0 38px 0 14px !important;
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  font-weight: 500 !important;
  color: var(--emerald-dark) !important;
  cursor: pointer !important;
  outline: none !important;
  box-shadow: none !important;
  line-height: 44px !important;
}

#marriage-catering-page select.form-input:focus {
  border-color: var(--gold-dark) !important;
  box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.15) !important;
}

#marriage-catering-page .select-arrow {
  position: absolute !important;
  right: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 0.8rem !important;
  color: var(--gold-dark) !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

#marriage-catering-page select.form-input option {
  background: #FFFFFF !important;
  color: var(--emerald-dark) !important;
  font-family: var(--font-body) !important;
  font-size: 0.9rem !important;
  padding: 10px !important;
}

/* Text Input Alignment */
#marriage-catering-page input.form-input {
  width: 100% !important;
  height: 46px !important;
  background-color: var(--cream) !important;
  border: 1.5px solid rgba(197, 155, 39, 0.35) !important;
  border-radius: 10px !important;
  padding: 0 14px !important;
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  color: var(--emerald-dark) !important;
  outline: none !important;
}
#marriage-catering-page input.form-input:focus {
  border-color: var(--gold-dark) !important;
  box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.15) !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + fontAndDropdownFix.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed dropdown collapse and typography design system alignment in styles.css!');
