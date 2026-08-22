// JS CATERER — Master Script v3
// Hero Slideshow · Drag Carousel · Scroll Story · Calculator · Area Chips · Storyboard

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     0. MOBILE DRAWER NAVIGATION & MENU TOGGLE (INSTANT ZERO-FLASH)
  ───────────────────────────────────────────────────── */
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .btn-gold-mobile');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.style.visibility = 'visible';
    mobileNavDrawer.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    mobileNavDrawer.classList.add('is-open');
    if (mobileToggleBtn) mobileToggleBtn.classList.add('is-active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('is-active');
    document.body.classList.add('menu-open');

    if (window.gsap) {
      gsap.fromTo(mobileNavItems, 
        { x: 25, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.08 }
      );
    }
  }

  function closeMobileMenu(instant = false) {
    if (!mobileNavDrawer) return;
    
    if (instant) {
      // Instant dismissal with zero transition for immediate page navigation
      mobileNavDrawer.style.transition = 'none';
      mobileNavDrawer.classList.remove('is-open');
      mobileNavDrawer.style.visibility = 'hidden';
    } else {
      mobileNavDrawer.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      mobileNavDrawer.classList.remove('is-open');
      setTimeout(() => {
        if (!mobileNavDrawer.classList.contains('is-open')) {
          mobileNavDrawer.style.visibility = 'hidden';
        }
      }, 300);
    }

    if (mobileToggleBtn) mobileToggleBtn.classList.remove('is-active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', () => closeMobileMenu());
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', () => closeMobileMenu());

  // Instant dismissal on navigation link click to prevent page-load flash
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      closeMobileMenu(true);
    });
  });

  // Ensure menu is closed when navigating via browser back/forward cache (bfcache)
  window.addEventListener('pageshow', () => {
    closeMobileMenu(true);
  });

  // Ensure menu is closed before page unloads
  window.addEventListener('beforeunload', () => {
    closeMobileMenu(true);
  });

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
  // MASTER 3-WAY EXPERIENCE SWITCHER
  // ----------------------------------------------------
  window.switchMasterExperience = function(expId) {
    const exp1 = document.getElementById('masterExp1');
    const exp2 = document.getElementById('masterExp2');
    const exp3 = document.getElementById('masterExp3');
    const btns = document.querySelectorAll('.exp-switch-btn');

    btns.forEach(b => b.classList.remove('active'));

    if (expId === 'exp1') {
      if (exp1) exp1.classList.add('active');
      if (exp2) exp2.classList.remove('active');
      if (exp3) exp3.classList.remove('active');
      if (btns[0]) btns[0].classList.add('active');
      setTimeout(initKitchen3DCanvas, 100);
    } else if (expId === 'exp2') {
      if (exp1) exp1.classList.remove('active');
      if (exp2) exp2.classList.add('active');
      if (exp3) exp3.classList.remove('active');
      if (btns[1]) btns[1].classList.add('active');
    } else if (expId === 'exp3') {
      if (exp1) exp1.classList.remove('active');
      if (exp2) exp2.classList.remove('active');
      if (exp3) exp3.classList.add('active');
      if (btns[2]) btns[2].classList.add('active');
    }
  };

  // EXPERIENCE 1: 3D Virtual Kitchen Controller
  const selectedStations = new Set(['station1', 'station2']);

  window.interactStation = function(stationId, stationName) {
    const card = document.querySelector(`.station-3d-card[data-station="${stationId}"]`);
    if (selectedStations.has(stationId)) {
      if (selectedStations.size > 1) {
        selectedStations.delete(stationId);
        if (card) {
          card.classList.remove('active');
          const btnSpan = card.querySelector('.station-action-btn span');
          const btnIcon = card.querySelector('.station-action-btn i');
          if (btnSpan) btnSpan.textContent = 'Add to Feast Tray';
          if (btnIcon) { btnIcon.className = 'fa-solid fa-plus-circle text-gold'; }
        }
      }
    } else {
      selectedStations.add(stationId);
      if (card) {
        card.classList.add('active');
        const btnSpan = card.querySelector('.station-action-btn span');
        const btnIcon = card.querySelector('.station-action-btn i');
        if (btnSpan) btnSpan.textContent = 'Added to Feast Tray';
        if (btnIcon) { btnIcon.className = 'fa-solid fa-circle-check text-green'; }
      }
    }
    updateTrayDisplay();
  };

  function updateTrayDisplay() {
    const countEl = document.getElementById('trayItemCount');
    const container = document.getElementById('trayPillsContainer');
    if (countEl) countEl.textContent = `${selectedStations.size} Kitchen Zones Selected`;

    if (container) {
      container.innerHTML = '';
      const names = {
        station1: '🍲 Cauldron Zone',
        station2: '🌿 Leaf Assembly',
        station3: '🍧 Live Kulfi Counter',
        station4: '📦 CPU Bento Packing'
      };
      selectedStations.forEach(id => {
        const pill = document.createElement('span');
        pill.className = 'tray-item-pill active';
        pill.textContent = names[id] || id;
        container.appendChild(pill);
      });
    }
  }

  // 3D Mouse Parallax Tilt
  const metaverseWrap = document.getElementById('kitchenMetaverseWrap');
  if (metaverseWrap) {
    metaverseWrap.addEventListener('mousemove', (e) => {
      const rect = metaverseWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const grid = document.getElementById('kitchenStationsGrid');
      if (grid) {
        grid.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      }
    });

    metaverseWrap.addEventListener('mouseleave', () => {
      const grid = document.getElementById('kitchenStationsGrid');
      if (grid) grid.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  // Three.js Ambient Particle WebGL Scene
  function initKitchen3DCanvas() {
    const canvas = document.getElementById('kitchen3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 80;

    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color('#E8C84D');
    const amberColor = new THREE.Color('#FF9500');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 160;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const c = Math.random() > 0.5 ? goldColor : amberColor;
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;

      const pos = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] += 0.08;
        if (pos[i] > 50) pos[i] = -50;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      if (canvas && canvas.clientWidth > 0) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }
    });
  }

  setTimeout(initKitchen3DCanvas, 400);

  window.launch3dKitchenWhatsApp = function() {
    const guests = document.getElementById('gameHeadcount') ? document.getElementById('gameHeadcount').value : '150 – 300 Guests';
    const date = document.getElementById('gameEventDate') ? document.getElementById('gameEventDate').value : '';
    const contact = document.getElementById('gameContact') ? document.getElementById('gameContact').value.trim() : '';

    const zoneNames = {
      station1: '🍲 Dum Biryani & Cauldron Zone',
      station2: '🌿 Traditional Banana Leaf VIP Plating',
      station3: '🍧 Live Matka Kulfi & Hot Sweets Counter',
      station4: '📦 FSSAI Certified Bento Packaging'
    };

    const selectedList = Array.from(selectedStations).map(id => `• ${zoneNames[id] || id}`).join('\n');

    let msg = `வணக்கம் Chef Jagan C (JS Caterer),\n\nI have explored your 3D Virtual Kitchen and curated my feast itinerary:\n\n🎮 Selected Kitchen Zones:\n${selectedList}\n\n👥 Guest Strength: ${guests}`;
    if (date) msg += `\n📅 Auspicious Event Date: ${date}`;
    if (contact) msg += `\n👤 Client Info: ${contact}`;
    msg += `\n\nPlease share the customized menu quotation and booking confirmation!`;

    window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // EXPERIENCE 2: Animated Multi-Step Concierge Controller
  let conciergeState = {
    step: 1,
    occasion: 'Marriage & Event Feast',
    guests: '150 – 300 Guests',
    date: '',
    cuisine: 'Pure Vegetarian Feast'
  };

  window.goToStep = function(stepNum) {
    conciergeState.step = stepNum;
    document.querySelectorAll('.concierge-step-container').forEach(el => el.classList.remove('active'));
    const targetStep = document.getElementById(`conciergeStep${stepNum}`);
    if (targetStep) targetStep.classList.add('active');

    const bar = document.getElementById('studioProgressBar');
    if (bar) {
      const pct = stepNum === 1 ? 25 : stepNum === 2 ? 50 : stepNum === 3 ? 75 : 100;
      bar.style.width = `${pct}%`;
    }

    for (let i = 1; i <= 4; i++) {
      const pill = document.getElementById(`stepPill${i}`);
      if (pill) {
        if (i <= stepNum) pill.classList.add('active');
        else pill.classList.remove('active');
      }
    }
  };

  window.selectOccasionCard = function(cardEl, occasionName) {
    document.querySelectorAll('.occasion-select-card').forEach(c => c.classList.remove('active'));
    cardEl.classList.add('active');
    conciergeState.occasion = occasionName;
    const summaryOccasion = document.getElementById('summaryOccasion');
    if (summaryOccasion) summaryOccasion.textContent = occasionName;
  };

  window.selectGuestPill = function(pillEl, guestRange) {
    document.querySelectorAll('.guest-pill').forEach(p => p.classList.remove('active'));
    pillEl.classList.add('active');
    conciergeState.guests = guestRange;
    const summaryGuests = document.getElementById('summaryGuests');
    if (summaryGuests) summaryGuests.textContent = guestRange;
  };

  window.selectCuisineCard = function(cardEl, cuisineName) {
    document.querySelectorAll('.cuisine-option-card').forEach(c => c.classList.remove('active'));
    cardEl.classList.add('active');
    conciergeState.cuisine = cuisineName;
    const summaryCuisine = document.getElementById('summaryCuisine');
    if (summaryCuisine) summaryCuisine.textContent = cuisineName;
  };

  window.updateLiveSummary = function() {
    const dateInput = document.getElementById('conciergeEventDate');
    if (dateInput) conciergeState.date = dateInput.value;
  };

  window.handleConciergeSubmit = function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('conciergeUserName');
    const phoneInput = document.getElementById('conciergeUserPhone');
    const notesInput = document.getElementById('conciergeUserNotes');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';
    const date = conciergeState.date;

    let msg = `வணக்கம் Chef Jagan C (JS Caterer),\n\nCustom Catering Inquiry (Concierge Builder):\n🎯 Occasion: ${conciergeState.occasion}\n👥 Guest Strength: ${conciergeState.guests}\n🍲 Cuisine Preference: ${conciergeState.cuisine}`;
    if (date) msg += `\n📅 Auspicious Date: ${date}`;
    if (name) msg += `\n👤 Name: ${name}`;
    if (phone) msg += `\n📞 WhatsApp: ${phone}`;
    if (notes) msg += `\n📍 Locality / Notes: ${notes}`;
    msg += `\n\nPlease share menu package options and quote!`;

    window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // EXPERIENCE 3: Bento Grid Form Controller
  let bentoSelectedService = 'Marriage & Event Catering';
  const bentoChips = document.querySelectorAll('.bento-chip');
  bentoChips.forEach(chip => {
    chip.addEventListener('click', () => {
      bentoChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      bentoSelectedService = chip.getAttribute('data-service') || 'Marriage & Event Catering';
    });
  });

  const bentoBookingForm = document.getElementById('bentoBookingForm');
  if (bentoBookingForm) {
    bentoBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      const name = v('bName');
      const phone = v('bPhone');
      const date = v('bDate');
      const guests = v('bGuests');
      const notes = v('bNotes');

      let msg = `வணக்கம் Chef Jagan C (JS Caterer),\n\nBento Fast Quote Request:\n🎯 Service: ${bentoSelectedService}\n👤 Name: ${name}\n📞 WhatsApp: ${phone}\n👥 Guests: ${guests}`;
      if (date) msg += `\n📅 Event Date: ${date}`;
      if (notes) msg += `\n📍 Notes / Locality: ${notes}`;
      msg += `\n\nPlease send package options and quote!`;

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
   FINALIZED SPLIT-SCREEN CHEF STUDIO CONTROLLER (CONCEPT 2)
───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btnVegStudio = document.getElementById('btnVegToggle');
  const btnNonVegStudio = document.getElementById('btnNonVegToggle');
  const studioTimelineSteps = document.querySelectorAll('#studioTimelineList .timeline-step');
  const studioHeroPhoto = document.getElementById('studioHeroPhoto');
  const studioTitle = document.getElementById('studioTitle');
  const studioSub = document.getElementById('studioSub');
  const studioCoursesGrid = document.getElementById('studioCoursesGrid');
  const btnStudioWhatsApp = document.getElementById('btnStudioWhatsApp');

  if (!studioCoursesGrid) return; // Only execute if studio stage exists on current page

  let curCuisineStudio = 'veg';
  let curTabStudio = 'breakfast';

  const studioSectionEl = document.getElementById('menuStudioSection');
  const serviceType = studioSectionEl ? (studioSectionEl.getAttribute('data-service-type') || 'marriage') : 'marriage';

  const multiServiceDatabases = {
    marriage: {
      veg: {
        breakfast: {
          title: 'South Indian Morning Breakfast',
          sub: 'Piping-hot morning feast served fresh on clean banana leaves',
          badge: 'PURE GHEE & STEAM FRESH',
          cols: [
            { heading: 'WELCOME DRINKS', icon: 'fa-glass-water', items: ['Spiced Panakam', 'Fresh Lime Mint Juice', 'Chilled Rose Milk', 'Traditional Buttermilk'] },
            { heading: 'HOT BREAKFAST MAINS', icon: 'fa-bowl-hot', items: ['Mallipoo Soft Idli', 'Mini Ghee Pongal with Cashews', 'Crispy Medu Vada', 'Poori with Potato Masala', 'Live Dosa (Masala / Plain)', 'Vegetable Rava Upma'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Traditional Drumstick Sambar', 'Fresh Coconut Chutney', 'Spiced Tomato Chutney', 'Andhra Kara Chutney', 'Idli Podi & Pure Cow Ghee'] },
            { heading: 'SWEETS & BEVERAGES', icon: 'fa-mug-hot', items: ['Pineapple Rava Kesari', 'Elaneer Payasam', 'Kumbakonam Degree Filter Coffee', 'Hot Milk', 'Ginger Masala Tea'] }
          ]
        },
        lunch: {
          title: 'Grand Kalyana Leaf Feast (18+ Items)',
          sub: 'Traditional 18+ dish authentic South Indian wedding banana leaf feast',
          badge: 'BANANA LEAF TRADITION',
          cols: [
            { heading: 'STARTERS & SWEETS', icon: 'fa-cookie', items: ['Sweet Poli / Tirupati Laddu', 'Paruppu Payasam', 'Crispy Urad Dal Vada', 'Special Rice Appalam', 'Mavadu & Mango Pickles'] },
            { heading: 'MAIN COURSE & RICE', icon: 'fa-bowl-food', items: ['Hot Steamed Ponni Rice', 'Pure Ghee & Paruppu', 'Kalyana Drumstick Sambar', 'Poondu Vathakulambu', 'Pineapple Mysore Rasam'] },
            { heading: 'PORIYAL & KOOTU', icon: 'fa-carrot', items: ['Beans Paruppu Usili', 'Potato Kara Curry / Urulai Roast', 'Chow Chow Kootu', 'Cucumber Pachadi'] },
            { heading: 'DESSERT & FINISH', icon: 'fa-apple-whole', items: ['Thirattipal Milk Sweet', 'Fresh Thick Curd Rice', 'Ice Cream with Gulab Jamun', 'Kalyana Beeda & Banana'] }
          ]
        },
        tiffin: {
          title: 'Evening Tiffin & Live Chaat',
          sub: 'Hot tiffin delicacies, live chaat counters & filter coffee',
          badge: 'LIVE COOKING STALLS',
          cols: [
            { heading: 'HOT TIFFIN MAINS', icon: 'fa-hotdog', items: ['Crispy Mini Rava Dosa', 'Traditional Adai with Avial', 'Idiyappam with Veg Kurma', 'Kuzhi Paniyaram with Chutney'] },
            { heading: 'LIVE CHAAT STALLS', icon: 'fa-fire-burner', items: ['Live Pani Puri Counter', 'Delhi Bhel Puri', 'Hot Samosa Ragda Chaat', 'Mumbai Pav Bhaji'] },
            { heading: 'CRISPY EVENING SNACKS', icon: 'fa-cookie-bite', items: ['Crispy Onion Pakoda', 'Thanjavur Masala Vada', 'Assorted Veg Bajji', 'Corn Cheese Balls'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Kumbakonam Filter Coffee', 'Sukku Coffee', 'Cardamom Tea', 'Badam Milk with Saffron'] }
          ]
        },
        reception: {
          title: 'Grand Reception Gala Buffet',
          sub: 'Modern luxury vegetarian buffet spread with live counters & dessert bar',
          badge: 'ROYAL GALA BUFFET',
          cols: [
            { heading: 'WELCOME MOCKTAILS', icon: 'fa-martini-glass-citrus', items: ['Blue Lagoon Sparkler', 'Watermelon Mint Punch', 'Fruit Punch', 'Virgin Mojito'] },
            { heading: 'NORTH & SOUTH BUFFET', icon: 'fa-plate-wheat', items: ['Paneer Butter Masala', 'Veg Dum Biryani with Raitha', 'Soft Butter Naan / Roti', 'Dal Makhani', 'Jeera Pulao'] },
            { heading: 'LIVE COOKING STALLS', icon: 'fa-fire-burner', items: ['Live Penne Pasta Counter', 'Live Dosa Stall', 'Live Hakka Noodles', 'South Indian Tiffin Counter'] },
            { heading: 'LUXURY DESSERT BAR', icon: 'fa-ice-cream', items: ['Saffron Rasgulla', 'Hot Gulab Jamun with Ice Cream', 'Chocolate Brownie Fudge', 'Fresh Fruit Bowl'] }
          ]
        },
        dinner: {
          title: 'Traditional Wedding Night Dinner',
          sub: 'Comforting, light supper with ghee tiffin, variety rice & gravies',
          badge: 'WEDDING EVE SUPPER',
          cols: [
            { heading: 'DINNER TIFFIN', icon: 'fa-bowl-food', items: ['Ghee Soft Chapathi', 'Mixed Vegetable Kurma', 'Ghee Paper Dosa', 'Onion Tomato Uthappam'] },
            { heading: 'VARIETY RICE SELECTION', icon: 'fa-rice', items: ['Spiced Tomato Rice', 'Seasoned Curd Rice', 'Tangy Lemon Rice', 'Hot Sambar Rice with Chips'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Coconut Chutney', 'Tomato Kara Chutney', 'Potato Chips & Fryums', 'More Milagai Pickles'] },
            { heading: 'SWEETS & BEVERAGES', icon: 'fa-mug-hot', items: ['Hot Wheat Halwa', 'Saffron Badam Milk', 'Filter Coffee', 'Fresh Banana'] }
          ]
        },
        special: {
          title: 'Royal Signature Chef Specials',
          sub: 'Exclusive wedding specials handcrafted by master sweet chefs',
          badge: 'CHEF MASTERPIECES',
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
          title: 'Chettinad Morning Breakfast',
          sub: 'Authentic Chettinad & Malabar morning non-veg delicacies',
          badge: 'CHETTINAD SPECIALS',
          cols: [
            { heading: 'NON-VEG BREAKFAST MAINS', icon: 'fa-drumstick-bite', items: ['Egg Roast Kal Dosa', 'Mutton Paya with Appam', 'Chicken Pepper Dosa', 'Mallipoo Idli with Meen Gravy'] },
            { heading: 'CURRIES & GRAVIES', icon: 'fa-bowl-hot', items: ['Chettinad Country Chicken Curry', 'Mutton Salna Gravy', 'Egg Thokku', 'Fish Gravy'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Coconut Chutney', 'Kara Chutney', 'Vegetable Sambar', 'Pure Cow Ghee'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Kumbakonam Filter Coffee', 'Cardamom Tea', 'Hot Milk'] }
          ]
        },
        lunch: {
          title: 'Seeraga Samba Mutton Biryani Feast',
          sub: 'Grand mutton biryani feast prepared in authentic copper cauldrons',
          badge: 'COPPER CAULDRON BIRYANI',
          cols: [
            { heading: 'STARTERS & FRY', icon: 'fa-drumstick-bite', items: ['Crispy Chicken 65', 'Mutton Chukka Roast', 'Vanjaram Fish Tawa Fry', 'Spiced Egg Bonda'] },
            { heading: 'BIRYANI & MAIN COURSE', icon: 'fa-bowl-food', items: ['Seeraga Samba Mutton Biryani', 'Basmati Chicken Biryani', 'Chicken Chettinad Gravy', 'Malabar Parotta'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Onion Cucumber Raitha', 'Traditional Brinjal Dalcha', 'Boiled Pepper Egg', 'Mutton Gravy Salna'] },
            { heading: 'DESSERTS & FINISH', icon: 'fa-ice-cream', items: ['Hot Gulab Jamun', 'Matka Kulfi', 'Vanilla Ice Cream', 'Sweet Beeda & Fruit'] }
          ]
        },
        tiffin: {
          title: 'Evening Tiffin & Live Seafood Grill',
          sub: 'Hot spicy chicken, tawa fish fry stalls & Madurai Kothu Parotta',
          badge: 'LIVE TAWA & SEAFOOD',
          cols: [
            { heading: 'LIVE FRY STALLS', icon: 'fa-fire-burner', items: ['Live Vanjaram Fish Fry', 'Crispy Chicken Lollipop', 'Mutton Kola Urundai', 'Prawn Pepper Fry'] },
            { heading: 'HOT TIFFIN SPECIALS', icon: 'fa-hotdog', items: ['Chicken Kothu Parotta', 'Madurai Kari Dosa', 'Spicy Egg Roll', 'Chicken Stuff Naan'] },
            { heading: 'CRISPY SNACKS', icon: 'fa-cookie-bite', items: ['Chicken Cutlet', 'Egg Puff', 'Mini Chicken Samosa', 'Fish Cutlet'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Filter Coffee', 'Masala Chai', 'Chilled Drinks'] }
          ]
        },
        reception: {
          title: 'Grand Reception Non-Veg Gala Buffet',
          sub: 'Luxury international non-veg buffet spread with live BBQ & grills',
          badge: 'LIVE TANDOORI BBQ',
          cols: [
            { heading: 'LIVE BBQ & GRILL', icon: 'fa-fire-burner', items: ['Tandoori Chicken', 'Chicken Malai Tikka', 'Fish Tikka', 'Mutton Sheekh Kebab'] },
            { heading: 'BUFFET MAIN SPREAD', icon: 'fa-plate-wheat', items: ['Royal Mutton Biryani', 'Butter Chicken Masala', 'Butter Naan / Roti', 'Prawn Masala Curry'] },
            { heading: 'SEAFOOD SPECIALS', icon: 'fa-fish', items: ['Crab Gravy Curry', 'Vanjaram Tawa Fish Fry', 'Nethili Pepper Fry', 'Prawn Dum Biryani'] },
            { heading: 'DESSERT BAR', icon: 'fa-ice-cream', items: ['Chocolate Brownie with Ice Cream', 'Matka Kulfi', 'Fruit Salad with Cream', 'Beeda'] }
          ]
        },
        dinner: {
          title: 'Traditional Night Dinner & Curries',
          sub: 'Comforting non-veg dinner served with idiyappam, dosa & curries',
          badge: 'MALABAR & MADURAI SUPPER',
          cols: [
            { heading: 'HOT DINNER MAINS', icon: 'fa-bowl-food', items: ['Soft Idli with Mutton Gravy', 'Idiyappam with Chicken Stew', 'Spicy Egg Dosa', 'Malabar Parotta'] },
            { heading: 'GRAVIES & CURRIES', icon: 'fa-pepper-hot', items: ['Chicken Pepper Gravy', 'Mutton Chukka Salna', 'Egg Thokku Gravy', 'Fish Curry'] },
            { heading: 'RICE VARIETIES', icon: 'fa-rice', items: ['Chicken Fried Rice', 'Egg Fried Rice', 'Thick Curd Rice with Pickle'] },
            { heading: 'SWEETS & MILK', icon: 'fa-apple-whole', items: ['Hot Badam Milk', 'Vanilla Ice Cream', 'Fresh Banana'] }
          ]
        },
        special: {
          title: 'Chettinad Royal Chef Specials',
          sub: 'Exclusive royal Chettinad & Malabar signature dishes for special events',
          badge: 'ROYAL CHEF SPECIALS',
          cols: [
            { heading: 'CHEF SIGNATURE MAINS', icon: 'fa-crown', items: ['Nattu Kozhi Soup (Country Chicken)', 'Mutton Nalli Fry (Marrow Roast)', 'Turkey Roast', 'Rabbit Chukka Roast'] },
            { heading: 'SEAFOOD EXTRAORDINARY', icon: 'fa-fish', items: ['Whole Tawa Fish Roast', 'Lobster Masala Fry', 'Squid Pepper Fry', 'Jumbo Prawn Curry'] },
            { heading: 'ROYAL DESSERTS', icon: 'fa-ice-cream', items: ['Elaneer Payasam', 'Dry Fruit Halwa', 'Live Ice Cream Roll', 'Matka Kulfi'] },
            { heading: 'FINISHING TOUCH', icon: 'fa-leaf', items: ['Special Royal Sweet Beeda', 'Fresh Fruit Basket', 'Rose Water Welcome'] }
          ]
        }
      }
    },
    industrial: {
      veg: {
        breakfast: {
          title: 'Morning Shift Breakfast Buffet',
          sub: 'Nutritious high-energy morning meal prepared fresh at our Central Kitchen',
          badge: 'CPU STEAM FRESH',
          cols: [
            { heading: 'MAINS', icon: 'fa-bowl-hot', items: ['Soft Mallipoo Idli (4 Pcs)', 'Hot Ghee Kichadi / Pongal', 'Crispy Medu Vada', 'Poori with Potato Masala'] },
            { heading: 'SAMBAR & CHUTNEYS', icon: 'fa-pepper-hot', items: ['Drumstick Veg Sambar', 'Fresh Coconut Chutney', 'Tomato Kara Chutney', 'Idli Milagai Podi'] },
            { heading: 'ENERGY SIDES', icon: 'fa-seedling', items: ['Boiled Sprouted Moong', 'Banana', 'Mixed Fruit Bowl'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Hot Filter Coffee', 'Cardamom Tea', 'Hot Milk with Bournvita'] }
          ]
        },
        lunch: {
          title: 'Factory Full Meals Lunch Spread',
          sub: 'Sustained energy workforce lunch with balanced proteins & carbohydrates',
          badge: 'DIETITIAN BALANCED',
          cols: [
            { heading: 'RICE & BREAD', icon: 'fa-bowl-food', items: ['Hot Steamed Rice (Unlimited)', 'Whole Wheat Phulka / Chapathi (2 Pcs)', 'Variety Rice (Lemon / Tomato)'] },
            { heading: 'DAL & GRAVIES', icon: 'fa-plate-wheat', items: ['Vegetable Sambar', 'Mor Kulambu / Vathakulambu', 'Pepper Rasam', 'Thick Dal Tadka'] },
            { heading: 'PORIYAL & KOOTU', icon: 'fa-carrot', items: ['Cabbage Chana Poriyal', 'Snake Gourd Kootu', 'Crispy Appalam', 'Lemon Pickle'] },
            { heading: 'FINISH', icon: 'fa-leaf', items: ['Fresh Set Curd / Buttermilk', 'Semiya Payasam', 'Banana'] }
          ]
        },
        tiffin: {
          title: 'Shift High-Tea & Energy Snacks',
          sub: 'Evening shift refreshment with hot snacks and immunity drinks',
          badge: 'SHIFT ENERGY BOOST',
          cols: [
            { heading: 'HOT SNACKS', icon: 'fa-cookie-bite', items: ['Onion Pakoda', 'Veg Samosa (2 Pcs)', 'Masala Vada', 'Corn Cheese Nuggets'] },
            { heading: 'LIGHT TIFFIN', icon: 'fa-hotdog', items: ['Kuzhi Paniyaram with Chutney', 'Rava Upma with Podi', 'Bread Butter Jam'] },
            { heading: 'DIPS', icon: 'fa-pepper-hot', items: ['Mint Coriander Chutney', 'Tomato Ketchup', 'Coconut Chutney'] },
            { heading: 'HOT BEVERAGES', icon: 'fa-mug-hot', items: ['Masala Chai', 'Strong Filter Coffee', 'Ginger Tea'] }
          ]
        },
        dinner: {
          title: 'Night Shift Dinner Buffet Spread',
          sub: 'Easy-to-digest, wholesome night dinner for factory and tech park shifts',
          badge: 'EASY DIGESTION SUPPER',
          cols: [
            { heading: 'TIFFIN MAINS', icon: 'fa-bowl-food', items: ['Hot Soft Chapathi (3 Pcs)', 'Veg Kurma Gravy', 'Kal Dosa with Podi', 'Idiyappam'] },
            { heading: 'RICE VARIETIES', icon: 'fa-rice', items: ['Steamed Rice with Sambar', 'Digestive Jeera Rice', 'Tempered Curd Rice with Pickle'] },
            { heading: 'GRAVIES & RASAM', icon: 'fa-pepper-hot', items: ['Poondu Rasam (Garlic Rasam)', 'Tomato Thokku', 'Fryums'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Hot Badam Milk', 'Sukku Coffee', 'Herbal Digestive Tea'] }
          ]
        },
        special: {
          title: 'Midnight Shift Booster Packs',
          sub: 'Specially packed midnight shift boxes for 24/7 manufacturing plants',
          badge: '24/7 OPERATIONS',
          cols: [
            { heading: 'PACKED COMBO', icon: 'fa-box-open', items: ['Ghee Chapathi (2 Pcs) with Paneer Curry', 'Lemon Sevai / Veg Fried Rice', 'Curd Rice with Mango Thokku'] },
            { heading: 'SNACKS', icon: 'fa-cookie', items: ['Dry Fruit Chikki', 'Biscuits Pack', 'Fresh Apple / Banana'] },
            { heading: 'WARM FLUIDS', icon: 'fa-mug-hot', items: ['Insulated Flask Masala Tea', 'Filter Coffee Dispenser'] },
            { heading: 'HYGIENE PACK', icon: 'fa-hand-sparkles', items: ['Sealed Disposable Cutlery', 'Sanitizing Wet Wipe', 'Mouth Freshener'] }
          ]
        }
      },
      nonveg: {
        breakfast: {
          title: 'Morning Shift Egg & Chicken Breakfast',
          sub: 'High-protein workforce breakfast with boiled eggs and chicken gravy',
          badge: 'HIGH PROTEIN SHIFT',
          cols: [
            { heading: 'MAINS', icon: 'fa-bowl-hot', items: ['Soft Mallipoo Idli (4 Pcs)', 'Egg Kal Dosa (2 Pcs)', 'Hot Medu Vada', 'Poori with Masala'] },
            { heading: 'CURRIES', icon: 'fa-drumstick-bite', items: ['Chicken Salna Gravy', 'Egg Curry Thokku', 'Tiffin Sambar'] },
            { heading: 'PROTEIN SIDES', icon: 'fa-egg', items: ['2 Whole Boiled Eggs with Pepper', 'Fresh Chutneys'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Filter Coffee', 'Cardamom Tea'] }
          ]
        },
        lunch: {
          title: 'Workforce Non-Veg Chicken / Fish Meals',
          sub: 'Hearty non-veg shift lunch with chicken gravy, fish fry, and sides',
          badge: 'ENERGY NON-VEG LUNCH',
          cols: [
            { heading: 'NON-VEG MAINS', icon: 'fa-drumstick-bite', items: ['Chicken Chettinad Gravy (2 Pcs)', 'Vanjaram Tawa Fish Fry / Egg', 'Chicken Dum Biryani (Weekly)'] },
            { heading: 'RICE & CHAPATHI', icon: 'fa-bowl-food', items: ['Steamed Ponni Rice (Unlimited)', 'Whole Wheat Chapathi (2 Pcs)', 'Mutton Flavoured Salna'] },
            { heading: 'VEG SIDES', icon: 'fa-carrot', items: ['Vegetable Sambar', 'Pepper Rasam', 'Cabbage Poriyal', 'Appalam'] },
            { heading: 'DESSERT & CURD', icon: 'fa-ice-cream', items: ['Set Curd Rice with Pickle', 'Kesari Sweet', 'Banana'] }
          ]
        },
        tiffin: {
          title: 'Evening Non-Veg Snack & Tea Break',
          sub: 'Crispy chicken cutlets, egg rolls & piping hot tea for afternoon shift',
          badge: 'CRISPY SHIFT BITES',
          cols: [
            { heading: 'NON-VEG BITES', icon: 'fa-drumstick-bite', items: ['Crispy Chicken 65 (4 Pcs)', 'Egg Puff', 'Chicken Cutlet', 'Spiced Egg Bonda'] },
            { heading: 'VEG BACKUP', icon: 'fa-cookie-bite', items: ['Onion Pakoda', 'Veg Samosa'] },
            { heading: 'CHUTNEYS', icon: 'fa-pepper-hot', items: ['Pudina Mint Chutney', 'Tomato Dip'] },
            { heading: 'TEA & COFFEE', icon: 'fa-mug-hot', items: ['Masala Chai', 'Strong Coffee'] }
          ]
        },
        dinner: {
          title: 'Night Shift Non-Veg Dinner Buffet',
          sub: 'Soft parotta, idiyappam with chicken curry and pepper egg for night shifts',
          badge: 'NIGHT SHIFT RECHARGE',
          cols: [
            { heading: 'MAINS', icon: 'fa-bowl-food', items: ['Malabar Parotta (2 Pcs)', 'Idiyappam (3 Pcs)', 'Soft Chapathi'] },
            { heading: 'CURRIES', icon: 'fa-drumstick-bite', items: ['Chicken Pepper Gravy', 'Egg Salna', 'Veg Kurma Gravy'] },
            { heading: 'RICE', icon: 'fa-rice', items: ['Egg Fried Rice', 'Steamed Rice with Rasam', 'Curd Rice with Pickle'] },
            { heading: 'BEVERAGES', icon: 'fa-mug-hot', items: ['Hot Badam Milk', 'Sukku Tea'] }
          ]
        },
        special: {
          title: 'Midnight Non-Veg Shift Booster Pack',
          sub: 'Individually packed chicken biryani & egg combos for 24/7 night staff',
          badge: 'SEALED NIGHT COMBO',
          cols: [
            { heading: 'PACKED MEAL', icon: 'fa-box-open', items: ['Chicken Biryani Bento with Raitha & Gravy', 'Boiled Egg with Pepper', 'Parotta (2 Pcs) with Chicken Chukka'] },
            { heading: 'SNACKS & DRINK', icon: 'fa-cookie', items: ['Chicken Samosa', 'Chilled Drink / Energy Milk'] },
            { heading: 'SWEET', icon: 'fa-ice-cream', items: ['Gulab Jamun Pack'] },
            { heading: 'HYGIENE KIT', icon: 'fa-hand-sparkles', items: ['Disposable Spoon, Napkin & Mouth Freshener'] }
          ]
        }
      }
    },
    corporate: {
      veg: {
        breakfast: {
          title: 'South Indian Breakfast Box',
          sub: 'Individual 4-compartment sealed box with idli, vada, pongal & sweet',
          badge: 'HOT SEALED BENTO',
          cols: [
            { heading: 'MAINS', icon: 'fa-bowl-hot', items: ['Soft Mallipoo Idli (2 Pcs)', 'Mini Ghee Cashew Pongal', 'Crispy Medu Vada (1 Pc)', 'Mini Poori Masala'] },
            { heading: 'CHUTNEY & SAMBAR', icon: 'fa-pepper-hot', items: ['Sealed Sambar Cup', 'Fresh Coconut Chutney Cup', 'Kara Chutney Cup'] },
            { heading: 'SWEET', icon: 'fa-cookie', items: ['Pineapple Rava Kesari (50g)'] },
            { heading: 'BEVERAGE & KIT', icon: 'fa-mug-hot', items: ['Flask Degree Coffee / Tea', 'Cutlery & Wet Wipe'] }
          ]
        },
        lunch: {
          title: 'Executive Veg Kalyana Thali Box',
          sub: '8-compartment luxury lunch tray packed with authentic wedding delicacies',
          badge: 'EXECUTIVE 8-COMPARTMENT',
          cols: [
            { heading: 'RICE & BREAD', icon: 'fa-bowl-food', items: ['Steamed Basmati Rice', 'Veg Dum Biryani with Raitha', 'Soft Phulka Chapathi (2 Pcs)'] },
            { heading: 'GRAVIES & DAL', icon: 'fa-plate-wheat', items: ['Paneer Butter Masala', 'Kalyana Drumstick Sambar', 'Mysore Rasam Cup'] },
            { heading: 'PORIYAL & STARTER', icon: 'fa-carrot', items: ['Potato Roast / Urulai Kara Curry', 'Beans Usili', 'Crispy Mini Vada', 'Appalam & Pickle'] },
            { heading: 'DESSERT & CURD', icon: 'fa-apple-whole', items: ['Thirattipal Milk Sweet', 'Set Thick Curd Rice', 'Sweet Beeda'] }
          ]
        },
        tiffin: {
          title: 'Meeting Snack & Sandwich Pack',
          sub: 'Mess-free executive snack boxes for board meetings & workshops',
          badge: 'BOARDROOM SNACK BOX',
          cols: [
            { heading: 'SANDWICH & SAVOURY', icon: 'fa-bread-slice', items: ['Grilled Paneer Veg Club Sandwich', 'Cocktail Veg Samosa (2 Pcs)', 'Corn Cheese Ball'] },
            { heading: 'TRADITIONAL SNACK', icon: 'fa-cookie-bite', items: ['Mini Kuzhi Paniyaram with Dip', 'Thanjavur Ribbon Pakoda'] },
            { heading: 'SWEET & DESSERT', icon: 'fa-cookie', items: ['Dry Fruit Brownie', 'Saffron Sandesh'] },
            { heading: 'BEVERAGE', icon: 'fa-glass-water', items: ['Packed Real Fruit Juice / Iced Tea', 'Wet Wipe & Napkin'] }
          ]
        },
        reception: {
          title: 'VIP 5-Star Executive Platter',
          sub: 'Ultra-premium corporate dining platter for VIP clients and delegacy visits',
          badge: '5-STAR VIP PLATTER',
          cols: [
            { heading: 'STARTERS', icon: 'fa-crown', items: ['Paneer Tikka Skewer', 'Hara Bhara Kebab', 'Crispy Lotus Stem'] },
            { heading: 'ROYAL MAINS', icon: 'fa-bowl-food', items: ['Kashmiri Pulao with Nuts', 'Butter Naan / Roti', 'Shahi Paneer Korma', 'Dal Makhani'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Burani Garlic Raitha', 'Special Salad with Dressing', 'Roasted Papad'] },
            { heading: 'DESSERT', icon: 'fa-ice-cream', items: ['Angoori Rasmalai', 'Elaneer Payasam Cup', 'Imported Chocolate Bar'] }
          ]
        },
        dinner: {
          title: 'Dinner Chapathi & Rice Box',
          sub: 'Light, healthy corporate dinner box for late-night office work sessions',
          badge: 'LATE NIGHT WORK BENTO',
          cols: [
            { heading: 'BREAD & GRAVY', icon: 'fa-bowl-food', items: ['Soft Ghee Chapathi (3 Pcs)', 'Mixed Vegetable Paneer Kurma', 'Dal Tadka'] },
            { heading: 'RICE', icon: 'fa-rice', items: ['Veg Pulao with Raitha', 'Thick Curd Rice with Mango Pickle'] },
            { heading: 'SIDES', icon: 'fa-carrot', items: ['Fresh Green Salad', 'Fried Appalam'] },
            { heading: 'DESSERT', icon: 'fa-apple-whole', items: ['Gulab Jamun (1 Pc)', 'Fresh Cut Apple'] }
          ]
        }
      },
      nonveg: {
        breakfast: {
          title: 'Non-Veg Breakfast Bento Box',
          sub: 'High-protein executive breakfast box with chicken gravy & boiled egg',
          badge: 'PROTEIN BENTO BOX',
          cols: [
            { heading: 'MAINS', icon: 'fa-bowl-hot', items: ['Soft Mallipoo Idli (2 Pcs)', 'Egg Kal Dosa (1 Pc)', 'Crispy Medu Vada (1 Pc)'] },
            { heading: 'CURRIES', icon: 'fa-drumstick-bite', items: ['Chettinad Chicken Salna', 'Boiled Egg with Black Pepper'] },
            { heading: 'CHUTNEY', icon: 'fa-pepper-hot', items: ['Coconut Chutney Cup', 'Kara Chutney Cup'] },
            { heading: 'SWEET & TEA', icon: 'fa-mug-hot', items: ['Kesari Cup', 'Flask Coffee / Tea', 'Cutlery Kit'] }
          ]
        },
        lunch: {
          title: 'Chettinad Mutton / Chicken Biryani Box',
          sub: 'Authentic Seeraga Samba Biryani meal box sealed hot with starters & sweet',
          badge: 'ROYAL BIRYANI BENTO',
          cols: [
            { heading: 'BIRYANI MAINS', icon: 'fa-bowl-food', items: ['Seeraga Samba Mutton / Chicken Biryani', 'Boiled Pepper Egg', 'Malabar Parotta (1 Pc)'] },
            { heading: 'STARTER & GRAVY', icon: 'fa-drumstick-bite', items: ['Crispy Chicken 65 (3 Pcs)', 'Authentic Brinjal Dalcha', 'Ennai Kathirikai Gravy'] },
            { heading: 'SIDES', icon: 'fa-pepper-hot', items: ['Cucumber Onion Raitha Cup', 'Mint Dip'] },
            { heading: 'DESSERT', icon: 'fa-ice-cream', items: ['Hot Gulab Jamun (2 Pcs)', 'Sweet Meenakshi Beeda'] }
          ]
        },
        tiffin: {
          title: 'Corporate Non-Veg High-Tea Box',
          sub: 'Crispy chicken lollipop, chicken sandwich & snacks for executive high-tea',
          badge: 'EXECUTIVE HIGH-TEA',
          cols: [
            { heading: 'STARTERS', icon: 'fa-drumstick-bite', items: ['Chicken Lollipop with Hot Garlic Sauce', 'Chicken Mayo Club Sandwich', 'Crispy Chicken Cutlet'] },
            { heading: 'SNACK', icon: 'fa-cookie-bite', items: ['Egg Puff', 'Mini Samosa'] },
            { heading: 'SWEET', icon: 'fa-cookie', items: ['Chocolate Mousse Cup', 'Walnut Brownie'] },
            { heading: 'DRINK', icon: 'fa-glass-water', items: ['Fruit Juice Pack', 'Cutlery & Sanitizing Wipe'] }
          ]
        },
        reception: {
          title: 'VIP Non-Veg 5-Star Platter',
          sub: 'Luxury international corporate lunch platter with Tandoori BBQ & fish fry',
          badge: '5-STAR VIP NON-VEG',
          cols: [
            { heading: 'LIVE BBQ STARTERS', icon: 'fa-fire-burner', items: ['Chicken Malai Tikka', 'Vanjaram Tawa Fish Fry', 'Mutton Seekh Kebab'] },
            { heading: 'MAIN SPREAD', icon: 'fa-plate-wheat', items: ['Dum Mutton Biryani', 'Butter Chicken Masala', 'Butter Naan (2 Pcs)'] },
            { heading: 'ACCOMPANIMENTS', icon: 'fa-pepper-hot', items: ['Mutton Salna Gravy', 'Raitha & Salad Cup', 'Pickle'] },
            { heading: 'ROYAL DESSERT', icon: 'fa-ice-cream', items: ['Angoori Rasmalai', 'Matka Kulfi Box', 'Dry Fruit Beeda'] }
          ]
        },
        dinner: {
          title: 'Non-Veg Dinner Parotta & Biryani Box',
          sub: 'Wholesome dinner box with soft Malabar parotta, chicken curry & fried rice',
          badge: 'NIGHT NON-VEG BENTO',
          cols: [
            { heading: 'BREAD & GRAVY', icon: 'fa-bowl-food', items: ['Malabar Parotta (2 Pcs)', 'Chicken Chettinad Gravy (2 Pcs)', 'Egg Thokku'] },
            { heading: 'RICE', icon: 'fa-rice', items: ['Egg Fried Rice / Chicken Biryani', 'Curd Rice with Pickle'] },
            { heading: 'SIDES', icon: 'fa-pepper-hot', items: ['Salna Gravy', 'Onion Raitha Cup'] },
            { heading: 'DESSERT', icon: 'fa-apple-whole', items: ['Gulab Jamun (1 Pc)', 'Fresh Cut Fruit'] }
          ]
        }
      }
    },
    temple: {
      veg: {
        breakfast: {
          title: 'Suprabatham Morning Prasadam Spread',
          sub: 'Auspicious morning prasadam cooked with pure cow ghee & whole cashew nuts',
          badge: '100% SATVIK PURITY',
          cols: [
            { heading: 'SACRED PRASADAM', icon: 'fa-gopuram', items: ['Ven Pongal with Desi Cow Ghee', 'Sarkarai Pongal with Jaggery', 'Crispy Medu Vada (No Onion)', 'Rava Upma with Ghee'] },
            { heading: 'SAMBAR & CHUTNEY', icon: 'fa-pepper-hot', items: ['Traditional Temple Drumstick Sambar', 'Fresh Coconut Chutney (No Garlic)', 'Spiced Ginger Chutney'] },
            { heading: 'SACRED DRINK', icon: 'fa-glass-water', items: ['Theertham Prasadam', 'Spiced Panakam with Cardamom & Honey', 'Sukku Coffee'] },
            { heading: 'FRUITS & FLOWERS', icon: 'fa-seedling', items: ['Fresh Country Banana', 'Tulasi Theertham', 'Prasadam Kumkum'] }
          ]
        },
        lunch: {
          title: 'Grand Maha Annathanam Leaf Feast (16+ Items)',
          sub: 'Traditional Satvik wedding-scale feast cooked in sacred brass cauldrons',
          badge: 'SACRED BRASS CAULDRONS',
          cols: [
            { heading: 'SWEETS & STARTERS', icon: 'fa-cookie', items: ['Tirupati Laddu / Sweet Poli', 'Akkaravadisal / Sarkarai Pongal', 'Urad Dal Vada', 'Rice Appalam'] },
            { heading: 'RICE & GHEE', icon: 'fa-bowl-food', items: ['Hot Steamed Rice', 'Desi Cow Ghee & Paruppu', 'Temple Puliyodharai (Tamarind Rice)', 'Kadhamba Sambar (No Onion Garlic)'] },
            { heading: 'PORIYAL & KOOTU', icon: 'fa-carrot', items: ['Vazhaikkai Poriyal (Raw Banana)', 'Chow Chow Kootu', 'Pachadi with Curd', 'Mavadu Pickle'] },
            { heading: 'RASAM, PAYASAM & CURD', icon: 'fa-apple-whole', items: ['Mysore Pineapple Rasam', 'Paal Payasam with Cashews', 'Thick Temple Curd Rice', 'Banana & Beeda'] }
          ]
        },
        tiffin: {
          title: 'Sayaratchai Evening Pooja Prasadam',
          sub: 'Sacred evening sundal varieties, kozhukattai & divine sweets',
          badge: 'EVENING POOJA UTSAVAM',
          cols: [
            { heading: 'SUNDAL VARIETIES', icon: 'fa-bowl-rice', items: ['Konda Kadalai Sundal (Chickpea)', 'Pachai Payaru Sundal (Green Gram)', 'Mochai Sundal with Coconut'] },
            { heading: 'SACRED SWEETS', icon: 'fa-crown', items: ['Poornam Kozhukattai', 'Sweet Appam with Ghee', 'Saffron Rava Kesari'] },
            { heading: 'CRISPY PRASADAM', icon: 'fa-cookie-bite', items: ['Ulundhu Vada with Pepper', 'Thenkuzhal Murukku'] },
            { heading: 'DIVINE DRINKS', icon: 'fa-glass-water', items: ['Elaneer Payasam Cup', 'Nannari Sharbat', 'Cardamom Milk'] }
          ]
        },
        reception: {
          title: 'Maha Kumbabishekam Samaradhana Feast',
          sub: 'Grand community feast prepared for thousands of devotees during consecration',
          badge: 'DEVOTEE SCALE: 1,000–5,000+',
          cols: [
            { heading: 'AUSPICIOUS SWEETS', icon: 'fa-crown', items: ['Maha Prasadam Tirupati Laddu', 'Ghee Mysore Pak', 'Paruppu Payasam', 'Special Vada'] },
            { heading: 'SACRED FEAST MAINS', icon: 'fa-plate-wheat', items: ['Steamed Rice with Ghee', 'Temple Kovil Sambar', 'Mor Kulambu', 'Milagu Jeera Rasam'] },
            { heading: 'VARIETY SACRED RICE', icon: 'fa-rice', items: ['Authentic Kovil Puliyodharai', 'Kalkandu Sadham (Rock Sugar Rice)', 'Curd Rice with Pomegranate'] },
            { heading: 'TRADITIONAL SIDES', icon: 'fa-leaf', items: ['Urulai Kara Roast', 'Keerai Kootu', 'More Milagai', 'Thamboolam Bag'] }
          ]
        },
        dinner: {
          title: 'Ardhajama Night Prasadam Spread',
          sub: 'Light and auspicious night prasadam offering for temple priests and devotees',
          badge: 'DIVINE NIGHT PRASADAM',
          cols: [
            { heading: 'SACRED TIFFIN', icon: 'fa-bowl-food', items: ['Ghee Chapathi with Potato Kurma', 'Soft Dosa with Sambar (No Onion)', 'Idiyappam with Coconut Milk'] },
            { heading: 'RICE OFFERINGS', icon: 'fa-rice', items: ['Kovil Sambar Sadham', 'Thick Curd Rice with Fresh Mango Pickle'] },
            { heading: 'SACRED MILK', icon: 'fa-mug-hot', items: ['Kunkumapoo Saffron Milk', 'Hot Sukku Coffee with Palm Jaggery'] },
            { heading: 'FRUITS', icon: 'fa-apple-whole', items: ['Fresh Naattu Pazham (Hill Banana)', 'Sacred Vibhuti & Prasadam'] }
          ]
        }
      }
    }
  };

  // Ensure temple cuisine has fallback for nonveg
  multiServiceDatabases.temple.nonveg = multiServiceDatabases.temple.veg;

  const studioDatabase = (multiServiceDatabases[serviceType] || multiServiceDatabases.marriage);

  function renderChefStudio() {
    const curDb = studioDatabase || {};
    const cuisineGroup = curDb[curCuisineStudio] || curDb['veg'] || Object.values(curDb)[0] || {};
    const data = cuisineGroup[curTabStudio] || cuisineGroup['breakfast'] || Object.values(cuisineGroup)[0];
    if (!data) return;

    if (studioTitle) studioTitle.textContent = data.title;
    if (studioSub) studioSub.textContent = data.sub;
    if (studioHeroPhoto && data.photo) studioHeroPhoto.src = data.photo;
    
    const badgeEl = document.getElementById('studioCourseBadge');
    if (badgeEl && data.badge) badgeEl.innerHTML = '<i class="fa-solid fa-sparkles"></i> ' + data.badge;

    if (studioCoursesGrid && data.cols) {
      studioCoursesGrid.innerHTML = '';
      data.cols.forEach(col => {
        const box = document.createElement('div');
        box.className = 'studio-course-box';
        box.innerHTML = '<h4>' + col.heading + ' <i class="fa-solid ' + col.icon + ' text-gold"></i></h4>' +
          '<ul>' + col.items.map(item => '<li><i class="fa-solid fa-circle"></i> ' + item + '</li>').join('') + '</ul>';
        studioCoursesGrid.appendChild(box);
      });
    }
  }

  // Cuisine Switcher Events
  if (btnVegStudio && btnNonVegStudio) {
    btnVegStudio.addEventListener('click', () => {
      btnVegStudio.classList.add('active');
      btnNonVegStudio.classList.remove('active');
      curCuisineStudio = 'veg';
      renderChefStudio();
    });

    btnNonVegStudio.addEventListener('click', () => {
      btnNonVegStudio.classList.add('active');
      btnVegStudio.classList.remove('active');
      curCuisineStudio = 'nonveg';
      renderChefStudio();
    });
  }

  // Timeline Step Events
  studioTimelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      studioTimelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      curTabStudio = step.getAttribute('data-tab') || 'breakfast';
      renderChefStudio();
    });
  });

  // WhatsApp Button Event
  if (btnStudioWhatsApp) {
    btnStudioWhatsApp.addEventListener('click', () => {
      const curDb = studioDatabase || {};
      const cuisineGroup = curDb[curCuisineStudio] || curDb['veg'] || Object.values(curDb)[0] || {};
      const data = cuisineGroup[curTabStudio] || Object.values(cuisineGroup)[0];
      const title = data ? data.title : 'Catering Packages';
      const text = encodeURIComponent('Hello JS Caterer (Jagan C)! I would like to book / get a customized quote for: ' + title + '. Please share packages and pricing!');
      window.open('https://wa.me/919940649939?text=' + text, '_blank');
    });
  }

  // Initial render
  renderChefStudio();

  // Modern ON/OFF Switch Controller
  const cuisineToggleInput = document.getElementById('cuisineToggleInput');
  const labelVegBtn = document.getElementById('labelVegBtn');
  const labelNonVegBtn = document.getElementById('labelNonVegBtn');

  if (cuisineToggleInput) {
    cuisineToggleInput.addEventListener('change', () => {
      if (cuisineToggleInput.checked) {
        curCuisineStudio = 'nonveg';
        if (labelNonVegBtn) labelNonVegBtn.classList.add('active');
        if (labelVegBtn) labelVegBtn.classList.remove('active');
      } else {
        curCuisineStudio = 'veg';
        if (labelVegBtn) labelVegBtn.classList.add('active');
        if (labelNonVegBtn) labelNonVegBtn.classList.remove('active');
      }
      renderChefStudio();
    });
  }

  if (labelVegBtn && cuisineToggleInput) {
    labelVegBtn.addEventListener('click', () => {
      cuisineToggleInput.checked = false;
      cuisineToggleInput.dispatchEvent(new Event('change'));
    });
  }

  if (labelNonVegBtn && cuisineToggleInput) {
    labelNonVegBtn.addEventListener('click', () => {
      cuisineToggleInput.checked = true;
      cuisineToggleInput.dispatchEvent(new Event('change'));
    });
  }


  // Mobile & Tablet Luxury Dropdown Controller
  const mobileMealSelectTrigger = document.getElementById('mobileMealSelectTrigger');
  const mobileMealDropdownMenu = document.getElementById('mobileMealDropdownMenu');
  const dropdownActiveTime = document.getElementById('dropdownActiveTime');
  const dropdownActiveName = document.getElementById('dropdownActiveName');
  const dropdownOptions = document.querySelectorAll('.dropdown-option');

  if (mobileMealSelectTrigger && mobileMealDropdownMenu) {
    mobileMealSelectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMealDropdownMenu.classList.toggle('is-open');
      mobileMealSelectTrigger.classList.toggle('is-open', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!mobileMealDropdownMenu.contains(e.target) && !mobileMealSelectTrigger.contains(e.target)) {
        mobileMealDropdownMenu.classList.remove('is-open');
        mobileMealSelectTrigger.classList.remove('is-open');
      }
    });

    dropdownOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const tab = opt.getAttribute('data-tab');
        curTabStudio = tab || 'breakfast';

        // Update active class in dropdown options
        dropdownOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        // Update trigger display
        const timeHtml = opt.querySelector('.opt-time') ? opt.querySelector('.opt-time').innerHTML : '';
        const nameText = opt.querySelector('.opt-name') ? opt.querySelector('.opt-name').textContent : '';
        if (dropdownActiveTime) dropdownActiveTime.innerHTML = timeHtml;
        if (dropdownActiveName) dropdownActiveName.textContent = nameText;

        // Sync with desktop timeline steps
        if (studioTimelineSteps) {
          studioTimelineSteps.forEach(s => {
            if (s.getAttribute('data-tab') === curTabStudio) s.classList.add('active');
            else s.classList.remove('active');
          });
        }

        // Close dropdown & render
        mobileMealDropdownMenu.classList.remove('is-open');
        mobileMealSelectTrigger.classList.remove('is-open');
        renderChefStudio();
      });
    });
  }

});

// ================================================================
// BULLETPROOF STICKY HEADER DYNAMIC SCROLL CONTROLLER
// ================================================================
(function initBulletproofStickyHeader() {
  const headerEl = document.querySelector('.luxury-header') || document.getElementById('header');
  if (!headerEl) return;

  // Create a placeholder element to prevent page layout jump when header becomes position: fixed
  let headerPlaceholder = document.getElementById('header-sticky-placeholder');
  if (!headerPlaceholder) {
    headerPlaceholder = document.createElement('div');
    headerPlaceholder.id = 'header-sticky-placeholder';
    headerPlaceholder.style.display = 'none';
    headerPlaceholder.style.width = '100%';
    headerEl.parentNode.insertBefore(headerPlaceholder, headerEl.nextSibling);
  }

  const handleStickyScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = headerEl.offsetHeight || 75;

    if (scrollY > 35) {
      if (!headerEl.classList.contains('is-scrolled')) {
        headerPlaceholder.style.height = headerHeight + 'px';
        headerPlaceholder.style.display = 'block';
        headerEl.classList.add('is-scrolled');
        headerEl.classList.add('is-sticky-fixed');
      }
    } else {
      if (headerEl.classList.contains('is-scrolled')) {
        headerPlaceholder.style.display = 'none';
        headerEl.classList.remove('is-scrolled');
        headerEl.classList.remove('is-sticky-fixed');
      }
    }
  };

  window.addEventListener('scroll', handleStickyScroll, { passive: true });
  window.addEventListener('resize', handleStickyScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', handleStickyScroll);
  handleStickyScroll();
})();

// ================================================================
// 360° CIRCULAR INFOGRAPHIC INTERACTIVE CONTROLLER
// ================================================================
const circularPillarsData = {
  1: {
    tamil: 'சுவை',
    title: 'Authentic Taste',
    desc: 'Generational family recipes slow-cooked over steady firewood flames in heirloom brass urulis for deep, irreplaceable flavor.',
    metric: '100% Traditional Woodfire Simmering',
    metricIcon: 'fa-bolt',
    b1: 'Stone-ground masalas',
    b2: 'Zero artificial food colors'
  },
  2: {
    tamil: 'தரம்',
    title: 'Pure Quality',
    desc: 'Hand-selected daily harvest produce, certified pure A2 cow ghee, cold-pressed groundnut oils, and first-grade whole spices.',
    metric: 'Pure A2 Cow Ghee & Cold-Pressed Oils',
    metricIcon: 'fa-crown',
    b1: 'Daily farm-direct produce',
    b2: '100% pure dairy & aged basmati'
  },
  3: {
    tamil: 'சுத்தம்',
    title: '100% Hygiene',
    desc: 'State-of-the-art Central Production Unit with sanitized prep stations, RO water purification, and strict glove/hairnet protocols.',
    metric: 'FSSAI Certified 4-Stage RO Stations',
    metricIcon: 'fa-shield-check',
    b1: '4-stage RO water cooking line',
    b2: 'Stainless steel sanitized vessels'
  },
  4: {
    tamil: 'நேர்த்தி',
    title: 'Flawless Hospitality',
    desc: 'Courteous, uniformed service captains delivering coordinated traditional banana leaf service with warmth, speed, and elegance.',
    metric: 'Zero-Delay Muhurtham Service Guarantee',
    metricIcon: 'fa-clock-rotate-left',
    b1: 'Uniformed, trained service staff',
    b2: 'Dedicated banquet VIP manager'
  }
};

window.selectCircularPillar = function(pillarId) {
  const data = circularPillarsData[pillarId];
  if (!data) return;

  // Update satellite node active classes
  document.querySelectorAll('.orbit-satellite-node').forEach(node => {
    node.classList.toggle('active', parseInt(node.getAttribute('data-pillar')) === pillarId);
  });

  // Update dial button active classes
  const dialBtns = document.querySelectorAll('.dial-btn');
  dialBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', (idx + 1) === pillarId);
  });

  // Smooth crossfade dynamic hub content
  const hubContent = document.getElementById('hubDynamicContent');
  if (hubContent) {
    hubContent.style.opacity = '0';
    hubContent.style.transform = 'scale(0.95)';

    setTimeout(() => {
      document.getElementById('hubTamilTitle').textContent = data.tamil;
      document.getElementById('hubTitle').textContent = data.title;
      document.getElementById('hubDesc').textContent = data.desc;
      document.getElementById('hubMetricText').textContent = data.metric;
      
      const metricIconEl = document.querySelector('#hubMetric i');
      if (metricIconEl) {
        metricIconEl.className = 'fa-solid ' + data.metricIcon + ' text-gold';
      }

      const bulletsEl = document.getElementById('hubBullets');
      if (bulletsEl) {
        bulletsEl.innerHTML = '<span><i class="fa-solid fa-circle-check text-green"></i> ' + data.b1 + '</span><span><i class="fa-solid fa-circle-check text-green"></i> ' + data.b2 + '</span>';
      }

      hubContent.style.opacity = '1';
      hubContent.style.transform = 'scale(1)';
    }, 150);
  }
};


// ================================================================
// 360° LUXURY RADIAL WHEEL & EDITORIAL LENS CONTROLLER (BANANA LEAF)
// ================================================================
const radialPillarsMasterData = {
  1: {
    angle: 0,
    tag: 'PILLAR 01 OF 04',
    tamil: 'சுவை · Authentic Taste',
    ribbon: '🌿 தலைவாழை இலை விருந்து முறை · Hot Paruppu Ghee & Sambar Harmony',
    headline: 'Authentic Generational Taste',
    sub: 'Heirloom Recipes Slow-Cooked Over Woodfire',
    story: 'Generational family recipes slow-cooked over steady firewood flames in heirloom brass urulis for deep, irreplaceable taste. Served steaming hot directly onto fresh tender banana leaves with fragrant ghee.',
    img: 'assets/wedding_feast.jpg',
    m1_title: '100% Woodfire', m1_sub: 'Simmered Dum Pots', m1_icon: 'fa-fire-flame-curved',
    m2_title: 'Stone-Ground', m2_sub: 'Chettinad Masalas', m2_icon: 'fa-mortar-pestle',
    m3_title: 'Zero Additives', m3_sub: 'No Artificial Colors', m3_icon: 'fa-ban'
  },
  2: {
    angle: 90,
    tag: 'PILLAR 02 OF 04',
    tamil: 'தரம் · Pure Quality',
    ribbon: '🍃 காவேரி டெல்டா தலைவாழை இலை · Farm-Fresh Tender Cuts',
    headline: 'Pure Uncompromised Quality',
    sub: 'Certified A2 Ghee & Cauvery Delta Banana Leaves',
    story: 'We source fresh, tender-cut banana leaves directly from organic Cauvery delta farms, washed with RO water. Paired with pure A2 cow ghee, cold-pressed groundnut oils, and first-grade aged basmati rice.',
    img: 'assets/banana_leaf_serving.jpg',
    m1_title: 'Pure A2 Ghee', m1_sub: 'Certified Pure Dairy', m1_icon: 'fa-crown',
    m2_title: 'Delta Leaves', m2_sub: 'Farm-Fresh Harvest', m2_icon: 'fa-leaf',
    m3_title: 'Cold-Pressed', m3_sub: 'Traditional Oils', m3_icon: 'fa-seedling'
  },
  3: {
    angle: 180,
    tag: 'PILLAR 03 OF 04',
    tamil: 'சுத்தம் · 100% Hygiene',
    ribbon: '🛡️ FSSAI ISO 22000 சான்றளிக்கப்பட்ட தூய்மை · 100% Natural Dining',
    headline: 'Clinical 100% Food Safety',
    sub: 'RO Washed Eco-Friendly Natural Banana Leaf Dining',
    story: 'State-of-the-art Central Production Unit with 4-stage RO water purification. All banana leaves undergo specialized organic washing and heat-sanitization, guaranteeing 100% hygienic, biodegradable dining.',
    img: 'assets/live_kitchen.jpg',
    m1_title: 'FSSAI Grade', m1_sub: 'Clinical Compliance', m1_icon: 'fa-shield-check',
    m2_title: '4-Stage RO', m2_sub: 'Purified Water Line', m2_icon: 'fa-droplet',
    m3_title: 'Eco-Sanitized', m3_sub: '100% Natural Dining', m3_icon: 'fa-leaf'
  },
  4: {
    angle: 270,
    tag: 'PILLAR 04 OF 04',
    tamil: 'நேர்த்தி · Flawless Hospitality',
    ribbon: '👑 பாரம்பரிய பரிமாறும் ஒழுங்கு · Clockwise Traditional Placement',
    headline: 'Flawless Muhurtham Hospitality',
    sub: 'Traditional Left-to-Right Sacred Serving Protocol',
    story: 'Trained service captains meticulously follow traditional Tamil wedding banana leaf etiquette — placing salt, pickles, sweets, fries, and rice in sacred sequence (உப்பு முதல் பாயாசம் வரை) with zero Muhurtham delay.',
    img: 'assets/corporate_buffet.jpg',
    m1_title: 'Zero Delay', m1_sub: 'Muhurtham Guarantee', m1_icon: 'fa-clock-rotate-left',
    m2_title: 'Etiquette Lead', m2_sub: 'Sacred Placement', m2_icon: 'fa-leaf',
    m3_title: 'Uniformed Staff', m3_sub: 'White-Glove Captains', m3_icon: 'fa-user-tie'
  }
};

window.switchRadialPillar = function(pillarId) {
  const data = radialPillarsMasterData[pillarId];
  if (!data) return;

  // 1. Rotate Needle Pointer Beam
  const pointerEl = document.getElementById('radialDialPointer');
  if (pointerEl) {
    pointerEl.style.transform = 'rotate(' + data.angle + 'deg)';
  }

  // 2. Update Sector Node Active Classes
  document.querySelectorAll('.radial-sector-node').forEach(node => {
    node.classList.toggle('active', parseInt(node.getAttribute('data-pillar')) === pillarId);
  });

  // 3. Update Quick Tabs Active Classes
  const tabs = document.querySelectorAll('.lens-quick-tabs .tab-chip');
  tabs.forEach((tab, idx) => {
    tab.classList.toggle('active', (idx + 1) === pillarId);
  });

  // 4. Smooth Crossfade Editorial Lens Card
  const lensCard = document.getElementById('radialEditorialCard');
  if (lensCard) {
    const heroImg = document.getElementById('lensHeroImg');
    const headline = document.getElementById('lensHeadline');
    const sub = document.getElementById('lensSubHeading');
    const story = document.getElementById('lensStoryText');
    const nodeTag = document.getElementById('lensNodeTag');
    const tamilPill = document.getElementById('lensTamilPill');
    const ribbonText = document.getElementById('lensBananaRibbonText');
    const metricsGrid = document.getElementById('lensMetricsGrid');

    // Fade out slightly
    heroImg.style.opacity = '0.3';
    headline.style.opacity = '0.3';

    setTimeout(() => {
      heroImg.src = data.img;
      nodeTag.textContent = data.tag;
      tamilPill.textContent = data.tamil;
      if (ribbonText) ribbonText.textContent = data.ribbon;
      headline.textContent = data.headline;
      sub.textContent = data.sub;
      story.textContent = data.story;

      // Update metrics
      if (metricsGrid) {
        metricsGrid.innerHTML = `
          <div class="lens-metric-item">
            <i class="fa-solid ${data.m1_icon} text-gold"></i>
            <div class="metric-text">
              <strong>${data.m1_title}</strong>
              <span>${data.m1_sub}</span>
            </div>
          </div>
          <div class="lens-metric-item">
            <i class="fa-solid ${data.m2_icon} text-gold"></i>
            <div class="metric-text">
              <strong>${data.m2_title}</strong>
              <span>${data.m2_sub}</span>
            </div>
          </div>
          <div class="lens-metric-item">
            <i class="fa-solid ${data.m3_icon} text-gold"></i>
            <div class="metric-text">
              <strong>${data.m3_title}</strong>
              <span>${data.m3_sub}</span>
            </div>
          </div>
        `;
      }

      heroImg.style.opacity = '1';
      headline.style.opacity = '1';
    }, 160);
  }
};

// ================================================================
// CLEAN BANANA LEAF INFOGRAPHIC PILLAR CONTROLLER
// ================================================================
window.activatePillar = function(pillarId) {
  // Update card active classes
  document.querySelectorAll('.infographic-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.getAttribute('data-pillar')) === pillarId);
  });

  // Update mobile pill active classes
  const chips = document.querySelectorAll('.mob-pillar-chip');
  chips.forEach((chip, idx) => {
    chip.classList.toggle('active', (idx + 1) === pillarId);
  });

  // Subtle rotation pulse on center feast wheel
  const wheelImg = document.getElementById('wheelMainImg');
  if (wheelImg) {
    const rotationDegrees = { 1: 0, 2: 8, 3: -8, 4: 4 };
    wheelImg.style.transform = 'scale(1.06) rotate(' + (rotationDegrees[pillarId] || 0) + 'deg)';
    setTimeout(() => {
      wheelImg.style.transform = 'scale(1) rotate(0deg)';
    }, 400);
  }
};


// ================================================================
// BANANA LEAF PLATTER 4-DISH CONTROLLER
// ================================================================
window.highlightDish = function(dishId) {
  document.querySelectorAll('.leaf-dish-point').forEach(dish => {
    dish.classList.toggle('active', dish.classList.contains('dish-' + dishId));
  });
};


// ================================================================
// FULL BANANA LEAF SECTION CONTROLLER
// ================================================================
window.activateLeafDish = function(dishId) {
  // subtle hover effect on leaf dish cards
};


// ================================================================
// ISOLATED BANANA LEAF 4-DISH CONTROLLER
// ================================================================
window.activateDish = function(dishId) {
  document.querySelectorAll('.leaf-dish-card').forEach((card, idx) => {
    card.classList.toggle('active', (idx + 1) === dishId);
  });
};


// ================================================================
// PURE CIRCULAR INFOGRAPHIC 4-POINT CONTROLLER
// ================================================================
const pillarTags = {
  1: 'சுவை · TASTE',
  2: 'தரம் · QUALITY',
  3: 'சுத்தம் · HYGIENE',
  4: 'நேர்த்தி · SERVICE'
};

window.setCirclePillar = function(pillarId) {
  document.querySelectorAll('.circle-node').forEach((node) => {
    node.classList.toggle('active', parseInt(node.getAttribute('data-pillar')) === pillarId);
  });

  const chips = document.querySelectorAll('.circle-chip');
  chips.forEach((chip, idx) => {
    chip.classList.toggle('active', (idx + 1) === pillarId);
  });

  const tagEl = document.getElementById('hubLiveTag');
  if (tagEl && pillarTags[pillarId]) {
    tagEl.style.opacity = '0';
    setTimeout(() => {
      tagEl.textContent = pillarTags[pillarId];
      tagEl.style.opacity = '1';
    }, 150);
  }
};
