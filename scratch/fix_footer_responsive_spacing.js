const fs = require('fs');

const distinctFooterSpacingCss = `

/* ================================================================
   DISTINCT RESPONSIVE SPACING & SECTION SEPARATION FOR FOOTER
   ================================================================ */

.luxury-footer {
  padding: 72px 0 0 !important;
}

.footer-inner-grid {
  display: grid !important;
  grid-template-columns: 1.45fr 1fr 1.15fr 1.3fr !important;
  gap: 52px !important;
  padding-bottom: 64px !important;
}

/* Tablet Spacing Refinement */
@media (max-width: 992px) {
  .luxury-footer {
    padding: 56px 0 0 !important;
  }
  .footer-inner-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 48px 40px !important;
    padding-bottom: 52px !important;
  }
}

/* Mobile Distinct Section Separators & Spacing */
@media (max-width: 640px) {
  .luxury-footer {
    padding: 48px 0 0 !important;
  }
  .footer-inner-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
    padding-bottom: 40px !important;
  }

  .footer-col-brand,
  .footer-col-links,
  .footer-col-services {
    border-bottom: 1px dashed rgba(212, 175, 55, 0.22) !important;
    padding-bottom: 32px !important;
  }

  .footer-col-contact {
    padding-bottom: 12px !important;
  }

  .footer-col-links h4,
  .footer-col-services h4,
  .footer-col-contact h4 {
    margin-bottom: 22px !important;
  }

  .footer-col-links ul,
  .footer-col-services ul {
    gap: 14px !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + distinctFooterSpacingCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended distinct responsive footer spacing CSS in styles.css!');
