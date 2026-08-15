const fs = require('fs');

const luxuryFooterCss = `

/* ================================================================
   WORLD-CLASS LUXURY CATERING FOOTER STYLES
   ================================================================ */

.luxury-footer {
  background: #061D12 !important;
  color: #FFFFFF !important;
  padding: 64px 0 0 !important;
  border-top: 3px solid #D4AF37 !important;
  position: relative !important;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3) !important;
}

.footer-inner-grid {
  display: grid !important;
  grid-template-columns: 1.4fr 1fr 1.1fr 1.3fr !important;
  gap: 40px !important;
  padding-bottom: 54px !important;
}

/* Brand Column */
.footer-col-brand .brand-logo-group {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
  margin-bottom: 18px !important;
}

.footer-col-brand .brand-name {
  color: #FFFFFF !important;
  font-family: var(--font-head) !important;
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
}

.footer-col-brand .brand-motto-en {
  color: #E8C84D !important;
  font-family: var(--font-label) !important;
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
}

.footer-desc {
  font-family: var(--font-body) !important;
  font-size: 0.9rem !important;
  color: rgba(255, 255, 255, 0.88) !important;
  line-height: 1.65 !important;
  margin-bottom: 22px !important;
}

/* Catering Live Kitchen GIF Badge */
.footer-catering-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: rgba(212, 175, 55, 0.12) !important;
  border: 1px solid rgba(212, 175, 55, 0.35) !important;
  border-radius: 20px !important;
  padding: 6px 14px !important;
  margin-bottom: 22px !important;
}

.footer-catering-badge i {
  color: #E8C84D !important;
  font-size: 0.9rem !important;
  animation: pulseFire 1.5s infinite alternate !important;
}

@keyframes pulseFire {
  0% { transform: scale(1); color: #E8C84D; }
  100% { transform: scale(1.2); color: #FF4500; }
}

.footer-catering-badge span {
  font-family: var(--font-label) !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  letter-spacing: 0.04em !important;
}

.footer-social-row {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.footer-social-row a {
  width: 38px !important;
  height: 38px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1.5px solid rgba(212, 175, 55, 0.35) !important;
  color: #E8C84D !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.95rem !important;
  text-decoration: none !important;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease !important;
}

.footer-social-row a:hover {
  background: #D4AF37 !important;
  color: #061D12 !important;
  transform: translateY(-3px) !important;
}

/* Headings in Footer */
.footer-col-links h4,
.footer-col-services h4,
.footer-col-contact h4 {
  font-family: var(--font-head) !important;
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  color: #E8C84D !important;
  margin-bottom: 20px !important;
  letter-spacing: 0.04em !important;
  position: relative !important;
  padding-bottom: 8px !important;
}

.footer-col-links h4::after,
.footer-col-services h4::after,
.footer-col-contact h4::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 32px !important;
  height: 2.5px !important;
  background: #D4AF37 !important;
  border-radius: 2px !important;
}

.footer-col-links ul,
.footer-col-services ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.footer-col-links ul a,
.footer-col-services ul a {
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  color: rgba(255, 255, 255, 0.85) !important;
  text-decoration: none !important;
  transition: color 0.25s ease, transform 0.25s ease !important;
  display: inline-block !important;
}

.footer-col-links ul a:hover,
.footer-col-services ul a:hover {
  color: #E8C84D !important;
  transform: translateX(4px) !important;
}

/* Contact Column */
.footer-col-contact p {
  font-family: var(--font-body) !important;
  font-size: 0.88rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  margin-bottom: 14px !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  line-height: 1.55 !important;
}

.footer-col-contact p i {
  color: #E8C84D !important;
  font-size: 0.95rem !important;
  margin-top: 3px !important;
}

.footer-col-contact p a {
  color: #E8C84D !important;
  text-decoration: none !important;
  font-weight: 600 !important;
}

.btn-footer-gold-wa {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  width: 100% !important;
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%) !important;
  color: #FFFFFF !important;
  font-family: var(--font-label) !important;
  font-size: 0.85rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.06em !important;
  padding: 12px 20px !important;
  border-radius: 30px !important;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(170, 130, 10, 0.3) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
  margin-top: 10px !important;
}

.btn-footer-gold-wa:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(170, 130, 10, 0.45) !important;
  color: #FFFFFF !important;
}

.footer-bottom-bar {
  background: #04140C !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding: 18px 0 !important;
}

.footer-bottom-bar p {
  font-family: var(--font-label) !important;
  font-size: 0.82rem !important;
  color: rgba(255, 255, 255, 0.7) !important;
  margin: 0 !important;
  text-align: center !important;
}

@media (max-width: 992px) {
  .footer-inner-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 36px !important;
  }
}

@media (max-width: 640px) {
  .footer-inner-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + luxuryFooterCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended luxury footer CSS rules to styles.css!');
