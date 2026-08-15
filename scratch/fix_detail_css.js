const fs = require('fs');

const extraCss = `
/* ================================================================
   100% PIXEL PERFECT DETAIL PAGE STYLES (#marriage-catering-page)
   ================================================================ */

.service-detail-body {
  background: #FAF8F2 !important;
}

#marriage-catering-page .breadcrumb-bar {
  background: #FAF8F2;
  padding: 14px 0;
  border-bottom: 1px solid rgba(170, 130, 10, 0.15);
}
#marriage-catering-page .breadcrumb-links {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-label);
  font-size: 0.8rem;
  color: var(--text-dark-muted);
}
#marriage-catering-page .breadcrumb-links a {
  color: var(--text-dark-muted);
  text-decoration: none;
  font-weight: 500;
}
#marriage-catering-page .breadcrumb-links a:hover {
  color: #AA820A;
}
#marriage-catering-page .breadcrumb-links i {
  font-size: 0.65rem;
  color: #AA820A;
}
#marriage-catering-page .breadcrumb-links .current {
  color: #AA820A;
  font-weight: 700;
}

/* Detail Hero Section */
#marriage-catering-page .detail-hero-section {
  padding: 42px 0 56px;
  background: #FAF8F2;
}
#marriage-catering-page .detail-hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
}
#marriage-catering-page .detail-hero-text {
  display: flex;
  flex-direction: column;
}
#marriage-catering-page .hero-category-tag {
  display: inline-block;
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #AA820A;
  text-transform: uppercase;
  margin-bottom: 12px;
}
#marriage-catering-page .detail-hero-title {
  font-family: var(--font-head);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 800;
  color: #0E2018;
  line-height: 1.15;
  margin-bottom: 16px;
}
#marriage-catering-page .detail-hero-title em {
  font-style: italic;
  font-family: var(--font-head);
  color: #AA820A;
}
#marriage-catering-page .detail-hero-desc {
  font-family: var(--font-body);
  font-size: 0.98rem;
  color: rgba(14, 32, 24, 0.75);
  line-height: 1.6;
  margin-bottom: 28px;
}

#marriage-catering-page .hero-value-badges-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
#marriage-catering-page .value-badge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-label);
  font-size: 0.82rem;
  font-weight: 700;
  color: #0E2018;
}
#marriage-catering-page .badge-icon-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #F3EAD0;
  color: #AA820A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  flex-shrink: 0;
}

#marriage-catering-page .hero-cta-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}
#marriage-catering-page .btn-hero-gold {
  background: #AA820A;
  color: #FFFFFF;
  font-family: var(--font-label);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(170, 130, 10, 0.3);
  transition: transform 0.2s ease, background 0.2s ease;
}
#marriage-catering-page .btn-hero-gold:hover {
  background: #8A6806;
  transform: translateY(-1px);
}
#marriage-catering-page .btn-hero-wa-outline {
  background: #FFFFFF;
  border: 1.5px solid #0E2018;
  color: #0E2018;
  font-family: var(--font-label);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 13px 28px;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
#marriage-catering-page .btn-hero-wa-outline:hover {
  background: #0E2018;
  color: #FFFFFF;
}

#marriage-catering-page .detail-hero-media {
  display: flex;
  justify-content: center;
}
#marriage-catering-page .hero-image-frame {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(14, 32, 24, 0.12);
}
#marriage-catering-page .hero-banner-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}

/* Ornamental Header */
#marriage-catering-page .ornamental-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 6px;
}
#marriage-catering-page .ornamental-header.inline-header {
  margin-bottom: 4px;
}
#marriage-catering-page .flourish-icon {
  color: #AA820A;
  font-size: 0.85rem;
}
#marriage-catering-page .ornamental-header h2 {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 800;
  color: #0E2018;
  text-align: center;
}
#marriage-catering-page .section-subtitle {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--text-dark-muted);
  text-align: center;
  margin-bottom: 32px;
}

/* Occasions Carousel */
#marriage-catering-page .section-occasions {
  padding: 54px 0;
  background: #FFFFFF;
}
#marriage-catering-page .occasions-carousel-wrap {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}
#marriage-catering-page .carousel-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(170, 130, 10, 0.3);
  background: #FFFFFF;
  color: #0E2018;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;
}
#marriage-catering-page .carousel-arrow:hover {
  background: #0E2018;
  color: #FFFFFF;
}
#marriage-catering-page .occasions-scroll-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 4px 16px;
  scrollbar-width: none;
}
#marriage-catering-page .occasions-scroll-track::-webkit-scrollbar {
  display: none;
}
#marriage-catering-page .occ-card {
  min-width: 140px;
  width: 140px;
  background: #FFFFFF;
  border: 1px solid rgba(170, 130, 10, 0.2);
  border-radius: 14px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
#marriage-catering-page .occ-card.active,
#marriage-catering-page .occ-card:hover {
  transform: translateY(-3px);
  border-color: #AA820A;
}
#marriage-catering-page .occ-img-box {
  width: 100%;
  height: 95px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}
#marriage-catering-page .occ-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#marriage-catering-page .occ-card h4 {
  font-family: var(--font-head);
  font-size: 0.8rem;
  font-weight: 700;
  color: #0E2018;
  line-height: 1.25;
}
#marriage-catering-page .carousel-dots-indicator {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;
}
#marriage-catering-page .carousel-dots-indicator .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(170, 130, 10, 0.3);
  cursor: pointer;
}
#marriage-catering-page .carousel-dots-indicator .dot.active {
  width: 18px;
  border-radius: 8px;
  background: #AA820A;
}

/* Cuisine Switcher */
#marriage-catering-page .section-cuisine-switch {
  padding: 48px 0;
  background: #FAF8F2;
}
#marriage-catering-page .cuisine-toggle-stage {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 780px;
  margin: 0 auto;
}
#marriage-catering-page .cuisine-toggle-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #FFFFFF;
  border: 1.5px solid rgba(170, 130, 10, 0.25);
  border-radius: 14px;
  padding: 16px 20px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="Veg"] {
  background: #0E2018;
  border-color: #0E2018;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="Veg"] .green-circle {
  background: #25D366;
  color: #FFFFFF;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="Veg"] .btn-title {
  color: #FFFFFF;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="Veg"] .btn-sub {
  color: #E8C84D;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="NonVeg"] {
  background: #2B150A;
  border-color: #2B150A;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="NonVeg"] .btn-title {
  color: #FFFFFF;
}
#marriage-catering-page .cuisine-toggle-btn.active[data-type="NonVeg"] .btn-sub {
  color: #E8C84D;
}
#marriage-catering-page .btn-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #F3EAD0;
  color: #0E2018;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
#marriage-catering-page .btn-text-content {
  display: flex;
  flex-direction: column;
}
#marriage-catering-page .btn-title {
  font-family: var(--font-head);
  font-size: 0.98rem;
  font-weight: 800;
  color: #0E2018;
  letter-spacing: 0.04em;
}
#marriage-catering-page .btn-sub {
  font-family: var(--font-label);
  font-size: 0.75rem;
  color: var(--text-dark-muted);
}

/* Menu Display */
#marriage-catering-page .section-menu-display {
  padding: 48px 0 64px;
  background: #FFFFFF;
}
#marriage-catering-page .menu-display-header {
  text-align: center;
  margin-bottom: 28px;
}
#marriage-catering-page .menu-display-header h2 {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 800;
  color: #0E2018;
  margin-bottom: 4px;
}
#marriage-catering-page .menu-display-header p {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--text-dark-muted);
}

/* Meal Tabs Wrapper */
#marriage-catering-page .meal-tabs-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
#marriage-catering-page .meal-tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid rgba(170, 130, 10, 0.25);
  border-radius: 10px;
  padding: 10px 18px;
  font-family: var(--font-label);
  font-size: 0.82rem;
  font-weight: 700;
  color: #0E2018;
  cursor: pointer;
  transition: all 0.2s ease;
}
#marriage-catering-page .meal-tab-btn i {
  color: #AA820A;
}
#marriage-catering-page .meal-tab-btn.active,
#marriage-catering-page .meal-tab-btn:hover {
  background: #AA820A;
  border-color: #AA820A;
  color: #FFFFFF;
}
#marriage-catering-page .meal-tab-btn.active i,
#marriage-catering-page .meal-tab-btn:hover i {
  color: #FFFFFF;
}

/* Detailed Menu Display Card */
#marriage-catering-page .detailed-menu-card {
  background: #FAF8F2;
  border: 1.5px solid rgba(170, 130, 10, 0.3);
  border-radius: 20px;
  padding: 28px;
}
#marriage-catering-page .card-top-banner {
  text-align: center;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px dashed rgba(170, 130, 10, 0.3);
}
#marriage-catering-page .card-top-banner.nonveg p {
  color: #AA820A;
}
#marriage-catering-page .card-top-banner h3 {
  font-family: var(--font-head);
  font-size: 1.35rem;
  font-weight: 800;
  color: #0E2018;
}
#marriage-catering-page .card-top-banner p {
  font-family: var(--font-label);
  font-size: 0.82rem;
  color: #AA820A;
  font-weight: 600;
  margin-top: 4px;
}

#marriage-catering-page .menu-columns-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 210px;
  gap: 16px;
  margin-bottom: 24px;
}
#marriage-catering-page .menu-column-box {
  background: #FFFFFF;
  border: 1px solid rgba(170, 130, 10, 0.15);
  border-radius: 14px;
  padding: 16px 14px;
  position: relative;
}
#marriage-catering-page .col-heading {
  font-family: var(--font-label);
  font-size: 0.72rem;
  font-weight: 800;
  color: #0E2018;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}
#marriage-catering-page .item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
#marriage-catering-page .item-list li {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: rgba(14, 32, 24, 0.85);
  display: flex;
  align-items: center;
  gap: 6px;
}
#marriage-catering-page .item-list li i {
  font-size: 0.3rem;
  color: #AA820A;
}
#marriage-catering-page .col-illustration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1.2rem;
  color: rgba(170, 130, 10, 0.1);
  pointer-events: none;
}

#marriage-catering-page .menu-photo-column .photo-container {
  height: 100%;
  min-height: 220px;
  border-radius: 14px;
  overflow: hidden;
}
#marriage-catering-page .menu-photo-column img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#marriage-catering-page .card-footer-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-dark-muted);
}
#marriage-catering-page .card-footer-note i {
  color: #AA820A;
}

/* Customization & Special Menu Section */
#marriage-catering-page .section-customization {
  padding: 54px 0;
  background: #FAF8F2;
}
#marriage-catering-page .custom-stage-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 24px;
  align-items: center;
}
#marriage-catering-page .custom-pills-card {
  background: #FFFFFF;
  border: 1px solid rgba(170, 130, 10, 0.2);
  border-radius: 18px;
  padding: 24px;
}
#marriage-catering-page .custom-pills-card h3 {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 800;
  color: #0E2018;
  margin-bottom: 18px;
}
#marriage-catering-page .pills-flex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
#marriage-catering-page .custom-pill-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FAF8F2;
  border: 1px solid rgba(170, 130, 10, 0.25);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 700;
  color: #0E2018;
}
#marriage-catering-page .pill-icon-outline {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid #AA820A;
  color: #AA820A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
}

#marriage-catering-page .special-menu-card {
  background: #FFFFFF;
  border: 1.5px solid #AA820A;
  border-radius: 18px;
  padding: 24px;
  text-align: center;
}
#marriage-catering-page .special-card-inner h3 {
  font-family: var(--font-head);
  font-size: 1.15rem;
  font-weight: 800;
  color: #0E2018;
  margin-bottom: 6px;
}
#marriage-catering-page .special-card-inner p {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--text-dark-muted);
  margin-bottom: 16px;
}
#marriage-catering-page .btn-gold-special {
  background: #AA820A;
  color: #FFFFFF;
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  display: inline-block;
}

/* Why Choose JS Caterer */
#marriage-catering-page .section-why-choose {
  padding: 54px 0;
  background: #FFFFFF;
}
#marriage-catering-page .why-choose-5grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-top: 32px;
}
#marriage-catering-page .why-item-card {
  background: #FAF8F2;
  border: 1px solid rgba(170, 130, 10, 0.15);
  border-radius: 14px;
  padding: 18px 12px;
  text-align: center;
}
#marriage-catering-page .why-icon-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #F3EAD0;
  color: #AA820A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin: 0 auto 10px;
}
#marriage-catering-page .why-item-card h4 {
  font-family: var(--font-head);
  font-size: 0.85rem;
  font-weight: 800;
  color: #0E2018;
  margin-bottom: 4px;
}
#marriage-catering-page .why-item-card p {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--text-dark-muted);
  line-height: 1.35;
}

/* Plan Quote Dark Box */
#marriage-catering-page .section-plan-quote {
  padding: 54px 0 72px;
  background: #FAF8F2;
}
#marriage-catering-page .plan-quote-box-dark {
  background: #0E2018;
  border: 2px solid rgba(212, 175, 55, 0.4);
  border-radius: 24px;
  padding: 36px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 36px;
  align-items: center;
}
#marriage-catering-page .plan-copy-col {
  display: flex;
  flex-direction: column;
}
#marriage-catering-page .plan-title {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
  margin-bottom: 8px;
}
#marriage-catering-page .plan-title em {
  font-style: italic;
  color: #E8C84D;
}
#marriage-catering-page .plan-sub {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
}
#marriage-catering-page .plan-checklist {
  list-style: none;
  padding: 0;
  margin: 0 0 28px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#marriage-catering-page .plan-checklist li {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
}
#marriage-catering-page .plan-checklist li i {
  color: #25D366;
}
#marriage-catering-page .plan-mandapam-illustration {
  font-size: 3.5rem;
  color: rgba(232, 200, 77, 0.08);
}

#marriage-catering-page .plan-form-col {
  background: #FFFFFF;
  border-radius: 18px;
  padding: 28px;
}
#marriage-catering-page .plan-form-col h3 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
  color: #0E2018;
  margin-bottom: 16px;
}
#marriage-catering-page .quote-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
#marriage-catering-page .form-field-wrap label {
  display: block;
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 700;
  color: #0E2018;
  margin-bottom: 4px;
}
#marriage-catering-page .form-input {
  width: 100%;
  background: #FAF8F2;
  border: 1px solid rgba(170, 130, 10, 0.25);
  border-radius: 8px;
  padding: 9px 12px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: #0E2018;
  outline: none;
}
#marriage-catering-page .select-wrap {
  position: relative;
}
#marriage-catering-page .select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: #AA820A;
  pointer-events: none;
}
#marriage-catering-page .btn-submit-gold-wa {
  grid-column: 1 / -1;
  background: #AA820A;
  color: #FFFFFF;
  font-family: var(--font-label);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
const idx = css.indexOf('/* ================================================================\n   INDIVIDUAL SERVICE PAGE');
if (idx !== -1) {
  css = css.substring(0, idx);
}
css += '\n' + extraCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed detail page CSS in styles.css!');
