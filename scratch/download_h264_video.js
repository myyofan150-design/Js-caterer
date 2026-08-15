const fs = require('fs');
const https = require('https');

const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-slicing-vegetables-42790-large.mp4';
const dest = 'assets/videos/kitchen_heritage.mp4';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'video/webm,video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Referer': 'https://mixkit.co/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Success! File size: ${fs.statSync(destPath).size} bytes`);
          resolve(true);
        });
      });
    });
    req.on('error', reject);
  });
}

downloadFile('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', dest)
  .then(() => console.log('Downloaded sample MP4'))
  .catch(console.error);
