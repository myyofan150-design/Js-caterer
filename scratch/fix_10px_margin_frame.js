const fs = require('fs');

const slim10pxMarginCss = `

/* ================================================================
   10PX SLIM DARK GREEN MARGIN FRAME FOR BOOKING FORM BOX
   ================================================================ */

.plan-quote-box-dark {
  background: #0E2018 !important;
  border: 2px solid rgba(212, 175, 55, 0.4) !important;
  border-radius: 24px !important;
  padding: 10px !important;
  display: grid !important;
  grid-template-columns: 1fr 1.15fr !important;
  gap: 20px !important;
  align-items: stretch !important;
  box-shadow: 0 16px 48px rgba(14, 32, 24, 0.25) !important;
  position: relative !important;
  box-sizing: border-box !important;
}

.plan-copy-col {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  height: 100% !important;
  padding: 24px 28px !important;
}

.plan-form-col {
  background: #FFFFFF !important;
  border-radius: 18px !important;
  padding: 24px 24px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18) !important;
  height: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

@media (max-width: 992px) {
  .plan-quote-box-dark {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
    padding: 10px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + slim10pxMarginCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Adjusted dark green margin frame around form box to slim 10px in styles.css!');
