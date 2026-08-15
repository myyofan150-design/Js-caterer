const fs = require('fs');

const scrollMarginFixCss = `

/* ================================================================
   STICKY HEADER JUMP SCROLL OFFSET FIX (scroll-margin-top)
   ================================================================ */

#services-hub-page .catering-division-card,
#services-hub-page section[id],
#services-hub-page div[id] {
  scroll-margin-top: 140px !important;
}

html {
  scroll-behavior: smooth !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + scrollMarginFixCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Added 140px scroll-margin-top offset in styles.css!');
