const fs = require('fs');

const royalSealsCss = `

/* ================================================================
   5 ROYAL CULINARY SEALS UI/UX (#services-hub-page)
   ================================================================ */

.royal-seals-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 18px !important;
  margin-top: 40px !important;
  position: relative !important;
}

.seal-pillar-card {
  position: relative !important;
  background: #FFFFFF !important;
  border-top: 4px solid #AA820A !important;
  border-left: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  border-right: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  border-bottom: 1.5px solid rgba(197, 155, 39, 0.25) !important;
  border-radius: 20px !important;
  padding: 32px 18px 24px !important;
  text-align: center !important;
  box-shadow: 0 8px 24px rgba(14, 32, 24, 0.05) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.seal-pillar-card:hover {
  transform: translateY(-8px) scale(1.02) !important;
  border-color: #AA820A !important;
  box-shadow: 0 16px 36px rgba(170, 130, 10, 0.22) !important;
}

.seal-number-badge {
  position: absolute !important;
  top: -12px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: #0E2018 !important;
  color: #E8C84D !important;
  font-family: var(--font-label) !important;
  font-size: 0.68rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.1em !important;
  padding: 3px 12px !important;
  border-radius: 14px !important;
  border: 1.5px solid #AA820A !important;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) !important;
}

.seal-icon-wrap {
  width: 52px !important;
  height: 52px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #F3EAD0 0%, #FAF8F2 100%) !important;
  border: 1.5px solid rgba(197, 155, 39, 0.4) !important;
  color: #AA820A !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.35rem !important;
  margin: 8px auto 14px !important;
  box-shadow: inset 0 2px 6px rgba(197, 155, 39, 0.15) !important;
  transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease !important;
}

.seal-pillar-card:hover .seal-icon-wrap {
  background: #AA820A !important;
  color: #FFFFFF !important;
  transform: scale(1.1) rotate(6deg) !important;
}

.seal-pillar-card h4 {
  font-family: var(--font-head) !important;
  font-size: 0.98rem !important;
  font-weight: 800 !important;
  color: #0E2018 !important;
  line-height: 1.25 !important;
  margin-bottom: 8px !important;
}

.seal-pillar-card p {
  font-family: var(--font-body) !important;
  font-size: 0.82rem !important;
  color: var(--text-dark-muted) !important;
  line-height: 1.45 !important;
  margin-bottom: 12px !important;
}

.seal-verified-stamp {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-family: var(--font-label) !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  color: #AA820A !important;
  letter-spacing: 0.06em !important;
  background: rgba(197, 155, 39, 0.1) !important;
  border: 1px solid rgba(197, 155, 39, 0.3) !important;
  padding: 4px 10px !important;
  border-radius: 12px !important;
  transition: opacity 0.2s ease, transform 0.2s ease !important;
}

.seal-pillar-card:hover .seal-verified-stamp {
  background: #0E2018 !important;
  color: #E8C84D !important;
  border-color: #AA820A !important;
}

@media (max-width: 992px) {
  .royal-seals-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 640px) {
  .royal-seals-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + royalSealsCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended Royal Culinary Seals CSS to styles.css!');
