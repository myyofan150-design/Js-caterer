const fs = require('fs');
const logPath = 'C:/Users/Spartan/.gemini/antigravity/brain/5a4e0410-9726-4b75-9090-5912589cc230/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n').filter(Boolean);

function getStepContent(stepIdx) {
  const p = JSON.parse(lines[stepIdx]);
  let result = '';
  p.tool_calls.forEach(tc => {
    if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('index.html')) {
      result = tc.args.ReplacementContent || (tc.args.ReplacementChunks && tc.args.ReplacementChunks[0].ReplacementContent);
    }
  });
  return result;
}

let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Replace Act 5 (#act-5)
const s5_start = html.indexOf('<section id="act-5"');
const s5_end = html.indexOf('</section>', s5_start) + 10;
const act5_new = getStepContent(1100).replace(/\r\n/g, '\n');

if (s5_start !== -1 && act5_new) {
  html = html.substring(0, s5_start) + act5_new + html.substring(s5_end);
  console.log('Act 5 updated with exact matching classes!');
}

// 2. Replace Act 8 (#act-8)
const s8_start = html.indexOf('<section id="act-8"');
const s8_end = html.indexOf('</section>', s8_start) + 10;
const act8_new = getStepContent(1149).replace(/\r\n/g, '\n');

if (s8_start !== -1 && act8_new) {
  html = html.substring(0, s8_start) + act8_new + html.substring(s8_end);
  console.log('Act 8 updated with exact matching classes!');
}

fs.writeFileSync('index.html', html);
console.log('Distortion fix applied to index.html! Size:', html.length, 'Lines:', html.split('\n').length);
