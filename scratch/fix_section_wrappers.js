const fs = require('fs');

let html = fs.readFileSync('scratch/zip_extract/index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Replace Section 4 (#act-4)
const s4_old = `<section id="act-4" class="section-light-warm">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-award glow-icon"></i> ACT 04 — Our Four Pillars</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Why Families Trust <em>JS Caterer</em></h2>
        <p class="section-desc story-reveal">Built on traditional South Indian values, absolute hygiene, and decades of culinary expertise.</p>
      </div>
      <div class="story-pillars-grid">
        <div class="story-pillar-card story-reveal">
          <div class="pillar-icon-wrap"><i class="fa-solid fa-fire-burner"></i></div>
          <h3>Traditional Cooking</h3>
          <p>Pure brass vessel preparations, authentic woodfire methods & traditional Tamil secret spices.</p>
        </div>
        <div class="story-pillar-card story-reveal">
          <div class="pillar-icon-wrap"><i class="fa-solid fa-pump-soap"></i></div>
          <h3>Uncompromised Hygiene</h3>
          <p>100% kitchen sanitation, RO purified water & strict hygiene protocols at every step.</p>
        </div>
        <div class="story-pillar-card story-reveal">
          <div class="pillar-icon-wrap"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <h3>On-Time Service</h3>
          <p>Hot, fresh meals dispatched right on schedule. Zero delay for your guests.</p>
        </div>
        <div class="story-pillar-card story-reveal">
          <div class="pillar-icon-wrap"><i class="fa-solid fa-user-chef"></i></div>
          <h3>Master Chef Expertise</h3>
          <p>Over 20+ years of culinary excellence under the leadership of Jagan C.</p>
        </div>
      </div>
    </div>
  </section>`;

const s4_new = `  <!-- ================================================================
       ACT 04 — FOUR PILLARS GRID WITH ROTATING BRASS THALI PLATE
       ================================================================ -->
  <section id="act-4" class="section-light-warm">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-award glow-icon"></i> ACT 04 — Our Four Pillars</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Why Families Trust <em>JS Caterer</em></h2>
        <p class="section-desc story-reveal">Built on traditional South Indian values, absolute hygiene, and decades of culinary expertise.</p>
      </div>

      <div class="pillars-orbital-stage story-reveal">
        <!-- Central Rotating Brass Thali Plate with Logo -->
        <div class="central-thali-wrapper">
          <div class="thali-brass-body" id="centralRotatingThali">
            <img src="assets/brass_thali_plate.jpg" alt="Traditional Brass Thali Plate" class="thali-bg-img">
          </div>
          <div class="thali-center-logo">
            <img src="assets/logo.png" alt="JS Caterer Emblem" class="center-logo-img">
          </div>
        </div>

        <!-- 4 Orbital Pillar Cards at Corners -->
        <div class="orbital-pillar-card node-tl story-reveal" data-node="tl">
          <div class="pillar-bg-watermark">சுவை</div>
          <div class="pillar-card-header">
            <div class="pillar-tamil">சுவை</div>
            <div class="pillar-icon-badge"><i class="fa-solid fa-fire-burner"></i></div>
          </div>
          <h4>Authentic Taste</h4>
          <p>Generational recipes slow-cooked over steady flames for deep, irreplaceable flavor.</p>
          <span class="pillar-trust-pill"><i class="fa-solid fa-fire"></i> 100% Slow-Cooked</span>
        </div>

        <div class="orbital-pillar-card node-tr story-reveal" data-node="tr">
          <div class="pillar-bg-watermark">தரம்</div>
          <div class="pillar-card-header">
            <div class="pillar-tamil">தரம்</div>
            <div class="pillar-icon-badge"><i class="fa-solid fa-leaf"></i></div>
          </div>
          <h4>Pure Quality</h4>
          <p>Hand-selected farm produce, pure A2 cow ghee & cold-pressed oils.</p>
          <span class="pillar-trust-pill"><i class="fa-solid fa-seedling"></i> Pure A2 Ghee</span>
        </div>

        <div class="orbital-pillar-card node-bl story-reveal" data-node="bl">
          <div class="pillar-bg-watermark">சுத்தம்</div>
          <div class="pillar-card-header">
            <div class="pillar-tamil">சுத்தம்</div>
            <div class="pillar-icon-badge"><i class="fa-solid fa-shield-halved"></i></div>
          </div>
          <h4>100% Hygiene</h4>
          <p>FSSAI-compliant sanitized prep stations & RO purified water throughout.</p>
          <span class="pillar-trust-pill"><i class="fa-solid fa-check-double"></i> FSSAI Sanitized</span>
        </div>

        <div class="orbital-pillar-card node-br story-reveal" data-node="br">
          <div class="pillar-bg-watermark">நேர்த்தி</div>
          <div class="pillar-card-header">
            <div class="pillar-tamil">நேர்த்தி</div>
            <div class="pillar-icon-badge"><i class="fa-solid fa-crown"></i></div>
          </div>
          <h4>Excellence</h4>
          <p>Uniformed culinary staff delivering flawless hospitality & seamless service.</p>
          <span class="pillar-trust-pill"><i class="fa-solid fa-star"></i> 5-Star Service</span>
        </div>
      </div>
    </div>
  </section>`;

if (html.includes(s4_old)) {
  html = html.replace(s4_old, s4_new);
  console.log('S4 wrapper replacement SUCCESS!');
} else {
  console.log('S4 wrapper replacement MISSED!');
}

// 2. Replace Section 5 (#act-5)
const s5_old = `<section id="act-5" class="section-soft-gold">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-utensils"></i> ACT 05 — Our Specialty Offerings</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Comprehensive <em>Catering Solutions</em></h2>
        <p class="section-desc story-reveal">From grand traditional Tamil marriages to daily corporate workforce lunches across South Chennai.</p>
      </div>
      <div class="services-2x2-grid story-reveal">
        <div class="service-box-luxury story-reveal">
          <div class="box-icon-wrap"><i class="fa-solid fa-heart-circle-check"></i></div>
          <span class="box-num">01</span>
          <h3>Marriage & Event Management</h3>
          <p class="box-text">Complete wedding dining setups from morning tiffin to grand banana leaf feasts, reception buffets & live counters.</p>
          <a href="services.html" class="service-explore-link">Explore &rarr;</a>
        </div>
        <div class="service-box-luxury story-reveal">
          <div class="box-icon-wrap"><i class="fa-solid fa-industry"></i></div>
          <span class="box-num">02</span>
          <h3>CPU Industrial Catering</h3>
          <p class="box-text">High-volume daily workforce breakfast, lunch, and dinner solutions powered by our Central Preparation Unit.</p>
          <a href="services.html" class="service-explore-link">Explore &rarr;</a>
        </div>
        <div class="service-box-luxury story-reveal">
          <div class="box-icon-wrap"><i class="fa-solid fa-box-open"></i></div>
          <span class="box-num">03</span>
          <h3>Corporate Packed Food</h3>
          <p class="box-text">Hygienically sealed executive lunch boxes and snack combos delivered hot to corporate offices across OMR.</p>
          <a href="services.html" class="service-explore-link">Explore &rarr;</a>
        </div>
        <div class="service-box-luxury story-reveal">
          <div class="box-icon-wrap"><i class="fa-solid fa-gopuram"></i></div>
          <span class="box-num">04</span>
          <h3>Kovil Annathanam</h3>
          <p class="box-text">Pure satvik Tamil traditional meals cooked in brass vessels with religious sanctity for temple consecrated feasts.</p>
          <a href="services.html" class="service-explore-link">Explore &rarr;</a>
        </div>
      </div>
    </div>
  </section>`;

const s5_new = `  <!-- ================================================================
       ACT 05 — SERVICES (SOFT GOLD)
       ================================================================ -->
  <section id="act-5" class="section-soft-gold">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-utensils"></i> ACT 05 — Our Specialty Offerings</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Comprehensive <em>Catering Solutions</em></h2>
        <p class="section-desc story-reveal">From grand traditional Tamil marriages to daily corporate workforce lunches across South Chennai.</p>
      </div>

      <div class="services-3d-grid" style="margin-top:36px;">
        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/wedding_feast.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-heart-circle-check"></i></div>
            <span class="box-num">01</span>
            <h3>Marriage & Events</h3>
            <p class="box-text">Wedding, Betrothal, Baby Shower, Birthday, 60th & 80th Birthdays, Housewarming, Ear-Piercing & Functions.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> Banana Leaf Feasts</li>
              <li><i class="fa-solid fa-circle-check"></i> Reception Buffets</li>
              <li><i class="fa-solid fa-circle-check"></i> Live Stall Counters</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>

        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/live_kitchen.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-industry"></i></div>
            <span class="box-num">02</span>
            <h3>CPU Industrial Catering</h3>
            <p class="box-text">High-volume daily workforce breakfast, lunch, and dinner solutions powered by our Central Preparation Unit.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> Bulk Kitchen Capacity</li>
              <li><i class="fa-solid fa-circle-check"></i> Shift Meal Delivery</li>
              <li><i class="fa-solid fa-circle-check"></i> High Hygiene Standards</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>

        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/corporate_buffet.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-box-open"></i></div>
            <span class="box-num">03</span>
            <h3>Corporate Packed Combos</h3>
            <p class="box-text">Hygienically sealed executive lunch boxes and snack combos delivered hot to corporate offices across OMR.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> Executive Lunch Boxes</li>
              <li><i class="fa-solid fa-circle-check"></i> Tamper-Evident Seals</li>
              <li><i class="fa-solid fa-circle-check"></i> Daily Office Delivery</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>

        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/temple_annathanam.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-gopuram"></i></div>
            <span class="box-num">04</span>
            <h3>Kovil Annathanam</h3>
            <p class="box-text">Pure satvik Tamil traditional meals cooked in brass vessels with religious sanctity for temple consecrated feasts.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> 100% Satvik Pure</li>
              <li><i class="fa-solid fa-circle-check"></i> Traditional Sanctity</li>
              <li><i class="fa-solid fa-circle-check"></i> Brass Vessel Cooking</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

if (html.includes(s5_old)) {
  html = html.replace(s5_old, s5_new);
  console.log('S5 wrapper replacement SUCCESS!');
} else {
  console.log('S5 wrapper replacement MISSED!');
}

// 3. Move Section 6 (#act-6) Master Caterer Event Architect and place between Corporate Banner and Section 7
const s6_old = `<section id="act-6" class="section-light">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-calculator glow-icon"></i> ACT 06 — Interactive Calculator</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Calculate Your <em>Catering Package</em></h2>
        <p class="section-desc story-reveal">Select your event details to get an instant estimate & send it directly to Jagan C on WhatsApp.</p>
      </div>
      <div class="calc-card-glass story-reveal">
        <div class="calc-body-grid">
          <div class="calc-controls">
            <div class="calc-group">
              <label><i class="fa-solid fa-cake-candles"></i> Select Event Type</label>
              <select id="calcOccasion" class="calc-input">
                <option value="Marriage">Marriage / Wedding Reception</option>
                <option value="Engagement">Betrothal / Engagement</option>
                <option value="Birthday">Birthday Party (1st, 60th, 80th)</option>
                <option value="Housewarming">Housewarming (கிரகப்பிரவேசம்)</option>
                <option value="Baby Shower">Baby Shower / Ear-Piercing</option>
                <option value="Corporate Events">Corporate Events & Office Lunch</option>
                <option value="CPU Catering">CPU Industrial Catering</option>
                <option value="Annathanam">Kovil Annathanam</option>
              </select>
            </div>
            <div class="calc-group">
              <label><i class="fa-solid fa-utensils"></i> Cuisine Preference</label>
              <div class="radio-pill-group">
                <label class="radio-pill active"><input type="radio" name="calcType" value="Veg" checked> Pure Veg</label>
                <label class="radio-pill"><input type="radio" name="calcType" value="NonVeg"> Non-Veg Feast</label>
                <label class="radio-pill"><input type="radio" name="calcType" value="Both"> Veg & Non-Veg</label>
              </div>
            </div>
            <div class="calc-group">
              <label><i class="fa-solid fa-users"></i> Guest Count: <span id="guestCountVal" class="gold-count">250</span> Guests</label>
              <input type="range" id="guestSlider" min="50" max="3000" step="50" value="250" class="range-slider">
            </div>
          </div>
          <div class="calc-summary-box">
            <div class="summary-header"><h3>Proposal Summary</h3><span class="summary-badge accent-label">JS Caterer</span></div>
            <div class="sum-row"><span>Event:</span><strong id="sumEvent">Marriage / Wedding</strong></div>
            <div class="sum-row"><span>Cuisine:</span><strong id="sumCuisine">Pure Veg Banana Leaf Feast</strong></div>
            <div class="sum-row"><span>Menu Items:</span><strong id="sumItemsCount">18+ Traditional Dishes</strong></div>
            <div class="sum-row highlight"><span>Price Range:</span><strong id="sumEstimate">₹180 – ₹350 per plate</strong></div>
            <button id="sendCalcToWA" class="btn-primary-gold full-btn mt-16"><i class="fa-brands fa-whatsapp"></i> Send Quote to Jagan C</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;

const s6_new = `  <!-- ================================================================
       ACT 06 — MASTER CATERER EVENT ARCHITECT & PROPOSAL TICKET
       ================================================================ -->
  <section id="act-6" class="section-light-warm">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-compass-drafting glow-icon"></i> ACT 06 — Custom Culinary Planner</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Master Caterer <em>Event Architect</em></h2>
        <p class="section-desc story-reveal">Design your event menu, select your preferred cuisine style & scale, and generate an instant proposal ticket.</p>
      </div>

      <div class="caterer-architect-stage story-reveal">
        <!-- LEFT: Culinary Planner Controls -->
        <div class="caterer-controls-card">
          <div class="caterer-intro-header">
            <h3 class="caterer-intro-title">Craft Your Custom Culinary Experience</h3>
            <p class="caterer-intro-subtitle">Tailored menus, authentic brass preparation & seamless service</p>
            <p class="caterer-intro-desc">Select your occasion, preferred cuisine spread, and guest scale below. Our master catering team will generate a personalized menu proposal ticket for your event.</p>
          </div>

          <div class="architect-group">
            <label><i class="fa-solid fa-cake-candles"></i> Select Occasion & Ceremony</label>
            <div class="custom-dropdown-wrap">
              <select id="calcOccasion" class="calc-input">
                <option value="Marriage">Marriage / Wedding Reception</option>
                <option value="Engagement">Betrothal / Engagement</option>
                <option value="Birthday">Birthday Party (1st, 60th, 80th)</option>
                <option value="Housewarming">Housewarming (கிரகப்பிரவேசம்)</option>
                <option value="Baby Shower">Baby Shower / Ear-Piercing</option>
                <option value="Corporate Events">Corporate Events & Office Lunch</option>
                <option value="CPU Catering">CPU Industrial Catering</option>
                <option value="Annathanam">Kovil Annathanam</option>
              </select>
              <i class="fa-solid fa-chevron-down custom-dropdown-icon"></i>
            </div>
          </div>

          <div class="architect-group">
            <label><i class="fa-solid fa-bowl-food"></i> Cuisine Preference</label>
            <div class="cuisine-segmented-control">
              <button type="button" class="cuisine-btn segment-btn active" data-value="Veg"><i class="fa-solid fa-seedling"></i> Pure Veg Satvik</button>
              <button type="button" class="cuisine-btn segment-btn" data-value="NonVeg"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg Feast</button>
              <button type="button" class="cuisine-btn segment-btn" data-value="Both"><i class="fa-solid fa-utensils"></i> Combined</button>
            </div>
          </div>

          <div class="architect-group">
            <div class="slider-header-row">
              <label><i class="fa-solid fa-users"></i> Guest Scale Estimator</label>
            </div>
            <div class="guest-slider-wrap">
              <input type="range" id="guestSlider" min="50" max="3000" step="50" value="250" class="range-slider">
              <div class="slider-count-display">
                <span id="guestCountVal">250</span> <small>Guests</small>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Restaurant Wall Menu Proposal Ticket -->
        <div class="caterer-wall-ticket">
          <div class="ticket-header">
            <div class="ticket-brand">
              <img src="assets/logo.png" alt="JS Caterer Logo" class="ticket-logo">
              <div>
                <span class="ticket-brand-name">JS CATERER</span>
                <span class="ticket-brand-sub">CULINARY PROPOSAL SPECIFICATION</span>
              </div>
            </div>
            <span class="ticket-seal-badge"><i class="fa-solid fa-certificate"></i> OFFICIAL</span>
          </div>

          <div class="ticket-tear-line"></div>

          <div class="ticket-summary-list">
            <div class="ticket-row">
              <span>Occasion:</span>
              <strong id="sumEvent">Marriage / Wedding</strong>
            </div>
            <div class="ticket-row">
              <span>Cuisine Spread:</span>
              <strong id="sumCuisine">Pure Veg Satvik (18+ Dishes)</strong>
            </div>
            <div class="ticket-row">
              <span>Guest Scale:</span>
              <strong id="sumGuests">250 Guests</strong>
            </div>
          </div>

          <div class="ticket-amenities-box">
            <h4>Included Hospitality Amenities:</h4>
            <ul>
              <li><i class="fa-solid fa-circle-check"></i> Traditional Pure Brass Vessel Cooking</li>
              <li><i class="fa-solid fa-circle-check"></i> Uniformed Culinary Serving Staff</li>
              <li><i class="fa-solid fa-circle-check"></i> 100% RO Purified Water & Organic Leaves</li>
              <li><i class="fa-solid fa-circle-check"></i> On-Time Hot Dispatch Guarantee</li>
            </ul>
          </div>

          <button id="sendCalcToWA" class="btn-wa-spec-submit">
            <i class="fa-brands fa-whatsapp"></i> Send Proposal Ticket to Founder Jagan C 🚀
          </button>
        </div>
      </div>
    </div>
  </section>`;

if (html.includes(s6_old)) {
  html = html.replace(s6_old, '');
  console.log('S6 old removal SUCCESS!');
} else {
  console.log('S6 old removal MISSED!');
}

const s7_target = `<section class="fullstretch-section" style="height: 80vh;">
    <img src="assets/corporate_buffet.jpg" alt="Corporate Buffets JS Caterer Chennai" class="fs-bg">
    <div class="fullstretch-overlay" style="background:linear-gradient(180deg,transparent 0%,rgba(14,32,24,.92) 100%);"></div>
    <div class="fullstretch-content" style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;padding-bottom:48px;">
      <h2 style="color:#F3EAD0;font-size:clamp(1.8rem,3.5vw,2.8rem);margin-bottom:10px;">Serving Top IT Parks & <em>Corporate HQs</em> Across OMR</h2>
      <p style="color:rgba(255,255,255,.72);max-width:600px;font-size:1rem;">Daily breakfast, executive lunch boxes & snack combos delivered on time, every day, with zero compromise on taste.</p>
    </div>
  </section>`;

if (html.includes(s7_target)) {
  html = html.replace(s7_target, s7_target + '\n\n' + s6_new);
  console.log('S6 new insertion SUCCESS!');
} else {
  console.log('S6 new insertion MISSED!');
}

// 4. Replace Section 8 (#act-8)
const s8_old = `<section id="act-8" class="section-light">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-paper-plane glow-icon"></i> ACT 08 — Begin Your Story</div>
      <div class="contact-grid story-reveal">
        <div class="contact-card-glass">
          <span class="section-gold-tag accent-label">Google Business Profile</span>
          <h2 style="font-family:var(--font-head);font-size:1.9rem;color:var(--emerald);margin:10px 0 4px;">JS Caterer Velachery</h2>
          <p class="contact-tamil" style="color:var(--gold);">பாரம்பரிய சுவை... மறக்க முடியாத விருந்து!</p>
          <div class="contact-detail-row"><i class="fa-solid fa-user-tie"></i><div><strong>Jagan C</strong><p>Owner & Founder</p></div></div>
          <div class="contact-detail-row"><i class="fa-solid fa-phone"></i><div><strong>Phone / WhatsApp</strong><p><a href="tel:9940649939" class="phone-link" style="color:var(--emerald);">99406 49939</a> | <a href="tel:9884985368" class="phone-link" style="color:var(--emerald);">98849 85368</a></p></div></div>
          <div class="contact-detail-row"><i class="fa-solid fa-location-dot"></i><div><strong>Address</strong><p>No 81, Throwpathi Amman Koil 5th Street, Velachery, Chennai 600042</p></div></div>
        </div>
        <div class="wa-sim-card" style="align-self:start;">
          <div class="wa-sim-header accent-label"><i class="fa-brands fa-whatsapp"></i> Instant WhatsApp Auto-Reply</div>
          <div class="chat-bubble">"வணக்கம். JS Caterer-ஐ தொடர்பு கொண்டதற்கு நன்றி. உங்கள் நிகழ்ச்சி தேதி, இடம் மற்றும் விருந்தினர்கள் எண்ணிக்கையை அனுப்புங்கள்."</div>
          <a href="https://wa.me/919940649939" target="_blank" class="btn-wa-emerald full-btn"><i class="fa-brands fa-whatsapp"></i> Start WhatsApp with Jagan C</a>
          <a href="contact.html" class="btn-glass-dark full-btn" style="text-align:center;"><i class="fa-solid fa-calendar-check"></i> Full Booking Form</a>
        </div>
      </div>
    </div>
  </section>`;

const s8_new = `  <!-- ================================================================
       ACT 08 — WEDDING FEAST FULL-STRETCH + CONTACT (LIGHT)
       ================================================================ -->
  <section class="fullstretch-section" style="height:70vh;">
    <img src="assets/banana_leaf_serving.jpg" alt="Traditional Banana Leaf Meal Service" class="fs-bg">
    <div class="fullstretch-overlay"></div>
    <div class="fullstretch-content">
      <span style="font-family:var(--font-label);font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;background:rgba(232,200,77,.15);border:1px solid rgba(232,200,77,.4);color:var(--gold-lt);padding:5px 16px;border-radius:30px;display:inline-block;margin-bottom:20px;">Traditional Kalyana Samayal</span>
      <h2 style="color:#F3EAD0;font-size:clamp(2rem,4vw,3.2rem);margin-bottom:14px;">1000+ Guests Served <em>Seamlessly</em></h2>
      <p style="color:rgba(255,255,255,.75);max-width:580px;font-size:1rem;margin-bottom:28px;">Our uniformed servers deliver coordinated banana leaf service with warmth, speed, and zero chaos — every time.</p>
      <a href="contact.html" class="btn-primary-gold"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
    </div>
  </section>

  <section id="act-8" class="section-light-warm">
    <div class="container">
      <div class="section-header-center">
        <div class="story-chapter-tag accent-label"><i class="fa-solid fa-address-card"></i> Official Business Contact</div>
        <h2 class="section-title story-reveal">Connect With <em>JS Caterer</em></h2>
        <p class="section-desc story-reveal">Reach out directly to Founder Jagan C for bookings, food tastings, or custom catering consultations.</p>
      </div>

      <div class="culinary-biz-stage story-reveal">
        <!-- LEFT: Executive Business Card -->
        <div class="culinary-biz-card">
          <div class="biz-card-foil-border"></div>
          <div class="cooking-icons-constellation">
            <i class="fa-solid fa-fire-burner icon-c1"></i>
            <i class="fa-solid fa-utensils icon-c2"></i>
            <i class="fa-solid fa-bowl-food icon-c3"></i>
            <i class="fa-solid fa-leaf icon-c4"></i>
          </div>
          <div class="biz-card-header">
            <img src="assets/logo.png" alt="JS Caterer Logo" class="biz-card-logo">
            <div class="biz-card-brand">
              <h3 class="biz-brand-title">JS CATERER</h3>
              <span class="biz-brand-sub">PREMIER VEG &amp; NON-VEG CATERERS</span>
              <p class="biz-brand-tamil">பாரம்பரிய சுவை... மறக்க முடியாத விருந்து!</p>
            </div>
          </div>
          <div class="biz-card-divider"></div>
          <div class="biz-founder-row">
            <div class="founder-avatar-badge"><i class="fa-solid fa-user-chef"></i></div>
            <div class="founder-meta">
              <span class="founder-label">FOUNDER &amp; MASTER CATERER</span>
              <strong class="founder-name">Jagan C</strong>
              <span class="founder-experience">20+ Years Culinary Excellence · Velachery HQ</span>
            </div>
          </div>
          <div class="biz-card-divider"></div>
          <div class="biz-contact-list">
            <a href="tel:9940649939" class="biz-contact-item"><div class="biz-icon-box"><i class="fa-solid fa-phone"></i></div><div><span class="biz-meta-label">DIRECT CALL / BOOKING</span><strong class="biz-meta-val">99406 49939 / 98849 85368</strong></div></a>
            <div class="biz-contact-item"><div class="biz-icon-box"><i class="fa-solid fa-location-dot"></i></div><div><span class="biz-meta-label">CENTRAL KITCHEN HQ</span><strong class="biz-meta-val">No 81, Throwpathi Amman Koil 5th St, Velachery, Chennai 600042</strong></div></div>
          </div>
        </div>

        <!-- RIGHT: Digital WhatsApp Booking Pass -->
        <div class="wa-booking-pass-card">
          <div class="pass-header"><div class="pass-tag accent-label"><i class="fa-brands fa-whatsapp"></i> Instant VIP Access</div><h3>Digital WhatsApp Booking Pass</h3><p>Send instant booking specs directly to Founder Jagan C</p></div>
          <form id="waPassForm" class="pass-form-grid">
            <div class="pass-input-group"><label><i class="fa-solid fa-user"></i> Your Name</label><input type="text" id="passName" placeholder="e.g. Ananthakrishnan" required class="pass-input"></div>
            <div class="pass-input-group"><label><i class="fa-solid fa-calendar-day"></i> Event Date</label><input type="date" id="passDate" required class="pass-input"></div>
            <div class="pass-input-group"><label><i class="fa-solid fa-map-pin"></i> Venue / Location</label><input type="text" id="passVenue" placeholder="e.g. Velachery / ECR Hall" required class="pass-input"></div>
            <button type="submit" class="btn-wa-pass-submit"><i class="fa-brands fa-whatsapp"></i> Generate &amp; Send WhatsApp Pass 🚀</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;

if (html.includes(s8_old)) {
  html = html.replace(s8_old, s8_new);
  console.log('S8 wrapper replacement SUCCESS!');
} else {
  console.log('S8 wrapper replacement MISSED!');
}

fs.writeFileSync('index.html', html);
console.log('Perfect section wrappers saved to index.html! Size:', html.length, 'Lines:', html.split('\n').length);
