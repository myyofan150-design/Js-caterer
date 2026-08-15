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
     6. GOLDEN PARTICLE CANVAS
  ───────────────────────────────────────────────────── */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.5 + 0.15,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,155,39,${p.a})`;
        ctx.shadowBlur = 6; ctx.shadowColor = '#C59B27'; ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  /* ─────────────────────────────────────────────────────
     7. CALCULATOR
  ───────────────────────────────────────────────────── */
  const guestSlider = document.getElementById('guestSlider');
  if (guestSlider) {
    const guestCountVal = document.getElementById('guestCountVal');
    const sumEvent = document.getElementById('sumEvent');
    const sumFormat = document.getElementById('sumFormat');
    const sumSession = document.getElementById('sumSession');

    let selectedFormat = 'Banana Leaf Service';
    let selectedCuisine = 'Veg';
    let selectedSession = 'Grand Lunch';

    // Format Segment Buttons
    document.querySelectorAll('.format-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedFormat = this.getAttribute('data-format') === 'Leaf' ? 'Banana Leaf Service' : 'Brass Vessel Buffet';
        updateCalc();
      });
    });

    // Cuisine Segment Buttons
    document.querySelectorAll('.cuisine-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.cuisine-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedCuisine = this.getAttribute('data-value') || 'Veg';
        updateCalc();
      });
    });

    // Session Segment Buttons
    document.querySelectorAll('.session-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.session-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSession = this.getAttribute('data-session') || 'Grand Lunch';
        updateCalc();
      });
    });

    function updateCalc() {
      const count = parseInt(guestSlider.value, 10) || 250;
      if (guestCountVal) guestCountVal.textContent = count;
      if (sumGuests) sumGuests.textContent = `${count} Guests`;
      if (sumEvent && calcOccasion) sumEvent.textContent = calcOccasion.value || 'Marriage / Wedding';
      if (sumFormat) sumFormat.textContent = selectedFormat;
      if (sumSession) sumSession.textContent = selectedSession;

      if (selectedCuisine === 'Veg') {
        if (sumCuisine) sumCuisine.textContent = 'Pure Veg Satvik (18+ Dishes)';
      } else if (selectedCuisine === 'NonVeg') {
        if (sumCuisine) sumCuisine.textContent = 'Non-Veg & Biryani Delicacies (22+ Dishes)';
      } else {
        if (sumCuisine) sumCuisine.textContent = 'Combined Veg & Non-Veg (25+ Grand Selection)';
      }
    }

    guestSlider.addEventListener('input', updateCalc);
    if (calcOccasion) calcOccasion.addEventListener('change', updateCalc);

    const sendCalcToWA = document.getElementById('sendCalcToWA');
    if (sendCalcToWA) {
      sendCalcToWA.addEventListener('click', () => {
        const count = guestSlider.value;
        const eventName = sumEvent ? sumEvent.textContent : 'Marriage';
        const cuisineName = sumCuisine ? sumCuisine.textContent : 'Pure Veg Satvik';
        const msg = `வணக்கம் JS Caterer (Jagan C),\n\nMaster Caterer Event Specification:\n🎉 Occasion: ${eventName}\n🍱 Format: ${selectedFormat}\n🍲 Cuisine: ${cuisineName}\n⏰ Session: ${selectedSession}\n👥 Guest Scale: ${count} Guests\n\nPlease send me the detailed itemized menu choices and custom quote!`;
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

  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => (document.getElementById(id) || {}).value || '';
      const msg = `வணக்கம் JS Caterer (Jagan C),\n\nWebsite Booking Inquiry:\n👤 Name: ${v('cName')}\n📞 Phone: ${v('cPhone')}\n✉️ Email: ${v('cEmail')}\n📅 Date: ${v('cDate')}\n🗂️ Category: ${v('cCategory')}\n🎉 Occasion: ${v('cOccasion')}\n🍲 Cuisine: ${v('cCuisine')}\n👥 Guests: ${v('cGuests')}\n📍 Location: ${v('cLocation')}\n📝 Notes: ${v('cDetails')}\n\nPlease send menu packages and quote!`;
      window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  /* Video Background Toggle Handler */
  const heritageVideo = document.getElementById('heritageVideo');
  const heritageVideoToggle = document.getElementById('heritageVideoToggle');

  if (heritageVideo && heritageVideoToggle) {
    const icon = heritageVideoToggle.querySelector('i');
    heritageVideo.muted = true;

    function syncVideoBtn() {
      if (heritageVideo.paused) {
        heritageVideoToggle.classList.add('paused');
        if (icon) icon.className = 'fa-solid fa-play';
        heritageVideoToggle.setAttribute('aria-label', 'Play Video');
        heritageVideoToggle.setAttribute('title', 'Play Video');
      } else {
        heritageVideoToggle.classList.remove('paused');
        if (icon) icon.className = 'fa-solid fa-pause';
        heritageVideoToggle.setAttribute('aria-label', 'Pause Video');
        heritageVideoToggle.setAttribute('title', 'Pause Video');
      }
    }

    heritageVideo.addEventListener('play', syncVideoBtn);
    heritageVideo.addEventListener('pause', syncVideoBtn);

    heritageVideoToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (heritageVideo.paused) {
        heritageVideo.play().catch(err => console.log('Video play error:', err));
      } else {
        heritageVideo.pause();
      }
      setTimeout(syncVideoBtn, 50);
    });

    heritageVideo.pause();
    syncVideoBtn();
  }

  /* Section 4 Rotating Thali Plate Scroll Animation */
  const centralRotatingThali = document.getElementById('centralRotatingThali');
  const act4Section = document.getElementById('act-4');

  if (centralRotatingThali && act4Section) {
    if (window.gsap && window.ScrollTrigger) {
      gsap.to(centralRotatingThali, {
        scrollTrigger: {
          trigger: '#act-4',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        },
        rotation: 720,
        ease: 'none'
      });

      // Recalculate ScrollTrigger on load/reload to prevent lag when refreshing midway
      setTimeout(() => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }, 100);
    }

    // Precise relative section scroll fallback
    function updatePlateRotation() {
      const rect = act4Section.getBoundingClientRect();
      const winHeight = window.innerHeight;
      if (rect.top < winHeight && rect.bottom > 0) {
        const progress = (winHeight - rect.top) / (winHeight + rect.height);
        centralRotatingThali.style.transform = `rotate(${progress * 720}deg)`;
      }
    }
    window.addEventListener('scroll', updatePlateRotation, { passive: true });
    updatePlateRotation();
  }

});
