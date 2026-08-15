const fs = require('fs');

const missingCss = `

/* ================================================================
   FOOTER & COMMON UI UTILITY CLASSES (FIX FOR BROKEN FOOTER & ICONS)
   ================================================================ */

.glow-icon {
  color: #AA820A !important;
}

/* Footer Grid & Columns */
.luxury-footer {
  background: #061D12;
  color: #FFFFFF;
  padding: 60px 0 0;
  border-top: 2px solid rgba(212, 175, 55, 0.3);
}

.footer-inner-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.1fr 1.3fr;
  gap: 40px;
  padding-bottom: 50px;
}

.footer-col-brand .brand-logo-group {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 16px;
}

.footer-desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-social-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-social-row a {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #E8C84D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.footer-social-row a:hover {
  background: #AA820A;
  color: #FFFFFF;
  transform: translateY(-2px);
}

.footer-col-links h4,
.footer-col-services h4,
.footer-col-contact h4 {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 800;
  color: #E8C84D;
  margin-bottom: 20px;
  letter-spacing: 0.04em;
}

.footer-col-links ul,
.footer-col-services ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col-links ul a,
.footer-col-services ul a {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.footer-col-links ul a:hover,
.footer-col-services ul a:hover {
  color: #E8C84D;
  padding-left: 4px;
}

.footer-col-contact p {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.5;
}

.footer-col-contact p a {
  color: #E8C84D;
  text-decoration: none;
  font-weight: 600;
}

.footer-bottom-bar {
  background: #04140C;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 0;
}

.footer-bottom-bar p {
  font-family: var(--font-label);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-align: center;
}

/* Arrow & Icon Utilities */
.arrow-prev, .arrow-next {
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
}

.light-circle {
  background: #F3EAD0 !important;
  color: #0E2018 !important;
}

@media (max-width: 992px) {
  .footer-inner-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 640px) {
  .footer-inner-grid {
    grid-template-columns: 1fr;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + missingCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended missing Footer & Utility CSS rules to styles.css!');
