const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, '..', 'assets', 'videos', 'kitchen_heritage.mp4');
if (fs.existsSync(videoPath)) {
  const stats = fs.statSync(videoPath);
  console.log(`Video file exists! Size: ${stats.size} bytes (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  console.log('Video file DOES NOT exist!');
}
