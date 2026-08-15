const fs = require('fs');
const path = require('path');

const logPath = 'C:/Users/Spartan/.gemini/antigravity/brain/5a4e0410-9726-4b75-9090-5912589cc230/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n').filter(Boolean);

console.log('Total transcript lines:', lines.length);

// Base files from scratch/zip_extract
const files = {};
const zipDir = 'scratch/zip_extract';
['index.html', 'services.html', 'about.html', 'contact.html', 'gallery.html', 'menu.html', 'styles.css', 'script.js'].forEach(f => {
  if (fs.existsSync(path.join(zipDir, f))) {
    files[f] = fs.readFileSync(path.join(zipDir, f), 'utf8').replace(/\r\n/g, '\n');
  }
});

let applyCount = 0;

for (let i = 0; i <= 1385; i++) {
  try {
    const p = JSON.parse(lines[i]);
    if (p.tool_calls) {
      for (const tc of p.tool_calls) {
        if (tc.args && tc.args.TargetFile) {
          const fname = path.basename(tc.args.TargetFile);
          if (files[fname] !== undefined) {

            if (tc.name === 'write_to_file' && tc.args.CodeContent) {
              files[fname] = tc.args.CodeContent.replace(/\r\n/g, '\n');
              applyCount++;
              console.log(`[Step ${i}] write_to_file -> ${fname} (${files[fname].length} bytes)`);
            } else if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
              const chunks = tc.name === 'multi_replace_file_content' ? tc.args.ReplacementChunks : [tc.args];
              chunks.forEach(chunk => {
                const target = chunk.TargetContent.replace(/\r\n/g, '\n');
                const replacement = chunk.ReplacementContent.replace(/\r\n/g, '\n');

                if (files[fname].includes(target)) {
                  files[fname] = files[fname].replace(target, replacement);
                  applyCount++;
                  console.log(`[Step ${i}] replace_file_content -> ${fname} (EXACT)`);
                } else {
                  // Normalize spaces & line endings
                  const normTarget = target.trim();
                  const normFile = files[fname];

                  if (normFile.includes(normTarget)) {
                    files[fname] = normFile.replace(normTarget, replacement);
                    applyCount++;
                    console.log(`[Step ${i}] replace_file_content -> ${fname} (TRIMMED)`);
                  } else {
                    // Try line-by-line block matching
                    const tLines = target.split('\n').map(l => l.trim()).filter(Boolean);
                    if (tLines.length > 0) {
                      const first = tLines[0];
                      const last = tLines[tLines.length - 1];
                      const fileLines = files[fname].split('\n');
                      let startIdx = -1, endIdx = -1;

                      for (let h = 0; h < fileLines.length; h++) {
                        if (fileLines[h].trim() === first) {
                          for (let e = h; e < Math.min(h + tLines.length + 8, fileLines.length); e++) {
                            if (fileLines[e].trim() === last) {
                              startIdx = h;
                              endIdx = e;
                              break;
                            }
                          }
                          if (startIdx !== -1) break;
                        }
                      }

                      if (startIdx !== -1 && endIdx !== -1) {
                        fileLines.splice(startIdx, endIdx - startIdx + 1, replacement);
                        files[fname] = fileLines.join('\n');
                        applyCount++;
                        console.log(`[Step ${i}] replace_file_content -> ${fname} (FUZZY BLOCK)`);
                      } else {
                        console.log(`[Step ${i}] MISSED replace on ${fname} (Target: "${first.substring(0, 40)}...")`);
                      }
                    }
                  }
                }
              });
            }

          }
        }
      }
    }
  } catch(e) {
    console.error('Error at step', i, e.message);
  }
}

console.log('\n--- RESTORATION SUMMARY ---');
console.log('Total tool replacements applied:', applyCount);

Object.keys(files).forEach(f => {
  fs.writeFileSync(f, files[f]);
  console.log(`Saved: ${f} | Size: ${files[f].length} bytes | Lines: ${files[f].split('\n').length}`);
});
