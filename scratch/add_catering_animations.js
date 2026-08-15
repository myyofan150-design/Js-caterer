const fs = require('fs');

const animationCss = `

/* ================================================================
   CATERING-THEMED GSAP-STYLE SCROLL & ANIMATION ENGINE
   ================================================================ */

/* Scroll Progress Bar at Top */
#scrollProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5px;
  background: linear-gradient(90deg, #D4AF37 0%, #E8C84D 50%, #AA820A 100%);
  width: 0%;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
  transition: width 0.1s linear;
}

/* Scroll-Driven Reveal Class */
.scroll-reveal {
  opacity: 0;
  transform: translateY(36px) scale(0.98);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Floating Culinary Spice Particles */
.floating-spice-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.spice-particle {
  position: absolute;
  color: rgba(197, 155, 39, 0.18);
  font-size: 1.4rem;
  animation: floatSpice 8s ease-in-out infinite alternate;
}

.spice-particle:nth-child(1) { top: 15%; left: 8%; animation-delay: 0s; font-size: 1.8rem; }
.spice-particle:nth-child(2) { top: 45%; right: 6%; animation-delay: 2s; font-size: 1.5rem; }
.spice-particle:nth-child(3) { bottom: 20%; left: 12%; animation-delay: 4s; font-size: 1.6rem; }
.spice-particle:nth-child(4) { top: 75%; right: 14%; animation-delay: 1s; font-size: 1.3rem; }

@keyframes floatSpice {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(12deg); }
  100% { transform: translateY(6px) rotate(-8deg); }
}

/* Steam Wisp & Fire Glow Effect for Kitchen Cards */
.steam-glow-wrap {
  position: relative;
  overflow: hidden;
}

.steam-glow-wrap::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(232, 200, 77, 0.12) 0%, transparent 65%);
  animation: rotateGlow 12s linear infinite;
  pointer-events: none;
}

@keyframes rotateGlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 3D Magnetic Interactive Buttons */
.magnetic-btn {
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease !important;
}

.magnetic-btn:hover {
  transform: translateY(-3px) scale(1.03) !important;
  box-shadow: 0 10px 28px rgba(170, 130, 10, 0.4) !important;
}
`;

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n' + animationCss.trim() + '\n';
fs.writeFileSync('styles.css', css);
console.log('Appended Catering GSAP-Style Animation CSS to styles.css!');
