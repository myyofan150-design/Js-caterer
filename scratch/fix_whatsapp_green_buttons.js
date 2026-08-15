const fs = require('fs');

const whatsappGreenCss = `

/* ================================================================
   AUTHENTIC WHATSAPP GREEN BUTTON STYLING (#25D366 / #128C7E)
   ================================================================ */

.btn-top-wa,
.btn-footer-gold-wa,
.btn-hero-wa-outline,
a[href*="wa.me"] {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
  color: #FFFFFF !important;
  border: none !important;
  font-family: var(--font-label) !important;
  font-weight: 800 !important;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

.btn-top-wa:hover,
.btn-footer-gold-wa:hover,
.btn-hero-wa-outline:hover,
a[href*="wa.me"]:hover {
  background: linear-gradient(135deg, #20BD5A 0%, #0E7569 100%) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.45) !important;
}

.btn-top-wa i,
.btn-footer-gold-wa i,
.btn-hero-wa-outline i,
a[href*="wa.me"] i {
  color: #FFFFFF !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + whatsappGreenCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Restored authentic WhatsApp green (#25D366) to all WhatsApp buttons in styles.css!');
