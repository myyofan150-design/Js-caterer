const fs = require('fs');
const https = require('https');

const candidateUrls = [
  'https://cdn.coverr.co/videos/coverr-campfire-cooking-wrapping-food-in-foil/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-a-wooden-spoon-with-pepper-falls-on-a-table-4647/1080p.mp4'
];

async function tryDownload(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Referer': 'https://coverr.co/'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        console.log(`Following redirect from ${url} -> ${res.headers.location}`);
        return tryDownload(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`Success! File size: ${stats.size} bytes`);
          if (stats.size > 200000) {
            resolve(true);
          } else {
            reject(new Error(`File too small: ${stats.size} bytes`));
          }
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const dest = 'assets/videos/kitchen_heritage.mp4';
  for (const url of candidateUrls) {
    try {
      console.log(`Attempting download from: ${url}`);
      await tryDownload(url, dest);
      console.log('Video download complete!');
      break;
    } catch (e) {
      console.log(`Failed: ${e.message}`);
    }
  }
}

main();
