const fs = require('fs');

const buttonWrapFixCss = `

/* ================================================================
   100% SINGLE-LINE RESPONSIVE BUTTON FIX (.btn-primary-gold)
   ================================================================ */

.btn-primary-gold, .btn-glass-gold, .btn-hero-gold {
  white-space: nowrap !important;
  box-sizing: border-box !important;
}

@media (max-width: 640px) {
  .btn-primary-gold, .btn-glass-gold, .btn-hero-gold {
    font-size: 0.78rem !important;
    padding: 10px 16px !important;
    letter-spacing: 0.04em !important;
    white-space: nowrap !important;
    width: 100% !important;
    max-width: 100% !important;
    justify-content: center !important;
  }
}

@media (max-width: 400px) {
  .btn-primary-gold, .btn-glass-gold, .btn-hero-gold {
    font-size: 0.72rem !important;
    padding: 9px 12px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + buttonWrapFixCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed button text 2-line wrapping on mobile in styles.css!');
