const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const { window } = dom;

console.log('Testing JS execution in JSDOM...');

// Attach script content
const scriptEl = window.document.createElement('script');
scriptEl.textContent = script;
window.document.body.appendChild(scriptEl);

// Dispatch DOMContentLoaded
const event = window.document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
window.document.dispatchEvent(event);

setTimeout(() => {
  const heroSlideNum = window.document.getElementById('heroSlideNum');
  const heroSlideLbl = window.document.getElementById('heroSlideLbl');
  const heroTopProgressFill = window.document.getElementById('heroTopProgressFill');

  console.log('Hero Slide Num:', heroSlideNum ? heroSlideNum.textContent : 'NULL');
  console.log('Hero Slide Lbl:', heroSlideLbl ? heroSlideLbl.textContent : 'NULL');
  console.log('Hero Progress Width:', heroTopProgressFill ? heroTopProgressFill.style.width : 'NULL');
}, 1000);
