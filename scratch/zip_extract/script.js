// JS CATERER — Master Script v3
// Hero Slideshow · Drag Carousel · Scroll Story · Calculator · Area Chips · Storyboard

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     1. HERO VIDEO + PHOTO SLIDESHOW
  ───────────────────────────────────────────────────── */
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('slideProgressDots');
  const heroSlideNum = document.getElementById('heroSlideNum');
  const heroSlideLbl = document.getElementById('heroSlideLbl');

  if (slides.length && dotsContainer) {
    let currentSlide = 0;
    let slideTimer;

    // Build progress dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slide-prog-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(idx) {
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      currentSlide = (idx + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dotsContainer.children[currentSlide].classList.add('active');
      if (heroSlideNum) heroSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
      if (heroSlideLbl) heroSlideLbl.textContent = slides[currentSlide].dataset.label || '';
      resetTimer();
    }

    function nextSlide() { goToSlide(currentSlide + 1); }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, 5000);
    }

    // If video loads successfully, pause slideshow (video provides the motion)
    const heroBgVideo = document.getElementById('heroBgVideo');
    if (heroBgVideo) {
      heroBgVideo.addEventListener('canplay', () => {
        // Keep slideshow subtle — reduce opacity of slideshow when video plays
        document.getElementById('heroSlideshow').style.opacity = '0.3';
      });
      heroBgVideo.addEventListener('error', () => {
        // No video — run slideshow at full opacity
        document.getElementById('heroSlideshow').style.opacity = '1';
        resetTimer();
      });
    }

    resetTimer();
  }

  /* ─────────────────────────────────────────────────────
     2. DRAG CAROUSEL (mouse + touch)
  ───────────────────────────────────────────────────── */
  const carouselWrapper = document.getElementById('dragCarouselWrapper') || document.querySelector('.drag-carousel-wrapper');
  if (carouselWrapper) {
    let isDown = false, startX, scrollLeft;

    carouselWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      carouselWrapper.classList.add('dragging');
      startX = e.pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    });
    carouselWrapper.addEventListener('mouseleave', () => { isDown = false; carouselWrapper.classList.remove('dragging'); });
    carouselWrapper.addEventListener('mouseup', () => { isDown = false; carouselWrapper.classList.remove('dragging'); });
    carouselWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselWrapper.offsetLeft;
      carouselWrapper.scrollLeft = scrollLeft - (x - startX) * 2;
    });
    carouselWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    }, { passive: true });
    carouselWrapper.addEventListener('touchend', () => { isDown = false; });
    carouselWrapper.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
      carouselWrapper.scrollLeft = scrollLeft - (x - startX) * 2;
    }, { passive: true });
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

  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => (document.getElementById(id) || {}).value || '';
      const msg = `வணக்கம் JS Caterer (Jagan C),\n\nWebsite Booking Inquiry:\n👤 Name: ${v('cName')}\n📞 Phone: ${v('cPhone')}\n✉️ Email: ${v('cEmail')}\n📅 Date: ${v('cDate')}\n🗂️ Category: ${v('cCategory')}\n🎉 Occasion: ${v('cOccasion')}\n🍲 Cuisine: ${v('cCuisine')}\n👥 Guests: ${v('cGuests')}\n📍 Location: ${v('cLocation')}\n📝 Notes: ${v('cDetails')}\n\nPlease send menu packages and quote!`;
      window.open(`https://wa.me/919940649939?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  /* ─────────────────────────────────────────────────────
     11. LANGUAGE TOGGLE (homepage)
  ───────────────────────────────────────────────────── */
  let isTamilMode = false;
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      isTamilMode = !isTamilMode;
      const label = document.getElementById('currentLangLabel');
      if (label) label.textContent = isTamilMode ? 'ENGLISH COPY' : 'TAMIL COPY';
      const heroTitle = document.querySelector('.hero-main-title');
      if (heroTitle) {
        heroTitle.innerHTML = isTamilMode
          ? 'வேளச்சேரி & சென்னையில் <em>சிறந்த கேட்டரிங்</em> சேவை'
          : 'Crafting <em>Unforgettable</em> Feasts in Velachery & Chennai';
      }
    });
  }

});
