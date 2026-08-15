const fs = require('fs');

let html = fs.readFileSync('scratch/zip_extract/index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Replace Section 4 (#act-4)
const s4_start = html.indexOf('<section id="act-4"');
const s4_end = html.indexOf('</section>', s4_start) + 10;

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

      <div class="orbital-showcase-stage story-reveal">
        <!-- Central Rotating Brass Thali Plate with Logo -->
        <div class="orbital-center-wrap">
          <div class="rotating-thali-plate" id="centralRotatingThali">
            <img src="assets/brass_thali_plate.jpg" alt="Traditional Brass Thali Plate" class="thali-img">
          </div>
          <div class="stationary-center-logo">
            <img src="assets/logo.png" alt="JS Caterer Emblem" class="center-logo-img">
          </div>
        </div>

        <!-- 4 Orbital Pillar Cards at Corners -->
        <div class="orbital-card card-top-left">
          <div class="orbital-card-icon"><i class="fa-solid fa-fire-burner"></i></div>
          <h3>Traditional Cooking</h3>
          <p>Pure brass vessel preparations, authentic woodfire methods & traditional Tamil secret spices.</p>
          <div class="card-pill-tag"><i class="fa-solid fa-shield-check"></i> 100% Authentic</div>
        </div>

        <div class="orbital-card card-top-right">
          <div class="orbital-card-icon"><i class="fa-solid fa-pump-soap"></i></div>
          <h3>Uncompromised Hygiene</h3>
          <p>100% kitchen sanitation, RO purified water & strict hygiene protocols at every step.</p>
          <div class="card-pill-tag"><i class="fa-solid fa-circle-check"></i> FSSAI Compliant</div>
        </div>

        <div class="orbital-card card-bottom-left">
          <div class="orbital-card-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <h3>On-Time Service</h3>
          <p>Hot, fresh meals dispatched right on schedule. Zero delay for your guests.</p>
          <div class="card-pill-tag"><i class="fa-solid fa-truck-fast"></i> Punctual Delivery</div>
        </div>

        <div class="orbital-card card-bottom-right">
          <div class="orbital-card-icon"><i class="fa-solid fa-user-chef"></i></div>
          <h3>Master Chef Expertise</h3>
          <p>Over 20+ years of culinary excellence under the leadership of Jagan C.</p>
          <div class="card-pill-tag"><i class="fa-solid fa-star"></i> Experienced Team</div>
        </div>
      </div>
    </div>
  </section>`;

html = html.substring(0, s4_start) + s4_new + html.substring(s4_end);
console.log('Section 4 updated!');

// 2. Replace Section 5 (#act-5)
const s5_start = html.indexOf('<section id="act-5"');
const s5_end = html.indexOf('</section>', s5_start) + 10;

const s5_new = `<section id="act-5" class="section-soft-gold">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-utensils"></i> ACT 05 — Our Specialty Offerings</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Comprehensive <em>Catering Solutions</em></h2>
        <p class="section-desc story-reveal">From grand traditional Tamil marriages to daily corporate workforce lunches across South Chennai.</p>
      </div>

      <div class="services-2x2-grid story-reveal">
        <!-- Box 01 -->
        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/wedding_feast.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-heart-circle-check"></i></div>
            <span class="box-num">01</span>
            <h3>Marriage & Event Management</h3>
            <p class="box-text">Complete wedding dining setups from morning tiffin to grand banana leaf feasts, reception buffets & live counters.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> Banana Leaf Feasts</li>
              <li><i class="fa-solid fa-circle-check"></i> Reception Buffets</li>
              <li><i class="fa-solid fa-circle-check"></i> Live Stall Counters</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>

        <!-- Box 02 -->
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

        <!-- Box 03 -->
        <div class="service-box-luxury story-reveal">
          <div class="service-bg-reveal" style="background-image: url('assets/corporate_buffet.jpg');"></div>
          <div class="service-bg-overlay"></div>
          <div class="service-content-relative">
            <div class="box-icon-wrap"><i class="fa-solid fa-box-open"></i></div>
            <span class="box-num">03</span>
            <h3>Corporate Packed Food</h3>
            <p class="box-text">Hygienically sealed executive lunch boxes and snack combos delivered hot to corporate offices across OMR.</p>
            <ul class="service-checklist">
              <li><i class="fa-solid fa-circle-check"></i> Executive Lunch Boxes</li>
              <li><i class="fa-solid fa-circle-check"></i> Tamper-Evident Seals</li>
              <li><i class="fa-solid fa-circle-check"></i> Daily Office Delivery</li>
            </ul>
            <a href="services.html" class="service-explore-link">Explore &rarr;</a>
          </div>
        </div>

        <!-- Box 04 -->
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

html = html.substring(0, s5_start) + s5_new + html.substring(s5_end);
console.log('Section 5 updated!');

// 3. Remove Section 6 (#act-6) from original place and insert Master Caterer Event Architect between Corporate Banner and Section 7
const s6_start = html.indexOf('<section id="act-6"');
const s6_end = html.indexOf('</section>', s6_start) + 10;
html = html.substring(0, s6_start) + html.substring(s6_end);

const corp_banner_start = html.indexOf('Serving Top IT Parks');
const corp_section_end = html.indexOf('</section>', corp_banner_start) + 10;

const s6_new = `\n\n  <!-- ================================================================
       ACT 06 — MASTER CATERER EVENT ARCHITECT & PROPOSAL TICKET
       ================================================================ -->
  <section id="act-6" class="section-light-warm">
    <div class="container">
      <div class="story-chapter-tag accent-label"><i class="fa-solid fa-compass-drafting glow-icon"></i> ACT 06 — Custom Culinary Planner</div>
      <div class="section-header-center">
        <h2 class="section-title story-reveal">Master Caterer <em>Event Architect</em></h2>
        <p class="section-desc story-reveal">Design your event menu, select your preferred cuisine style & scale, and generate an instant proposal ticket.</p>
      </div>

      <div class="caterer-architect-grid story-reveal">
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

html = html.substring(0, corp_section_end) + s6_new + html.substring(corp_section_end);
console.log('Section 6 repositioned successfully!');

fs.writeFileSync('index.html', html);
console.log('Pristine index.html generated! Size:', html.length, 'Lines:', html.split('\n').length);
