const fs = require('fs');

const globalBreadcrumbsAndHeroCss = `

/* ================================================================
   100% GLOBAL BREADCRUMB & HERO FIX (UN-SCOPED FOR ALL PAGES)
   ================================================================ */

.breadcrumb-bar {
  background: var(--sand-lt) !important;
  padding: 14px 0 !important;
  border-bottom: 1px solid rgba(197, 155, 39, 0.18) !important;
  display: block !important;
  width: 100% !important;
}

.breadcrumb-links {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  font-family: var(--font-label) !important;
  font-size: 0.85rem !important;
  color: var(--text-dark-muted) !important;
}

.breadcrumb-links a {
  color: var(--emerald-dark) !important;
  text-decoration: none !important;
  font-weight: 600 !important;
}

.breadcrumb-links a:hover {
  color: var(--gold-dark) !important;
}

.breadcrumb-links i {
  font-size: 0.65rem !important;
  color: var(--gold-dark) !important;
}

.breadcrumb-links .current {
  color: var(--gold-dark) !important;
  font-weight: 700 !important;
}

/* Services Hero Hub - Explicit Styling */
.services-hero-hub {
  display: block !important;
  width: 100% !important;
  padding: 54px 0 48px !important;
  background: linear-gradient(180deg, var(--sand-lt) 0%, var(--cream) 100%) !important;
  text-align: center !important;
  border-bottom: 1px solid rgba(197, 155, 39, 0.18) !important;
  box-sizing: border-box !important;
}

.services-hero-hub .container {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

.services-hero-hub .story-chapter-tag {
  display: inline-flex !important;
  margin-bottom: 14px !important;
}

.services-hero-hub .section-title {
  font-family: var(--font-head) !important;
  font-size: clamp(2.2rem, 4.5vw, 3.6rem) !important;
  font-weight: 800 !important;
  color: var(--emerald-dark) !important;
  text-align: center !important;
  margin: 0 0 16px 0 !important;
  line-height: 1.18 !important;
}

.services-hero-hub .section-title em {
  font-style: italic !important;
  color: var(--gold-dark) !important;
}

.services-hero-hub .section-desc {
  font-family: var(--font-body) !important;
  font-size: 1rem !important;
  color: var(--text-dark-muted) !important;
  text-align: center !important;
  max-width: 680px !important;
  margin: 0 auto 28px !important;
  line-height: 1.65 !important;
}

/* Quick Jump Pill Navigation Bar */
.quick-jump-nav-bar {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 12px !important;
  flex-wrap: wrap !important;
  margin-top: 16px !important;
}

.jump-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #FFFFFF !important;
  border: 1.5px solid rgba(197, 155, 39, 0.35) !important;
  border-radius: 30px !important;
  padding: 10px 22px !important;
  font-family: var(--font-label) !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  color: var(--emerald-dark) !important;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(14, 32, 24, 0.05) !important;
  transition: all 0.2s ease !important;
}

.jump-pill i {
  color: var(--gold-dark) !important;
}

.jump-pill:hover {
  background: var(--emerald-dark) !important;
  border-color: var(--emerald-dark) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(14, 32, 24, 0.15) !important;
}

.jump-pill:hover i {
  color: #E8C84D !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + globalBreadcrumbsAndHeroCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended global breadcrumbs and services hero CSS to styles.css!');
