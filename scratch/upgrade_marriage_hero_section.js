const fs = require('fs');

const marriageHeroRefinementsCss = `

/* ================================================================
   MARRIAGE DETAIL HERO: EQUAL HEIGHT, FADED IMAGE & PILL BADGE FIX
   ================================================================ */

.detail-hero-section {
  padding: 64px 0 54px !important;
  background: #FAFAF6 !important;
}

.detail-hero-grid {
  display: grid !important;
  grid-template-columns: 1fr 1.05fr !important;
  gap: 48px !important;
  align-items: stretch !important;
}

.detail-hero-text {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  height: 100% !important;
}

.detail-hero-text .story-chapter-tag {
  display: inline-flex !important;
  align-self: flex-start !important;
  width: auto !important;
  max-width: max-content !important;
  padding: 6px 16px !important;
  border-radius: 30px !important;
  margin-bottom: 20px !important;
  box-sizing: border-box !important;
  background: rgba(197, 155, 39, 0.14) !important;
  color: #AA820A !important;
  border: 1px solid rgba(197, 155, 39, 0.35) !important;
  font-family: var(--font-label) !important;
  font-size: 0.76rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
}

.detail-hero-title {
  font-family: var(--font-head) !important;
  font-size: 2.5rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  line-height: 1.18 !important;
  margin-bottom: 18px !important;
}

.detail-hero-title em {
  font-style: italic !important;
  color: #AA820A !important;
  font-weight: 400 !important;
}

.detail-hero-desc {
  font-family: var(--font-body) !important;
  font-size: 0.95rem !important;
  color: var(--text-dark-muted) !important;
  line-height: 1.65 !important;
  margin-bottom: 28px !important;
}

/* Hero Value Badges */
.hero-value-badges-row {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 12px 18px !important;
  margin-bottom: 32px !important;
}

.value-badge-item {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  font-family: var(--font-body) !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  color: #0E2018 !important;
}

.badge-icon-circle {
  width: 28px !important;
  height: 28px !important;
  border-radius: 50% !important;
  background: rgba(197, 155, 39, 0.15) !important;
  color: #AA820A !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.8rem !important;
}

/* Hero CTA Buttons Styling */
.hero-cta-buttons {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.hero-cta-buttons .btn-glass-gold {
  background: #FFFFFF !important;
  border: 1.5px solid #AA820A !important;
  color: #0E2018 !important;
  font-weight: 800 !important;
  padding: 13px 26px !important;
  border-radius: 30px !important;
  transition: all 0.25s ease !important;
}

.hero-cta-buttons .btn-glass-gold:hover {
  background: #0E2018 !important;
  color: #FFFFFF !important;
  border-color: #0E2018 !important;
}

/* Detail Hero Media: 100% Equal Height & Soft Left Fade */
.detail-hero-media {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

.hero-image-frame {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  flex: 1 !important;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 0 12px 36px rgba(14, 32, 24, 0.12) !important;
}

.hero-banner-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

/* Soft Faded Left Edge Effect */
.hero-image-left-fade {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 35% !important;
  height: 100% !important;
  background: linear-gradient(90deg, rgba(250, 250, 246, 0.55) 0%, transparent 100%) !important;
  pointer-events: none !important;
}

@media (max-width: 992px) {
  .detail-hero-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
  .hero-image-frame {
    height: 320px !important;
    min-height: 320px !important;
  }
  .hero-image-left-fade {
    width: 100% !important;
    height: 35% !important;
    background: linear-gradient(180deg, rgba(250, 250, 246, 0.55) 0%, transparent 100%) !important;
  }
}

@media (max-width: 640px) {
  .detail-hero-title {
    font-size: 1.95rem !important;
  }
  .hero-cta-buttons {
    flex-direction: column !important;
    width: 100% !important;
  }
  .hero-cta-buttons a {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + marriageHeroRefinementsCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended marriage detail hero refinements to styles.css!');
