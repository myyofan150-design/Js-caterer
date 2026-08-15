const fs = require('fs');

const completeServicesCss = `

/* ================================================================
   100% LUXURY SERVICES HUB STYLES (#services-hub-page)
   ================================================================ */

.services-hub-body {
  background: var(--cream) !important;
  font-family: var(--font-body) !important;
  color: var(--text-dark) !important;
  -webkit-font-smoothing: antialiased;
}

/* Services Hero Hub */
#services-hub-page .services-hero-hub {
  padding: 64px 0 48px;
  background: linear-gradient(180deg, var(--sand-lt) 0%, var(--cream) 100%);
  border-bottom: 1px solid rgba(197, 155, 39, 0.18);
  position: relative;
}

/* Quick Jump Navigation Bar */
#services-hub-page .quick-jump-nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 32px;
}

#services-hub-page .jump-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1.5px solid rgba(197, 155, 39, 0.35);
  border-radius: 30px;
  padding: 10px 22px;
  font-family: var(--font-label);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--emerald-dark);
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(14, 32, 24, 0.05);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

#services-hub-page .jump-pill i {
  color: var(--gold-dark);
}

#services-hub-page .jump-pill:hover {
  background: var(--emerald-dark);
  border-color: var(--emerald-dark);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 32, 24, 0.15);
}

#services-hub-page .jump-pill:hover i {
  color: #E8C84D;
}

/* Division Cards Section */
#services-hub-page .section-divisions-list {
  padding: 64px 0 80px;
  background: var(--cream);
}

#services-hub-page .catering-division-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(197, 155, 39, 0.22);
  border-radius: 28px;
  padding: 36px;
  margin-bottom: 48px;
  box-shadow: 0 10px 30px rgba(14, 32, 24, 0.05);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

#services-hub-page .catering-division-card:hover {
  transform: translateY(-3px);
  border-color: var(--gold-dark);
  box-shadow: 0 18px 42px rgba(197, 155, 39, 0.16);
}

#services-hub-page .division-card-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 40px;
  align-items: center;
}

#services-hub-page .division-card-grid.reverse {
  grid-template-columns: 1.05fr 0.95fr;
}

#services-hub-page .division-media-col {
  width: 100%;
}

#services-hub-page .division-content-col {
  display: flex;
  flex-direction: column;
}

#services-hub-page .division-image-wrap {
  position: relative;
  width: 100%;
  height: 340px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.1);
}

#services-hub-page .division-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

#services-hub-page .catering-division-card:hover .division-image-wrap img {
  transform: scale(1.03);
}

#services-hub-page .division-badge-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(14, 32, 24, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #E8C84D;
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid rgba(232, 200, 77, 0.4);
}

#services-hub-page .division-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

#services-hub-page .division-icon-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--sand-lt);
  border: 1.5px solid rgba(197, 155, 39, 0.35);
  color: var(--gold-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(197, 155, 39, 0.12);
}

#services-hub-page .division-sub-tag {
  display: block;
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--gold-dark);
  text-transform: uppercase;
}

#services-hub-page .division-header h3 {
  font-family: var(--font-head);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--emerald-dark);
  line-height: 1.2;
  margin-top: 2px;
}

#services-hub-page .division-content-col p {
  font-family: var(--font-body);
  font-size: 0.98rem;
  color: var(--text-dark-muted);
  line-height: 1.65;
  margin-bottom: 22px;
}

#services-hub-page .tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

#services-hub-page .tag-pill {
  background: var(--sand-lt);
  border: 1px solid rgba(197, 155, 39, 0.25);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--emerald-dark);
  transition: background 0.2s ease, color 0.2s ease;
}

#services-hub-page .tag-pill:hover {
  background: var(--emerald-dark);
  color: #FFFFFF;
}

#services-hub-page .division-action-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* 5 Pillars Guarantee Section */
#services-hub-page .section-catering-guarantee {
  padding: 64px 0;
  background: #FFFFFF;
  border-top: 1px solid rgba(197, 155, 39, 0.15);
  border-bottom: 1px solid rgba(197, 155, 39, 0.15);
}

#services-hub-page .guarantee-5grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
  margin-top: 36px;
}

#services-hub-page .guarantee-card {
  background: var(--cream);
  border: 1.5px solid rgba(197, 155, 39, 0.22);
  border-radius: 18px;
  padding: 24px 16px;
  text-align: center;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

#services-hub-page .guarantee-card:hover {
  transform: translateY(-5px);
  border-color: var(--gold-dark);
  box-shadow: 0 10px 24px rgba(197, 155, 39, 0.15);
}

#services-hub-page .guarantee-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--sand-lt);
  border: 1px solid rgba(197, 155, 39, 0.3);
  color: var(--gold-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 auto 14px;
}

#services-hub-page .guarantee-card h4 {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--emerald-dark);
  margin-bottom: 6px;
}

#services-hub-page .guarantee-card p {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-dark-muted);
  line-height: 1.45;
}

@media (max-width: 992px) {
  #services-hub-page .division-card-grid,
  #services-hub-page .division-card-grid.reverse {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  #services-hub-page .guarantee-5grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  #services-hub-page .guarantee-5grid {
    grid-template-columns: 1fr;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
const idx = css.indexOf('/* ================================================================\n   SERVICES HUB PAGE STYLES');
if (idx !== -1) {
  css = css.substring(0, idx);
}
css += '\n' + completeServicesCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed services hub CSS in styles.css!');
