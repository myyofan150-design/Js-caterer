const fs = require('fs');

const innovativeFooterBgCss = `

/* ================================================================
   INNOVATIVE ULTRA-LUXURY FOOTER BACKGROUND & TEXTURE
   ================================================================ */

.luxury-footer {
  position: relative !important;
  background: #061D12 !important;
  background-image: 
    radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.15) 0%, rgba(6, 29, 18, 0.98) 75%),
    radial-gradient(circle at 10% 90%, rgba(14, 50, 32, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 90% 90%, rgba(14, 50, 32, 0.8) 0%, transparent 50%) !important;
  color: #FFFFFF !important;
  padding: 64px 0 0 !important;
  border-top: 3px solid !important;
  border-image: linear-gradient(90deg, transparent 0%, #D4AF37 25%, #E8C84D 50%, #D4AF37 75%, transparent 100%) 1 !important;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.4) !important;
  overflow: hidden !important;
}

/* Subtle Golden Watermark Overlay Background */
.luxury-footer::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-image: radial-gradient(rgba(212, 175, 55, 0.12) 1px, transparent 1px) !important;
  background-size: 24px 24px !important;
  opacity: 0.4 !important;
  pointer-events: none !important;
  z-index: 0 !important;
}

.luxury-footer .container {
  position: relative !important;
  z-index: 1 !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + innovativeFooterBgCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended innovative ultra-luxury footer background texture in styles.css!');
