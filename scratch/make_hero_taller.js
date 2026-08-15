const fs = require('fs');

const tallerHeroCss = `

/* ================================================================
   GRAND HEIGHT EXPANSION FOR SERVICES HERO HEADER (.services-hero-hub)
   ================================================================ */

#services-hub-page .services-hero-hub {
  padding: 140px 0 120px !important;
  min-height: 520px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

@media (max-width: 992px) {
  #services-hub-page .services-hero-hub {
    padding: 100px 20px 84px !important;
    min-height: 440px !important;
  }
}

@media (max-width: 640px) {
  #services-hub-page .services-hero-hub {
    padding: 84px 16px 64px !important;
    min-height: 380px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + tallerHeroCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Expanded Services Hero height with 140px top and 120px bottom padding in styles.css!');
