const fs = require('fs');

const impeccableResponsiveCss = `

/* ================================================================
   100% IMPECCABLE RESPONSIVE SUITE FOR SERVICES.HTML & SITE-WIDE
   ================================================================ */

@media (max-width: 1024px) {
  #services-hub-page .catering-division-card {
    padding: 24px !important;
    margin-bottom: 32px !important;
  }
  #services-hub-page .division-header h3 {
    font-size: 1.45rem !important;
  }
}

@media (max-width: 992px) {
  /* Division Cards Grid Stack */
  #services-hub-page .division-card-grid,
  #services-hub-page .division-card-grid.reverse {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  #services-hub-page .division-image-wrap {
    height: 260px !important;
    min-height: 260px !important;
    border-radius: 16px !important;
  }

  /* Royal Seals Grid Stack */
  .royal-seals-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 20px !important;
  }

  /* Dark Booking Console Stack */
  .plan-quote-box-dark {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
    padding: 10px !important;
    border-radius: 20px !important;
  }
  .plan-copy-col {
    padding: 16px 14px !important;
  }
  .plan-form-col {
    padding: 20px 16px !important;
    border-radius: 16px !important;
  }

  /* Footer 2-Column Grid */
  .footer-inner-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 36px !important;
  }
}

@media (max-width: 640px) {
  /* Hero Hub Responsive Padding */
  #services-hub-page .services-hero-hub {
    padding: 42px 14px 36px !important;
  }
  #services-hub-page .services-hero-hub .section-title {
    font-size: 1.95rem !important;
    margin-bottom: 12px !important;
  }
  #services-hub-page .services-hero-hub .section-desc {
    font-size: 0.9rem !important;
    margin-bottom: 20px !important;
  }

  /* Quick Jump Pills Stack */
  #services-hub-page .quick-jump-nav-bar {
    gap: 8px !important;
  }
  #services-hub-page .jump-pill {
    padding: 7px 14px !important;
    font-size: 0.78rem !important;
    width: auto !important;
  }

  /* Division Cards Mobile Refinements */
  #services-hub-page .catering-division-card {
    padding: 18px 14px !important;
    border-radius: 18px !important;
  }
  #services-hub-page .division-image-wrap {
    height: 210px !important;
    min-height: 210px !important;
  }
  #services-hub-page .division-header h3 {
    font-size: 1.3rem !important;
  }
  #services-hub-page .division-content-col p {
    font-size: 0.88rem !important;
    margin-bottom: 16px !important;
  }
  #services-hub-page .tag-cloud {
    gap: 6px !important;
    margin-bottom: 20px !important;
  }
  #services-hub-page .tag-pill {
    font-size: 0.72rem !important;
    padding: 4px 10px !important;
  }
  #services-hub-page .division-action-row .btn-primary-gold {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
    padding: 13px !important;
  }

  /* Royal Seals Single Column Stack */
  .royal-seals-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  /* Booking Form 1-Column Grid */
  .quote-form-grid {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }

  /* Footer Mobile Alignment */
  .footer-inner-grid {
    grid-template-columns: 1fr !important;
    text-align: center !important;
    gap: 32px !important;
  }
  .footer-col-brand {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .footer-social-row {
    justify-content: center !important;
  }
  .footer-col-links h4::after,
  .footer-col-services h4::after,
  .footer-col-contact h4::after {
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  .footer-col-contact p {
    justify-content: center !important;
  }
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + impeccableResponsiveCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended impeccable responsive CSS suite to styles.css!');
