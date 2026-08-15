const fs = require('fs');

const sleekFooterBadgeCss = `

/* ================================================================
   SLEEK SINGLE-LINE LUXURY FOOTER CATERING BADGE
   ================================================================ */

.footer-catering-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  width: auto !important;
  max-width: max-content !important;
  white-space: nowrap !important;
  background: rgba(212, 175, 55, 0.1) !important;
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
  border-radius: 20px !important;
  padding: 5px 14px !important;
  margin-bottom: 18px !important;
  box-sizing: border-box !important;
}

.footer-catering-badge i {
  color: #E8C84D !important;
  font-size: 0.85rem !important;
  animation: none !important;
}

.footer-catering-badge span {
  font-family: var(--font-label) !important;
  font-size: 0.76rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  letter-spacing: 0.03em !important;
  white-space: nowrap !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + sleekFooterBadgeCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed ugly footer badge to sleek single-line inline pill in styles.css!');
