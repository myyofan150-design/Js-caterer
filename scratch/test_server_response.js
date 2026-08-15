const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log(`Server HTTP Status Code: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Received ${data.length} bytes of HTML from server.`);
    if (data.includes('heroTopProgressBar') && data.includes('heroSlideshow')) {
      console.log('SUCCESS: Page contains both heroTopProgressBar and heroSlideshow!');
    } else {
      console.log('WARNING: Missing elements in HTML!');
    }
  });
}).on('error', (err) => {
  console.log(`HTTP Error: ${err.message}`);
});
