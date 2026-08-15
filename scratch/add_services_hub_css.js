const fs = require('fs');

const servicesHubCss = `

/* ================================================================
   SERVICES HUB PAGE STYLES (#services-hub-page)
   ================================================================ */

.services-hub-body {
  background: var(--cream) !important;
  font-family: var(--font-body) !important;
  color: var(--text-dark) !important;
}

/* Services Hero Hub */
#services-hub-page .services-hero-hub {
  padding: 56px 0 42px;
  background: linear-gradient(180deg, var(--sand-lt) 0%, var(--cream) 100%);
  border-bottom: 1px solid rgba(197, 155, 39, 0.15);
}

/* Quick Jump Navigation Bar */
#services-hub-page .quick-jump-nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}

#services-hub-page .jump-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid rgba(197, 155, 39, 0.3);
  border-radius: 24px;
  padding: 8px 18px;
  font-family: var(--font-label);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--emerald-dark);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(14, 32, 24, 0.04);
  transition: all 0.2s ease;
}

#services-hub-page .jump-pill i {
  color: var(--gold-dark);
}

#services-hub-page .jump-pill:hover {
  background: var(--emerald-dark);
  border-color: var(--emerald-dark);
  color: #FFFFFF;
  transform: translateY(-2px);
}

#services-hub-page .jump-pill:hover i {
  color: #E8C84D;
}

/* Division Cards */
#services-hub-page .section-divisions-list {
  padding: 56px 0 64px;
  background: var(--cream);
}

#services-hub-page .catering-division-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(197, 155, 39, 0.22);
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.05);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

#services-hub-page .catering-division-card:hover {
  border-color: var(--gold-dark);
  box-shadow: 0 14px 36px rgba(197, 155, 39, 0.14);
}

#services-hub-page .division-card-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 36px;
  align-items: center;
}

#services-hub-page .division-card-grid.reverse {
  grid-template-columns: 1.1fr 0.9fr;
}

#services-hub-page .division-image-wrap {
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 18px;
  overflow: hidden;
}

#services-hub-page .division-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#services-hub-page .division-badge-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(14, 32, 24, 0.85);
  backdrop-filter: blur(8px);
  color: #E8C84D;
  font-family: var(--font-label);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(232, 200, 77, 0.4);
}

#services-hub-page .division-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

#services-hub-page .division-icon-badge {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--sand-lt);
  border: 1px solid rgba(197, 155, 39, 0.3);
  color: var(--gold-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

#services-hub-page .division-sub-tag {
  display: block;
  font-family: var(--font-label);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--gold-dark);
  text-transform: uppercase;
}

#services-hub-page .division-header h3 {
  font-family: var(--font-head);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--emerald-dark);
  margin-top: 2px;
}

#services-hub-page .division-content-col p {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-dark-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

#services-hub-page .tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

#services-hub-page .tag-pill {
  background: var(--sand-lt);
  border: 1px solid rgba(197, 155, 39, 0.2);
  border-radius: 16px;
  padding: 5px 12px;
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--emerald-dark);
}

#services-hub-page .division-action-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* Guarantee Section */
#services-hub-page .section-catering-guarantee {
  padding: 56px 0;
  background: #FFFFFF;
}

#services-hub-page .guarantee-5grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 32px;
}

#services-hub-page .guarantee-card {
  background: var(--cream);
  border: 1px solid rgba(197, 155, 39, 0.2);
  border-radius: 16px;
  padding: 22px 14px;
  text-align: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

#services-hub-page .guarantee-card:hover {
  transform: translateY(-4px);
  border-color: var(--gold-dark);
}

#services-hub-page .guarantee-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--sand-lt);
  color: var(--gold-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin: 0 auto 12px;
}

#services-hub-page .guarantee-card h4 {
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--emerald-dark);
  margin-bottom: 6px;
}

#services-hub-page .guarantee-card p {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-dark-muted);
  line-height: 1.4;
}

@media (max-width: 992px) {
  #services-hub-page .division-card-grid,
  #services-hub-page .division-card-grid.reverse {
    grid-template-columns: 1fr;
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
css += '\n' + servicesHubCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended Services Hub CSS rules to styles.css!');
