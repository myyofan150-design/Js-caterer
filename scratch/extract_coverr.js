const https = require('https');
const fs = require('fs');

const url = 'https://coverr.co/stock-video-footage/cooking';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const mp4Links = html.match(/https:\/\/[^"' ]+?\.mp4[^"' ]*/g) || [];
    console.log('Found MP4 links:', Array.from(new Set(mp4Links)).slice(0, 10));
  });
});
