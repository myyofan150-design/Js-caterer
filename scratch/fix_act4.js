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

// 1. Replace Act 4 (#act-4)
const s4_start = html.indexOf('<section id="act-4"');
const s4_end = html.indexOf('</section>', s4_start) + 10;
const act4_new = getStepContent(1070).replace(/\r\n/g, '\n');

if (s4_start !== -1 && act4_new) {
  html = html.substring(0, s4_start) + act4_new + html.substring(s4_end);
  console.log('Act 4 updated with exact matching classes!');
}

fs.writeFileSync('index.html', html);
console.log('Act 4 fix saved! Total index.html size:', html.length, 'Lines:', html.split('\n').length);
