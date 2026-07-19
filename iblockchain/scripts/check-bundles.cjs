const https = require('https');
https.get('https://iblock-chain.com/assets/index-DwXWGlRe.js', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const matches = [...data.matchAll(/assets\/([^"';]+\.js)/g)];
    const all = [...new Set(matches.map(m => m[1]))].sort();
    console.log('ADMIN (' + all.filter(b => b.startsWith('Admin')).length + '):');
    all.filter(b => b.startsWith('Admin')).forEach(b => console.log('  ' + b));
    console.log('\nDASHBOARD (' + all.filter(b => b.startsWith('Dashboard')).length + '):');
    all.filter(b => b.startsWith('Dashboard')).forEach(b => console.log('  ' + b));
    console.log('\nTOTAL: ' + all.length + ' bundles');
  });
}).on('error', e => console.log('Error: ' + e.message));
