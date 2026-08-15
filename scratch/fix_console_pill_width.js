const fs = require('fs');

const pillWidthFixCss = `

/* ================================================================
   INLINE SELF-FITTING PILL BADGE FIX (.plan-copy-col .story-chapter-tag)
   ================================================================ */

.plan-copy-col .story-chapter-tag {
  display: inline-flex !important;
  align-self: flex-start !important;
  width: auto !important;
  max-width: max-content !important;
  padding: 6px 16px !important;
  border-radius: 30px !important;
  margin-bottom: 16px !important;
  box-sizing: border-box !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + pillWidthFixCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Fixed top left pill badge to shrink-wrap inline to text width in styles.css!');
