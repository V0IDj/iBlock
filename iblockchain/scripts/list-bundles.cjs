const https = require('https');
https.get('https://iblock-chain.com/assets/index-DwXWGlRe.js', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const matches = [...data.matchAll(/assets\/([^"';]+\.js)/g)];
    const unique = [...new Set(matches.map(m => m[1]))].sort();
    console.log('=== ALL ' + unique.length + ' LIVE SITE BUNDLES ===');
    unique.forEach((b, i) => console.log((i+1) + '. ' + b));
    console.log('\nTotal: ' + unique.length + ' bundles');
  });
}).on('error', e => console.log('Error: ' + e.message));
