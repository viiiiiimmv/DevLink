const fs = require('fs');

const pngLight = fs.readFileSync('public/logo.png').toString('base64');
const pngDark = fs.readFileSync('public/logo-dark.png').toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313 210" fill="none">
  <style>
    .dark-logo { display: none; }
    .light-logo { display: block; }
    @media (prefers-color-scheme: dark) {
      .dark-logo { display: block; }
      .light-logo { display: none; }
    }
  </style>
  <image class="light-logo" href="data:image/png;base64,${pngDark}" width="313" height="210" />
  <image class="dark-logo" href="data:image/png;base64,${pngLight}" width="313" height="210" />
</svg>`;

fs.writeFileSync('public/logo.svg', svg);

const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313 313" fill="none">
  <rect width="313" height="313" rx="64" fill="#0A0A0A" />
  <image href="data:image/png;base64,${pngLight}" x="0" y="51" width="313" height="210" />
</svg>`;

fs.writeFileSync('public/favicon.svg', favSvg);
console.log('Successfully generated public/logo.svg and public/favicon.svg');

