const fs = require('fs');

const jumpPillJs = `

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
`;

let js = fs.readFileSync('script.js', 'utf8');
js += '\n' + jumpPillJs.trim() + '\n';
fs.writeFileSync('script.js', js);
console.log('Added smooth scroll listener with 135px header offset in script.js!');
