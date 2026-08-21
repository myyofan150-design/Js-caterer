// JS CATERER — Master Script v3
// Hero Slideshow · Drag Carousel · Scroll Story · Calculator · Area Chips · Storyboard

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     0. MOBILE DRAWER NAVIGATION & MENU TOGGLE
  ───────────────────────────────────────────────────── */
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .btn-gold-mobile');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('is-open');
    if (mobileToggleBtn) mobileToggleBtn.classList.add('is-active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('is-active');
    document.body.classList.add('menu-open');

    if (window.gsap) {
      gsap.fromTo(mobileNavItems, 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
      );
    }
  }

  function closeMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('is-open');
    if (mobileToggleBtn) mobileToggleBtn.classList.remove('is-active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', () => {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavItems.forEach(item => item.addEventListener('click', closeMobileMenu));

  /* ─────────────────────────────────────────────────────
     GSAP + SCROLLTRIGGER ANIMATION ENGINE (ULTRA-FAST & SNAPPY)
  ───────────────────────────────────────────────────── */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // A. Ultra-Fast Hero Section Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.4 } });
    heroTl.from('.luxury-header', { y: -20, opacity: 0, duration: 0.35 })
          .from('.hero-badge-group, .hero-pill-badge', { y: 15, opacity: 0, duration: 0.3 }, '-=0.2')
          .from('.hero-main-title', { y: 25, opacity: 0, duration: 0.4 }, '-=0.2')
          .from('.hero-sub-text', { y: 20, opacity: 0, duration: 0.35 }, '-=0.25')
          .from('.hero-actions, .hero-features-row', { y: 20, opacity: 0, stagger: 0.06, duration: 0.35 }, '-=0.2');

    // B. Fast Scroll Reveal for Section Headers & Subtitles
    gsap.utils.toArray('h2, .section-gold-tag, .section-sub, .story-chapter-tag').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none'
        },
        y: 22,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    // C. Ultra-Snappy Staggered Card Entrance Animations
    const cardSelectors = [
      '.service-cat-card',
      '.menu-cat-block',
      '.combo-card',
      '.story-card-glass',
      '.calc-card-glass',
      '.contact-info-card',
      '.contact-form-card',
      '.gallery-grid-item',
      '.area-chip',
      '.feature-mini-card'
    ];

    cardSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        ScrollTrigger.batch(elements, {
          onEnter: batch => gsap.fromTo(batch, 
            { y: 25, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
          ),
          start: 'top 94%'
        });
      }
    });

    // D. Animated Counter Numbers (Fast 1s Count-Up)
    document.querySelectorAll('.stat-number, .count-up').forEach(counter => {
      const textVal = counter.innerText.trim();
      const target = parseFloat(textVal.replace(/[^0-9.]/g, '')) || 0;
      const suffix = textVal.replace(/[0-9.]/g, '');
      if (target > 0) {
        gsap.fromTo(counter, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.0,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 88%'
            },
            onUpdate: function () {
              counter.innerText = Math.ceil(this.targets()[0].innerText) + suffix;
            }
          }
        );
      }
    });

    // E. Parallax Image Zoom Effect
    gsap.utils.toArray('.hero-slide, .story-img-contain img, .visual-badge-img').forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        },
        y: -18,
        ease: 'none'
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     1. HERO VIDEO + PHOTO SLIDESHOW & RUNNING TOP PROGRESS BAR
  ───────────────────────────────────────────────────── */
  const slides = document.querySelectorAll('.hero-slide');
  const heroSlideNum = document.getElementById('heroSlideNum');
  const heroSlideLbl = document.getElementById('heroSlideLbl');
  const heroTopProgressFill = document.getElementById('heroTopProgressFill');

  if (slides.length) {
    let currentSlide = 0;
    let progressPercent = 0;
    const SLIDE_DURATION_MS = 5000;
    const TICK_INTERVAL_MS = 50;
    let progressTimer;

    function updateProgressUI() {
      if (heroTopProgressFill) {
        heroTopProgressFill.style.width = `${progressPercent}%`;
      }
    }

    function goToSlide(idx) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (idx + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      
      if (heroSlideNum) heroSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
      if (heroSlideLbl) heroSlideLbl.textContent = slides[currentSlide].dataset.label || '';
      
      progressPercent = 0;
      updateProgressUI();
      startProgressTimer();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startProgressTimer() {
      clearInterval(progressTimer);
      progressTimer = setInterval(() => {
        progressPercent += (TICK_INTERVAL_MS / SLIDE_DURATION_MS) * 100;
        if (progressPercent >= 100) {
          progressPercent = 100;
          updateProgressUI();
          nextSlide();
        } else {
          updateProgressUI();
        }
      }, TICK_INTERVAL_MS);
    }

    // Maintain full 100% slideshow image clarity
    const heroBgVideo = document.getElementById('heroBgVideo');
    if (heroBgVideo) {
      heroBgVideo.addEventListener('error', () => {
        document.getElementById('heroSlideshow').style.opacity = '1';
        startProgressTimer();
      });
    }

    startProgressTimer();
  }

  /* ─────────────────────────────────────────────────────
     2. DRAG CAROUSEL WITH AUTO-LOOP, HOVER PAUSE & TOP ARROWS
  ───────────────────────────────────────────────────── */
  const carouselWrapper = document.getElementById('dragCarouselWrapper') || document.querySelector('.drag-carousel-wrapper');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');

  if (carouselWrapper) {
    let isDown = false, startX, scrollLeft;
    let autoLoopTimer = null;

    function getCardStep() {
      const firstCard = carouselWrapper.querySelector('.carousel-slide-card');
      return firstCard ? firstCard.offsetWidth + 28 : 340;
    }

    function updateArrowStates() {
      // Always active for infinite loop
      if (prevBtn) prevBtn.classList.remove('disabled');
      if (nextBtn) nextBtn.classList.remove('disabled');
    }

    function stepForward() {
      const maxScroll = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;
      if (carouselWrapper.scrollLeft >= maxScroll - 15) {
        carouselWrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselWrapper.scrollBy({ left: getCardStep(), behavior: 'smooth' });
      }
    }

    function stepBackward() {
      if (carouselWrapper.scrollLeft <= 10) {
        const maxScroll = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;
        carouselWrapper.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        carouselWrapper.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
      }
    }

    function startAutoLoop() {
      stopAutoLoop();
      autoLoopTimer = setInterval(stepForward, 3500);
    }

    function stopAutoLoop() {
      if (autoLoopTimer) {
        clearInterval(autoLoopTimer);
        autoLoopTimer = null;
      }
    }

    // Arrow Button Click Handlers
    if (nextBtn) nextBtn.addEventListener('click', () => { stepForward(); startAutoLoop(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stepBackward(); startAutoLoop(); });

    // Drag events
    carouselWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      stopAutoLoop();
      carouselWrapper.classList.add('dragging');
      startX = e.pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    });
    carouselWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      carouselWrapper.classList.remove('dragging');
      startAutoLoop();
    });
    carouselWrapper.addEventListener('mouseup', () => {
      isDown = false;
      carouselWrapper.classList.remove('dragging');
      startAutoLoop();
    });
    carouselWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselWrapper.offsetLeft;
      carouselWrapper.scrollLeft = scrollLeft - (x - startX) * 1.8;
    });

    // Touch events
    carouselWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      stopAutoLoop();
      startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    }, { passive: true });
    carouselWrapper.addEventListener('touchend', () => { isDown = false; startAutoLoop(); });
    carouselWrapper.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
      carouselWrapper.scrollLeft = scrollLeft - (x - startX) * 1.8;
    }, { passive: true });

    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', stopAutoLoop);

    // Scroll listener for arrows
    carouselWrapper.addEventListener('scroll', updateArrowStates);
    updateArrowStates();

    // Start auto loop
    startAutoLoop();
  }

  /* ─────────────────────────────────────────────────────
     3. SCROLL PROGRESS BAR + SIDE DOT NAV
  ───────────────────────────────────────────────────── */
  const progressBar = document.getElementById('storyProgressBar');
  const storyActs = document.querySelectorAll('section[id^="act-"]');
  const sideDots = document.querySelectorAll('.story-dot');

  window.addEventListener('scroll', () => {
    if (progressBar) {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = `${Math.min((scrollTop / scrollHeight) * 100, 100)}%`;
    }
    storyActs.forEach((act, index) => {
      const rect = act.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        sideDots.forEach(d => d.classList.remove('active'));
        if (sideDots[index]) sideDots[index].classList.add('active');
      }
    });
  }, { passive: true });

  /* ─────────────────────────────────────────────────────
     4. SCROLL REVEAL
  ───────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.story-reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ─────────────────────────────────────────────────────
     5. CUSTOM CURSOR
  ───────────────────────────────────────────────────── */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });
  }

  /* ─────────────────────────────────────────────────────
     6. GOLDEN PARTICLE CANVAS (REMOVED)
  ───────────────────────────────────────────────────── */

  /* ─────────────────────────────────────────────────────
     7. CALCULATOR
  ───────────────────────────────────────────────────── */
  const guestSlider = document.getElementById('guestSlider');
  if (guestSlider) {
    const guestCountVal = document.getElementById('guestCountVal');
    const sumEvent = document.getElementById('sumEvent');
    const sumCuisine = document.getElementById('sumCuisine');
    const sumItemsCount = document.getElementById('sumItemsCount');
    const sumEstimate = document.getElementById('sumEstimate');
    const calcOccasion = document.getElementById('calcOccasion');

    function updateCalc() {
      const count = guestSlider.value;
      if (guestCountVal) guestCountVal.textContent = count;
      if (sumEvent && calcOccasion) sumEvent.textContent = calcOccasion.value;
      const cuisine = (document.querySelector('input[name="calcType"]:checked') || {}).value || 'Veg';
      if (cuisine === 'Veg') {
        if (sumCuisine) sumCuisine.textContent = 'Pure Veg Banana Leaf Feast';
        if (sumItemsCount) sumItemsCount.textContent = '18+ Traditional Veg Dishes';
        if (sumEstimate) sumEstimate.textContent = '₹180 – ₹350 per plate';
      } else if (cuisine === 'NonVeg') {
        if (sumCuisine) sumCuisine.textContent = 'Non-Veg Kalyana / Reception Buffet';
        if (sumItemsCount) sumItemsCount.textContent = '22+ Non-Veg & Biryani Delicacies';
        if (sumEstimate) sumEstimate.textContent = '₹350 – ₹650 per plate';
      } else {
        if (sumCuisine) sumCuisine.textContent = 'Combined Veg & Non-Veg Multi-Cuisine';
        if (sumItemsCount) sumItemsCount.textContent = '25+ Grand Selection';
        if (sumEstimate) sumEstimate.textContent = '₹400 – ₹750 per plate';
      }
    }

    guestSlider.addEventListener('input', updateCalc);
    if (calcOccasion) calcOccasion.addEventListener('change', updateCalc);
    document.querySelectorAll('input[name="calcType"]').forEach(r => r.addEventListener('change', updateCalc));
    document.querySelectorAll('.radio-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
      });
    });

    const sendCalcToWA = document.getElementById('sendCalcToWA');
    if (sendCalcToWA) {
      sendCalcToWA.addEventListener('click', () => {
        const count = guestSlider.value;
        const eventName = sumEvent ? sumEvent.textContent : 'Marriage';
        const cuisine = sumCuisine ? sumCuisine.textContent : 'Veg Feast';
        const estimate = sumEstimate ? sumEstimate.textContent : '₹180 – ₹350 per plate';
        const msg = `வணக்கம் JS Caterer (Jagan C),\n\nI calculated a package on your website:\n🎉 Event: ${eventName}\n👥 Guest Count: ${count}\n🍲 Cuisine: ${cuisine}\n💰 Estimated Range: ${estimate}\n\nPlease send me the exact menu PDF and official quote!`;
        window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }
  }

  /* ─────────────────────────────────────────────────────
     8. STORYBOARD PLAYER (gallery page)
  ───────────────────────────────────────────────────── */
  const scenes = [
    { time: "01. OPENING (0–5 SEC)", title: "JS Caterer Logo Animation", voice: "Voice Over: 'பாரம்பரிய சுவை... மறக்க முடியாத விருந்து!'", desc: "3D Gold Logo animation with elegant ambient lens flares & tagline." },
    { time: "02. TRADITION (5–12 SEC)", title: "Heritage Brass Vessels & Cooking", voice: "Voice Over: 'பாரம்பரிய முறையில் சமைக்கப்பட்ட தூய சுவை'", desc: "Traditional brass pots, fresh banana leaves, wooden chulhas and open flames." },
    { time: "03. LIVE KITCHEN (12–20 SEC)", title: "Master Chefs & 100% Hygiene", voice: "Voice Over: 'தரம் மற்றும் சுத்தம் எங்கள் அடையாளம்'", desc: "Chefs in white uniforms, hygienic kitchen, fresh hand-picked ingredients." },
    { time: "04. FOOD DISPLAY (20–30 SEC)", title: "Mouth-Watering Feast Spreads", voice: "Voice Over: 'ஒவ்வொரு விருந்தும் ஒரு மறக்க முடியாத அனுபவம்'", desc: "Close-up shots: Sambar, Mutton Biryani, Crispy Vadas, Payasam & Sweets." },
    { time: "05. EVENTS (30–40 SEC)", title: "Weddings, Receptions & Corporate", voice: "Voice Over: 'உங்கள் முக்கியமான நிகழ்ச்சிகள், எங்கள் பொறுப்பு'", desc: "Weddings, receptions, birthdays, corporate events, temple Annadhanam feasts." },
    { time: "06. HAPPY CLIENTS (40–48 SEC)", title: "Smiling Guests & Satisfaction", voice: "Voice Over: 'உங்கள் மகிழ்ச்சி, எங்கள் வெற்றி'", desc: "Happy guests on banana leaf with smiles, thumbs-up and gratitude." },
    { time: "07. CLOSING (48–60 SEC)", title: "Book Your Event Today!", voice: "Voice Over: 'Book Your Event Today with JS Caterer!'", desc: "JS Caterer Logo, Jagan C (+91 99406 49939), Velachery Address, WhatsApp CTA." }
  ];

  window.playScene = function (index) {
    const s = scenes[index];
    if (!s) return;
    const el = (id) => document.getElementById(id);
    if (el('sceneTime'))  el('sceneTime').textContent  = s.time;
    if (el('sceneTitle')) el('sceneTitle').textContent = s.title;
    if (el('sceneVoice')) el('sceneVoice').textContent = s.voice;
    if (el('sceneDesc'))  el('sceneDesc').textContent  = s.desc;
    document.querySelectorAll('.scene-node').forEach((node, i) => {
      node.classList.toggle('active', i === index);
    });
  };

  /* ─────────────────────────────────────────────────────
     9. AREA CHIP HIGHLIGHT
  ───────────────────────────────────────────────────── */
  window.highlightArea = function (areaName) {
    const areaInfoText = document.getElementById('areaInfoText');
    if (areaInfoText) {
      areaInfoText.innerHTML = `JS Caterer guarantees 100% on-time delivery & hot food catering in <strong>${areaName}</strong> and all surrounding locations!`;
    }
    document.querySelectorAll('.area-chip').forEach(chip => {
      chip.classList.toggle('active-hq', chip.textContent.includes(areaName));
    });
  };

  /* ─────────────────────────────────────────────────────
     10. CONTACT PAGE FORM
  ───────────────────────────────────────────────────── */
  const cCategory = document.getElementById('cCategory');
  const cOccasion = document.getElementById('cOccasion');

  const categoryOptions = {
    CPU: [
      { value: "Manufacturing", text: "Manufacturing Sector" },
      { value: "IT", text: "IT Sector" },
      { value: "Institutions", text: "Institutions" },
      { value: "Hospitals", text: "Hospitals" }
    ],
    Packed: [
      { value: "Breakfast Combo", text: "Breakfast Combo" },
      { value: "Lunch", text: "Lunch" },
      { value: "Snacks", text: "Snacks" },
      { value: "Dinner Combo", text: "Dinner Combo" }
    ],
    Events: [
      { value: "Marriage", text: "Marriage" },
      { value: "Betrothal", text: "Betrothal" },
      { value: "Birthday", text: "Birthday" },
      { value: "Gettogether Ceremony", text: "Gettogether Ceremony" },
      { value: "Others", text: "Others (etc.)" }
    ]
  };

  if (cCategory && cOccasion) {
    cCategory.addEventListener('change', function() {
      const selectedCat = this.value;
      cOccasion.innerHTML = '';
      
      if (!selectedCat || !categoryOptions[selectedCat]) {
        cOccasion.disabled = true;
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Select Category First';
        cOccasion.appendChild(opt);
        return;
      }
      
      cOccasion.disabled = false;
      const optDefault = document.createElement('option');
      optDefault.value = '';
      optDefault.textContent = 'Select Occasion';
      cOccasion.appendChild(optDefault);

      categoryOptions[selectedCat].forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.text;
        cOccasion.appendChild(opt);
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     MARRIAGE & EVENT CATERING PAGE INTERACTION HANDLERS
  ───────────────────────────────────────────────────── */
  const occTrack = document.getElementById('occTrack');
  const occPrev = document.getElementById('occPrev');
  const occNext = document.getElementById('occNext');

  if (occTrack && occPrev && occNext) {
    occNext.addEventListener('click', () => { occTrack.scrollBy({ left: 220, behavior: 'smooth' }); });
    occPrev.addEventListener('click', () => { occTrack.scrollBy({ left: -220, behavior: 'smooth' }); });
  }

  // Cuisine Switcher (Veg vs Non-Veg)
  const btnVegToggle = document.getElementById('btnVegToggle');
  const btnNonVegToggle = document.getElementById('btnNonVegToggle');
  const vegMenuContent = document.getElementById('vegMenuContent');
  const nonVegMenuContent = document.getElementById('nonVegMenuContent');
  const menuSectionTitle = document.getElementById('menuSectionTitle');

  if (btnVegToggle && btnNonVegToggle) {
    btnVegToggle.addEventListener('click', () => {
      btnVegToggle.classList.add('active');
      btnNonVegToggle.classList.remove('active');
      if (vegMenuContent) vegMenuContent.style.display = 'block';
      if (nonVegMenuContent) nonVegMenuContent.style.display = 'none';
      if (menuSectionTitle) menuSectionTitle.textContent = 'Explore Our Veg Menus';
    });

    btnNonVegToggle.addEventListener('click', () => {
      btnNonVegToggle.classList.add('active');
      btnVegToggle.classList.remove('active');
      if (vegMenuContent) vegMenuContent.style.display = 'none';
      if (nonVegMenuContent) nonVegMenuContent.style.display = 'block';
      if (menuSectionTitle) menuSectionTitle.textContent = 'Explore Our Non-Veg Menus';
    });
  }

  // Meal Category Tabs
  const mealTabBtns = document.querySelectorAll('.meal-tab-btn');
  const vegCardTitle = document.getElementById('vegCardTitle');
  const vegCardSub = document.getElementById('vegCardSub');
  const menuTabPhoto = document.getElementById('menuTabPhoto');

  const mealTabData = {
    breakfast: {
      title: 'Traditional South Indian Breakfast Menu',
      sub: 'A perfect start to your special day',
      photo: 'assets/sweets_live_counter.jpg'
    },
    lunch: {
      title: 'Grand Kalyana Samayal Banana Leaf Lunch',
      sub: 'Authentic 18+ dish traditional wedding feast',
      photo: 'assets/banana_leaf_serving.jpg'
    },
    tiffin: {
      title: 'Evening Live Counters & Tiffin Menu',
      sub: 'Hot tiffin, live chaat stalls & filter coffee',
      photo: 'assets/live_kitchen.jpg'
    },
    reception: {
      title: 'Grand Wedding Reception Buffet Menu',
      sub: 'Luxury dinner buffet with welcome drinks & live stalls',
      photo: 'assets/corporate_buffet.jpg'
    },
    dinner: {
      title: 'Traditional Night Dinner Spread',
      sub: 'Light tiffin & authentic dinner items',
      photo: 'assets/wedding_feast.jpg'
    },
    special: {
      title: 'Specialty Royal Add-on Items',
      sub: 'Custom sweets, fruit stalls & mocktails',
      photo: 'assets/temple_annathanam.jpg'
    }
  };

  mealTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mealTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (mealTabData[tab]) {
        if (vegCardTitle) vegCardTitle.textContent = mealTabData[tab].title;
        if (vegCardSub) vegCardSub.textContent = mealTabData[tab].sub;
        if (menuTabPhoto) menuTabPhoto.src = mealTabData[tab].photo;
      }
    });
  });

  // Detail Quote Form Submit
  const detailQuoteForm = document.getElementById('detailQuoteForm');
  if (detailQuoteForm) {
    detailQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => (document.getElementById(id) || {}).value || '';
      const msg = `வணக்கம் JS Caterer (Jagan C),\n\nMarriage & Event Catering Quote Request:\n👤 Name: ${v('qName')}\n📞 Phone: ${v('qPhone')}\n🎉 Event Type: ${v('qEvent')}\n📅 Date: ${v('qDate')}\n👥 Guests: ${v('qGuests')}\n🍲 Cuisine: ${v('qCuisine')}\n\nPlease send custom menu options and price per plate quote!`;
      window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Services Hub Page Quote Form Submit
  const servicesPageForm = document.getElementById('servicesPageForm');
  if (servicesPageForm) {
    servicesPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => (document.getElementById(id) || {}).value || '';
      const msg = `வணக்கம் JS Caterer (Jagan C),\n\nCatering Services Proposal Request:\n👤 Name: ${v('sName')}\n📞 Phone: ${v('sPhone')}\n🏬 Category: ${v('sCategory')}\n📅 Event Date: ${v('sDate')}\n👥 Guests: ${v('sGuests')}\n🍲 Cuisine: ${v('sCuisine')}\n\nPlease send complete service details and proposal quote!`;
      window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // ----------------------------------------------------
  // GSAP-STYLE SCROLL PROGRESS BAR & REVEAL ANIMATIONS
  // ----------------------------------------------------
  let siteScrollProgressBar = document.getElementById('siteScrollProgressBar');
  if (!siteScrollProgressBar) {
    siteScrollProgressBar = document.createElement('div');
    siteScrollProgressBar.id = 'siteScrollProgressBar';
    document.body.appendChild(siteScrollProgressBar);
  }

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (siteScrollProgressBar) siteScrollProgressBar.style.width = `${scrolled}%`;
  });

  // GSAP-Style Scroll Reveal Observer for Division Cards & Guarantee Cards
  const revealElements = document.querySelectorAll('.catering-division-card, .guarantee-card, .custom-pills-card, .special-menu-card, .occ-card, .bento-card');
  revealElements.forEach(el => el.classList.add('scroll-reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});

// Smooth scroll handler with sticky header offset for jump pills
document.addEventListener('DOMContentLoaded', () => {
  const jumpPills = document.querySelectorAll('.jump-pill[href^="#"]');
  jumpPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          const headerOffset = 135;
          const elementPosition = targetElem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

/* ─────────────────────────────────────────────────────
     4-CONCEPT MENU SHOWCASE INTERACTIVE CONTROLLER
  ───────────────────────────────────────────────────── */
  const conceptTabs = document.querySelectorAll('.concept-tab-btn');
  const conceptPanels = document.querySelectorAll('.concept-view-panel');
  const btnVeg = document.getElementById('btnVegToggle');
  const btnNonVeg = document.getElementById('btnNonVegToggle');
  const mealBtns = document.querySelectorAll('#masterMealTabs .meal-tab-btn');
  const timelineSteps = document.querySelectorAll('#c2TimelineList .timeline-step');

  let curCuisine = 'veg';
  let curTab = 'breakfast';

  // Master Menu Database (Exhaustive 6 Categories for Veg & Non-Veg)
  const menuSuiteDatabase = {
    veg: {
      breakfast: {
        title: 'Traditional South Indian Veg Breakfast Spread',
        sub: 'Piping-hot authentic morning feast served on fresh banana leaves',
        photo: 'assets/sweets_live_counter.jpg',
        pax: '14+ Dishes',
        cols: [
          { heading: 'WELCOME DRINKS', icon: 'fa-glass-water', items: ['Spiced Panakam', 'Fresh Lime Mint Juice', 'Chilled Rose Milk', 'Traditional Buttermilk'] },
          { heading: 'HOT BREAKFAST MAINS', icon: 'fa-bowl-hot', items: ['Mallipoo Soft Idli', 'Mini Ghee Pongal with Cashews', 'Crispy Medu Vada', 'Poori with Potato Masala', 'Live Dosa (Masala / Plain)', 'Vegetable Rava Upma'] },
          { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Traditional Drumstick Sambar', 'Fresh Coconut Chutney', 'Spiced Tomato Chutney', 'Andhra Kara Chutney', 'Idli Podi & Pure Cow Ghee'] },
          { heading: 'SWEETS & BEVERAGES', icon: 'fa-mug-hot', items: ['Pineapple Rava Kesari', 'Elaneer Payasam', 'Kumbakonam Degree Filter Coffee', 'Hot Milk', 'Ginger Masala Tea'] }
        ]
      },
      lunch: {
        title: 'Grand Kalyana Samayal Banana Leaf Lunch (18+ Veg Items)',
        sub: 'Traditional 18+ dish authentic South Indian wedding banana leaf feast',
        photo: 'assets/banana_leaf_serving.jpg',
        pax: '18+ Dishes',
        cols: [
          { heading: 'STARTERS & SWEETS', icon: 'fa-cookie', items: ['Sweet Poli / Tirupati Laddu', 'Paruppu Payasam', 'Crispy Urad Dal Vada', 'Special Rice Appalam', 'Mavadu & Mango Pickles'] },
          { heading: 'MAIN COURSE & RICE', icon: 'fa-bowl-food', items: ['Hot Steamed Ponni Rice', 'Pure Ghee & Paruppu', 'Kalyana Drumstick Sambar', 'Poondu Vathakulambu', 'Pineapple Mysore Rasam'] },
          { heading: 'PORIYAL & KOOTU', icon: 'fa-carrot', items: ['Beans Paruppu Usili', 'Potato Kara Curry / Urulai Roast', 'Chow Chow Kootu', 'Cucumber Pachadi'] },
          { heading: 'DESSERT & FINISH', icon: 'fa-apple-whole', items: ['Thirattipal Milk Sweet', 'Fresh Thick Curd Rice', 'Ice Cream with Gulab Jamun', 'Kalyana Beeda & Banana'] }
        ]
      },
      tiffin: {
        title: 'Evening Tiffin & Live Snack Stalls Spread',
        sub: 'Hot tiffin delicacies, live chaat counters & filter coffee',
        photo: 'assets/live_kitchen.jpg',
        pax: '16+ Dishes',
        cols: [
          { heading: 'HOT TIFFIN MAINS', icon: 'fa-hotdog', items: ['Crispy Mini Rava Dosa', 'Traditional Adai with Avial', 'Idiyappam with Veg Kurma', 'Kuzhi Paniyaram with Chutney'] },
          { heading: 'LIVE CHAAT STALLS', icon: 'fa-fire-burner', items: ['Live Pani Puri Counter', 'Delhi Bhel Puri', 'Hot Samosa Ragda Chaat', 'Mumbai Pav Bhaji'] },
          { heading: 'CRISPY EVENING SNACKS', icon: 'fa-cookie-bite', items: ['Crispy Onion Pakoda', 'Thanjavur Masala Vada', 'Assorted Veg Bajji', 'Corn Cheese Balls'] },
          { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Kumbakonam Filter Coffee', 'Sukku Coffee', 'Cardamom Tea', 'Badam Milk with Saffron'] }
        ]
      },
      reception: {
        title: 'Grand Wedding Reception Multi-Cuisine Buffet',
        sub: 'Modern luxury vegetarian buffet spread with live counters',
        photo: 'assets/corporate_buffet.jpg',
        pax: '20+ Dishes',
        cols: [
          { heading: 'WELCOME MOCKTAILS', icon: 'fa-martini-glass-citrus', items: ['Blue Lagoon Sparkler', 'Watermelon Mint Punch', 'Fruit Punch', 'Virgin Mojito'] },
          { heading: 'NORTH & SOUTH BUFFET', icon: 'fa-plate-wheat', items: ['Paneer Butter Masala', 'Veg Dum Biryani with Raitha', 'Soft Butter Naan / Roti', 'Dal Makhani', 'Jeera Pulao'] },
          { heading: 'LIVE COOKING STALLS', icon: 'fa-fire-burner', items: ['Live Penne Pasta Counter', 'Live Dosa Stall', 'Live Hakka Noodles', 'South Indian Tiffin Counter'] },
          { heading: 'LUXURY DESSERT BAR', icon: 'fa-ice-cream', items: ['Saffron Rasgulla', 'Hot Gulab Jamun with Ice Cream', 'Chocolate Brownie Fudge', 'Fresh Fruit Bowl'] }
        ]
      },
      dinner: {
        title: 'Traditional Night Dinner Menu Spread',
        sub: 'Comforting, light night dinner items served fresh and hot',
        photo: 'assets/wedding_feast.jpg',
        pax: '14+ Dishes',
        cols: [
          { heading: 'DINNER TIFFIN', icon: 'fa-bowl-food', items: ['Ghee Soft Chapathi', 'Mixed Vegetable Kurma', 'Ghee Paper Dosa', 'Onion Tomato Uthappam'] },
          { heading: 'VARIETY RICE SELECTION', icon: 'fa-rice', items: ['Spiced Tomato Rice', 'Seasoned Curd Rice', 'Tangy Lemon Rice', 'Hot Sambar Rice with Chips'] },
          { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Coconut Chutney', 'Tomato Kara Chutney', 'Potato Chips & Fryums', 'More Milagai Pickles'] },
          { heading: 'SWEETS & BEVERAGES', icon: 'fa-mug-hot', items: ['Hot Wheat Halwa', 'Saffron Badam Milk', 'Filter Coffee', 'Fresh Banana'] }
        ]
      },
      special: {
        title: 'Royal Chef Signature Special Items',
        sub: 'Exclusive wedding specials handcrafted by master sweet chefs',
        photo: 'assets/temple_annathanam.jpg',
        pax: '16+ Specials',
        cols: [
          { heading: 'SIGNATURE SWEETS', icon: 'fa-crown', items: ['Tender Coconut Elaneer Payasam', 'Srivilliputhur Palkova', 'Kashi Halwa (Ash Gourd)', 'Basundi with Almond Flakes'] },
          { heading: 'LIVE SWEET COUNTERS', icon: 'fa-fire-burner', items: ['Live Hot Jalebi with Rabri', 'Live Malpua Counter', 'Live Ice Cream Roll Machine', 'Matka Kulfi'] },
          { heading: 'ROYAL DRINKS', icon: 'fa-glass-water', items: ['Spiced Panakam with Honey', 'Nannari Sharbat', 'Madurai Jigarthanda Live', 'Tender Coconut Water'] },
          { heading: 'ROYAL FINISH', icon: 'fa-leaf', items: ['Kalyana Meenakshi Beeda', 'Premium Dry Fruit Box', 'Rose Water Spray Welcome', 'Fruit Basket'] }
        ]
      }
    },
    nonveg: {
      breakfast: {
        title: 'Non-Veg Special Morning Breakfast Spread',
        sub: 'Authentic Chettinad & Malabar non-veg morning delicacies',
        photo: 'assets/live_kitchen.jpg',
        pax: '14+ Dishes',
        cols: [
          { heading: 'NON-VEG BREAKFAST MAINS', icon: 'fa-drumstick-bite', items: ['Egg Roast Kal Dosa', 'Mutton Paya with Appam', 'Chicken Pepper Dosa', 'Mallipoo Idli with Meen Gravy'] },
          { heading: 'CURRIES & GRAVIES', icon: 'fa-bowl-hot', items: ['Chettinad Country Chicken Curry', 'Mutton Salna Gravy', 'Egg Thokku', 'Fish Gravy'] },
          { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Coconut Chutney', 'Kara Chutney', 'Vegetable Sambar', 'Pure Cow Ghee'] },
          { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Kumbakonam Filter Coffee', 'Cardamom Tea', 'Hot Milk'] }
        ]
      },
      lunch: {
        title: 'Grand Non-Veg Marriage Feast (Seeraga Samba Biryani)',
        sub: 'Seeraga Samba Mutton Biryani feast prepared in authentic copper cauldrons',
        photo: 'assets/wedding_feast.jpg',
        pax: '16+ Dishes',
        cols: [
          { heading: 'STARTERS & FRY', icon: 'fa-drumstick-bite', items: ['Crispy Chicken 65', 'Mutton Chukka Roast', 'Vanjaram Fish Tawa Fry', 'Spiced Egg Bonda'] },
          { heading: 'BIRYANI & MAIN COURSE', icon: 'fa-bowl-food', items: ['Seeraga Samba Mutton Biryani', 'Basmati Chicken Biryani', 'Chicken Chettinad Gravy', 'Malabar Parotta'] },
          { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Onion Cucumber Raitha', 'Traditional Brinjal Dalcha', 'Boiled Pepper Egg', 'Mutton Gravy Salna'] },
          { heading: 'DESSERTS & FINISH', icon: 'fa-ice-cream', items: ['Hot Gulab Jamun', 'Matka Kulfi', 'Vanilla Ice Cream', 'Sweet Beeda & Fruit'] }
        ]
      },
      tiffin: {
        title: 'Non-Veg Evening Tiffin & Live Grill Counter',
        sub: 'Hot spicy chicken, fish fry live stalls, and Kothu Parotta',
        photo: 'assets/live_kitchen.jpg',
        pax: '14+ Dishes',
        cols: [
          { heading: 'LIVE FRY STALLS', icon: 'fa-fire-burner', items: ['Live Vanjaram Fish Fry', 'Crispy Chicken Lollipop', 'Mutton Kola Urundai', 'Prawn Pepper Fry'] },
          { heading: 'HOT TIFFIN SPECIALS', icon: 'fa-hotdog', items: ['Chicken Kothu Parotta', 'Madurai Kari Dosa', 'Spicy Egg Roll', 'Chicken Stuff Naan'] },
          { heading: 'CRISPY SNACKS', icon: 'fa-cookie-bite', items: ['Chicken Cutlet', 'Egg Puff', 'Mini Chicken Samosa', 'Fish Cutlet'] },
          { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Filter Coffee', 'Masala Chai', 'Chilled Drinks'] }
        ]
      },
      reception: {
        title: 'Grand Non-Veg Reception Gala Dinner Buffet',
        sub: 'Luxury international non-veg buffet spread with live BBQ & grills',
        photo: 'assets/corporate_buffet.jpg',
        pax: '20+ Dishes',
        cols: [
          { heading: 'LIVE BBQ & GRILL', icon: 'fa-fire-burner', items: ['Tandoori Chicken', 'Chicken Malai Tikka', 'Fish Tikka', 'Mutton Sheekh Kebab'] },
          { heading: 'BUFFET MAIN SPREAD', icon: 'fa-plate-wheat', items: ['Royal Mutton Biryani', 'Butter Chicken Masala', 'Butter Naan / Roti', 'Prawn Masala Curry'] },
          { heading: 'SEAFOOD SPECIALS', icon: 'fa-fish', items: ['Crab Gravy Curry', 'Vanjaram Tawa Fish Fry', 'Nethili Pepper Fry', 'Prawn Dum Biryani'] },
          { heading: 'DESSERT BAR', icon: 'fa-ice-cream', items: ['Chocolate Brownie with Ice Cream', 'Matka Kulfi', 'Fruit Salad with Cream', 'Beeda'] }
        ]
      },
      dinner: {
        title: 'Traditional Night Non-Veg Dinner Spread',
        sub: 'Comforting non-veg dinner items served with idiyappam, dosa & curries',
        photo: 'assets/banana_leaf_serving.jpg',
        pax: '14+ Dishes',
        cols: [
          { heading: 'HOT DINNER MAINS', icon: 'fa-bowl-food', items: ['Soft Idli with Mutton Gravy', 'Idiyappam with Chicken Stew', 'Spicy Egg Dosa', 'Malabar Parotta'] },
          { heading: 'GRAVIES & CURRIES', icon: 'fa-pepper-hot', items: ['Chicken Pepper Gravy', 'Mutton Chukka Salna', 'Egg Thokku Gravy', 'Fish Curry'] },
          { heading: 'RICE VARIETIES', icon: 'fa-rice', items: ['Chicken Fried Rice', 'Egg Fried Rice', 'Thick Curd Rice with Pickle'] },
          { heading: 'SWEETS & MILK', icon: 'fa-apple-whole', items: ['Hot Badam Milk', 'Vanilla Ice Cream', 'Fresh Banana'] }
        ]
      },
      special: {
        title: 'Non-Veg Chef Signature Delicacies',
        sub: 'Exclusive royal Chettinad & Malabar signature dishes for special events',
        photo: 'assets/temple_annathanam.jpg',
        pax: '16+ Specials',
        cols: [
          { heading: 'CHEF SIGNATURE MAINS', icon: 'fa-crown', items: ['Nattu Kozhi Soup (Country Chicken)', 'Mutton Nalli Fry (Marrow Roast)', 'Turkey Roast', 'Rabbit Chukka Roast'] },
          { heading: 'SEAFOOD EXTRAORDINARY', icon: 'fa-fish', items: ['Whole Tawa Fish Roast', 'Lobster Masala Fry', 'Squid Pepper Fry', 'Jumbo Prawn Curry'] },
          { heading: 'ROYAL DESSERTS', icon: 'fa-ice-cream', items: ['Elaneer Payasam', 'Dry Fruit Halwa', 'Live Ice Cream Roll', 'Matka Kulfi'] },
          { heading: 'FINISHING TOUCH', icon: 'fa-leaf', items: ['Special Royal Sweet Beeda', 'Fresh Fruit Basket', 'Rose Water Welcome'] }
        ]
      }
    }
  };

  function updateAll4Concepts() {
    const data = menuSuiteDatabase[curCuisine][curTab];
    if (!data) return;

    // 1. UPDATE CONCEPT 1: ROYAL BANQUET MAGAZINE
    const c1Title = document.getElementById('c1Title');
    const c1Sub = document.getElementById('c1Sub');
    const c1Photo = document.getElementById('c1Photo');
    const c1ItemCount = document.getElementById('c1ItemCount');
    const c1BentoGrid = document.getElementById('c1BentoGrid');

    if (c1Title) c1Title.textContent = data.title;
    if (c1Sub) c1Sub.textContent = data.sub;
    if (c1Photo && data.photo) c1Photo.src = data.photo;
    if (c1ItemCount) c1ItemCount.textContent = data.pax;

    if (c1BentoGrid) {
      c1BentoGrid.innerHTML = '';
      data.cols.forEach(col => {
        const card = document.createElement('div');
        card.className = 'mag-bento-card';
        card.innerHTML = '<h4>' + col.heading + ' <i class="fa-solid ' + col.icon + ' text-gold"></i></h4>' +
          '<ul>' + col.items.map(item => '<li><i class="fa-solid fa-circle"></i> ' + item + '</li>').join('') + '</ul>';
        c1BentoGrid.appendChild(card);
      });
    }

    // 2. UPDATE CONCEPT 2: SPLIT-SCREEN CHEF STUDIO
    const c2Title = document.getElementById('c2Title');
    const c2Sub = document.getElementById('c2Sub');
    const c2HeroPhoto = document.getElementById('c2HeroPhoto');
    const c2CoursesGrid = document.getElementById('c2CoursesGrid');

    if (c2Title) c2Title.textContent = data.title;
    if (c2Sub) c2Sub.textContent = data.sub;
    if (c2HeroPhoto && data.photo) c2HeroPhoto.src = data.photo;

    if (c2CoursesGrid) {
      c2CoursesGrid.innerHTML = '';
      data.cols.forEach(col => {
        const card = document.createElement('div');
        card.className = 'mag-bento-card';
        card.innerHTML = '<h4>' + col.heading + ' <i class="fa-solid ' + col.icon + ' text-gold"></i></h4>' +
          '<ul>' + col.items.map(item => '<li><i class="fa-solid fa-circle"></i> ' + item + '</li>').join('') + '</ul>';
        c2CoursesGrid.appendChild(card);
      });
    }

    // 3. UPDATE CONCEPT 3: VISUAL BANANA LEAF THALI
    const c3Title = document.getElementById('c3Title');
    const c3Sub = document.getElementById('c3Sub');
    const c3ThaliDeck = document.getElementById('c3ThaliDeck');

    if (c3Title) c3Title.textContent = data.title;
    if (c3Sub) c3Sub.textContent = data.sub;

    if (c3ThaliDeck) {
      c3ThaliDeck.innerHTML = '';
      data.cols.forEach(col => {
        const cluster = document.createElement('div');
        cluster.className = 'thali-cluster-box';
        cluster.innerHTML = '<h5><i class="fa-solid ' + col.icon + '"></i> ' + col.heading + '</h5>' +
          '<ul>' + col.items.map(item => '<li><i class="fa-solid fa-leaf text-success"></i> ' + item + '</li>').join('') + '</ul>';
        c3ThaliDeck.appendChild(cluster);
      });
    }

    // 4. UPDATE CONCEPT 4: MODERN LUXURY BENTO DECK
    const c4Title = document.getElementById('c4Title');
    const c4BentoDeckGrid = document.getElementById('c4BentoDeckGrid');

    if (c4Title) c4Title.textContent = data.title;

    if (c4BentoDeckGrid) {
      c4BentoDeckGrid.innerHTML = '';
      data.cols.forEach(col => {
        const card = document.createElement('div');
        card.className = 'bento-dish-card';
        card.innerHTML = '<h4><i class="fa-solid ' + col.icon + ' text-gold"></i> ' + col.heading + '</h4>' +
          '<div class="bento-chip-list">' + col.items.map(item => '<span class="bento-dish-chip">' + item + '</span>').join('') + '</div>';
        c4BentoDeckGrid.appendChild(card);
      });
    }
  }

  // Concept View Tabs Switcher Event
  conceptTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      conceptTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const conceptId = btn.getAttribute('data-concept');

      conceptPanels.forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
      });

      if (conceptId === 'c1') {
        const p = document.getElementById('viewConcept1');
        if (p) { p.style.display = 'block'; p.classList.add('active'); }
      } else if (conceptId === 'c2') {
        const p = document.getElementById('viewConcept2');
        if (p) { p.style.display = 'block'; p.classList.add('active'); }
      } else if (conceptId === 'c3') {
        const p = document.getElementById('viewConcept3');
        if (p) { p.style.display = 'block'; p.classList.add('active'); }
      } else if (conceptId === 'c4') {
        const p = document.getElementById('viewConcept4');
        if (p) { p.style.display = 'block'; p.classList.add('active'); }
      }
    });
  });

  // Master Cuisine Switcher
  if (btnVeg && btnNonVeg) {
    btnVeg.addEventListener('click', () => {
      btnVeg.classList.add('active');
      btnNonVeg.classList.remove('active');
      curCuisine = 'veg';
      updateAll4Concepts();
    });

    btnNonVeg.addEventListener('click', () => {
      btnNonVeg.classList.add('active');
      btnVeg.classList.remove('active');
      curCuisine = 'nonveg';
      updateAll4Concepts();
    });
  }

  // Master Meal Tabs
  mealBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mealBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      curTab = btn.getAttribute('data-tab') || 'breakfast';

      // Sync Concept 2 timeline
      timelineSteps.forEach(step => {
        if (step.getAttribute('data-tab') === curTab) step.classList.add('active');
        else step.classList.remove('active');
      });

      updateAll4Concepts();
    });
  });

  // Concept 2 Timeline Steps click
  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      const tab = step.getAttribute('data-tab');
      mealBtns.forEach(b => {
        if (b.getAttribute('data-tab') === tab) b.classList.add('active');
        else b.classList.remove('active');
      });
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      curTab = tab || 'breakfast';
      updateAll4Concepts();
    });
  });

  // Concept 1 WhatsApp button
  const btnC1WhatsApp = document.getElementById('btnC1WhatsApp');
  if (btnC1WhatsApp) {
    btnC1WhatsApp.addEventListener('click', () => {
      const data = menuSuiteDatabase[curCuisine][curTab];
      const text = encodeURIComponent('Hello JS Caterer (Jagan C)! I am interested in booking the ' + data.title + ' (' + data.pax + '). Please send customized pricing!');
      window.open('https://wa.me/919940649939?text=' + text, '_blank');
    });
  }

  // Initial Execution
  updateAll4Concepts();
