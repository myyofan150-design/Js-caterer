const fs = require('fs');

const explicitWhatsappCss = `

/* ================================================================
   100% ICONIC VIBRANT WHATSAPP GREEN BUTTON (.btn-whatsapp-green)
   ================================================================ */

.btn-whatsapp-green {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
  color: #FFFFFF !important;
  border: 1.5px solid #20BD5A !important;
  border-radius: 30px !important;
  padding: 13px 26px !important;
  font-family: var(--font-label) !important;
  font-size: 0.85rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.06em !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.42) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease !important;
}

.btn-whatsapp-green i {
  color: #FFFFFF !important;
  font-size: 1.25rem !important;
  display: inline-block !important;
  margin-right: 2px !important;
}

.btn-whatsapp-green:hover {
  background: linear-gradient(135deg, #20BD5A 0%, #0E7569 100%) !important;
  color: #FFFFFF !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.55) !important;
}

.btn-whatsapp-green:hover i {
  color: #FFFFFF !important;
  transform: scale(1.1) !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + explicitWhatsappCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended explicit .btn-whatsapp-green CSS rules to styles.css!');
