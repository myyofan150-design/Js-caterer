const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

const targetMarker = '  /* ─────────────────────────────────────────────────────\n     4-CONCEPT MENU SHOWCASE INTERACTIVE CONTROLLER';
const idx = js.indexOf(targetMarker);

if (idx !== -1) {
  const cleanStudioController = `
  /* ─────────────────────────────────────────────────────
     FINALIZED SPLIT-SCREEN CHEF STUDIO CONTROLLER (CONCEPT 2)
  ───────────────────────────────────────────────────── */
  const btnVegStudio = document.getElementById('btnVegToggle');
  const btnNonVegStudio = document.getElementById('btnNonVegToggle');
  const studioTimelineSteps = document.querySelectorAll('#studioTimelineList .timeline-step');
  const studioHeroPhoto = document.getElementById('studioHeroPhoto');
  const studioTitle = document.getElementById('studioTitle');
  const studioSub = document.getElementById('studioSub');
  const studioCoursesGrid = document.getElementById('studioCoursesGrid');
  const btnStudioWhatsApp = document.getElementById('btnStudioWhatsApp');

  let curCuisineStudio = 'veg';
  let curTabStudio = 'breakfast';

  const studioDatabase = {
    veg: {
      breakfast: {
        title: 'Traditional South Indian Veg Breakfast Spread',
        sub: 'Piping-hot authentic morning feast served on fresh banana leaves',
        photo: 'assets/sweets_live_counter.jpg',
        badge: '100% PURE GHEE & STEAM FRESH',
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
        badge: 'SACRED BANANA LEAF TRADITION (18+ DISHES)',
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
        badge: 'LIVE ON-SITE COOKING STALLS',
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
        badge: 'ROYAL GALA BUFFET EXPERIENCE',
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
        badge: 'COMFORTING WEDDING EVE SUPPER',
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
        badge: 'HANDCRAFTED CHEF MASTERPIECES',
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
        badge: 'AUTHENTIC CHETTINAD MORNING SPECIALS',
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
        badge: 'COPPER CAULDRON SEERAGA SAMBA BIRYANI',
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
        badge: 'LIVE TAWA SEAFOOD & KOTHU PAROTTA',
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
        badge: 'LIVE TANDOORI & CONTINENTAL BBQ',
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
        badge: 'AUTHENTIC MALABAR & MADURAI SUPPER',
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
        badge: 'ROYAL CHEF SPECIAL SELECTIONS',
        cols: [
          { heading: 'CHEF SIGNATURE MAINS', icon: 'fa-crown', items: ['Nattu Kozhi Soup (Country Chicken)', 'Mutton Nalli Fry (Marrow Roast)', 'Turkey Roast', 'Rabbit Chukka Roast'] },
          { heading: 'SEAFOOD EXTRAORDINARY', icon: 'fa-fish', items: ['Whole Tawa Fish Roast', 'Lobster Masala Fry', 'Squid Pepper Fry', 'Jumbo Prawn Curry'] },
          { heading: 'ROYAL DESSERTS', icon: 'fa-ice-cream', items: ['Elaneer Payasam', 'Dry Fruit Halwa', 'Live Ice Cream Roll', 'Matka Kulfi'] },
          { heading: 'FINISHING TOUCH', icon: 'fa-leaf', items: ['Special Royal Sweet Beeda', 'Fresh Fruit Basket', 'Rose Water Welcome'] }
        ]
      }
    }
  };

  function renderChefStudio() {
    const data = studioDatabase[curCuisineStudio][curTabStudio];
    if (!data) return;

    if (studioTitle) studioTitle.textContent = data.title;
    if (studioSub) studioSub.textContent = data.sub;
    if (studioHeroPhoto && data.photo) studioHeroPhoto.src = data.photo;
    
    const badgeEl = document.getElementById('studioCourseBadge');
    if (badgeEl && data.badge) badgeEl.innerHTML = '<i class="fa-solid fa-sparkles"></i> ' + data.badge;

    if (studioCoursesGrid) {
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
      const data = studioDatabase[curCuisineStudio][curTabStudio];
      const text = encodeURIComponent('Hello JS Caterer (Jagan C)! I would like to book / get a customized quote for: ' + data.title + '. Please share packages and pricing!');
      window.open('https://wa.me/919940649939?text=' + text, '_blank');
    });
  }

  // Initial render
  renderChefStudio();
`;

  js = js.substring(0, idx) + cleanStudioController;
  fs.writeFileSync('script.js', js);
  console.log('Successfully updated script.js with single clean controller!');
} else {
  console.error('Target marker not found in script.js');
}
