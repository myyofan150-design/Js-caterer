const fs = require('fs');

const bookingConsoleInsetCss = `

/* ================================================================
   EQUAL HEIGHT & DARK GREEN FRAMED BOOKING CONSOLE (.plan-quote-box-dark)
   ================================================================ */

.plan-quote-box-dark {
  background: #0E2018 !important;
  border: 2px solid rgba(212, 175, 55, 0.4) !important;
  border-radius: 28px !important;
  padding: 40px !important;
  display: grid !important;
  grid-template-columns: 1fr 1.15fr !important;
  gap: 36px !important;
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
}

.plan-form-col {
  background: #FFFFFF !important;
  border-radius: 20px !important;
  padding: 28px 26px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18) !important;
  height: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

.plan-copy-col .story-chapter-tag {
  display: inline-flex !important;
  align-self: flex-start !important;
  width: auto !important;
  max-width: max-content !important;
  padding: 6px 16px !important;
  border-radius: 30px !important;
  margin-bottom: 16px !important;
  box-sizing: border-box !important;
  background: rgba(232, 200, 77, 0.15) !important;
  color: #E8C84D !important;
  border: 1px solid rgba(232, 200, 77, 0.35) !important;
}

@media (max-width: 992px) {
  .plan-quote-box-dark {
    grid-template-columns: 1fr !important;
    gap: 28px !important;
    padding: 24px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + bookingConsoleInsetCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed dark green framed inset booking console in styles.css!');
