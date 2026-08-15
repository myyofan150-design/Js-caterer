const fs = require('fs');
const logPath = 'C:/Users/Spartan/.gemini/antigravity/brain/5a4e0410-9726-4b75-9090-5912589cc230/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n').filter(Boolean);

const p = JSON.parse(lines[1149]);
const act8Html = (p.tool_calls[0].args.ReplacementContent || p.tool_calls[0].args.ReplacementChunks[0].ReplacementContent).replace(/\r\n/g, '\n');

let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const s8_start = html.indexOf('<section id="act-8"');
const s8_end = html.indexOf('</section>', s8_start) + 10;

if (s8_start !== -1 && act8Html) {
  html = html.substring(0, s8_start) + act8Html + html.substring(s8_end);
  fs.writeFileSync('index.html', html);
  console.log('Act 8 Executive Business Card Showcase successfully updated!');
}
