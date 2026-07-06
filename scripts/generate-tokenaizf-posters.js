const fs = require("fs");
const path = require("path");

const configPath = path.join(process.cwd(), "configs", "tokenaizf-posters.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const width = 1080;
const height = 1440;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function posterSvg(poster, index) {
  const pointRows = poster.points
    .map((point, idx) => {
      const y = 650 + idx * 110;
      return `
        <g transform="translate(96 ${y})">
          <rect x="0" y="0" width="888" height="76" rx="18" fill="#101827" stroke="#23324a"/>
          <circle cx="40" cy="38" r="14" fill="${idx % 2 === 0 ? "#22d3ee" : "#e879f9"}"/>
          <text x="78" y="48" font-size="34" fill="#e8eefc" font-weight="600">${escapeXml(point)}</text>
        </g>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#e879f9"/>
    </linearGradient>
    <radialGradient id="softGlow" cx="50%" cy="20%" r="70%">
      <stop offset="0" stop-color="#23405f"/>
      <stop offset="0.48" stop-color="#111827"/>
      <stop offset="1" stop-color="#070b12"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
    <style>
      text { font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", Arial, sans-serif; }
    </style>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#softGlow)"/>
  <path d="M0 0 H1080 V1440 H0 Z" fill="#070b12" opacity="0.2"/>
  <path d="M80 250 C220 120, 410 120, 540 250 S860 390, 1000 240" stroke="#22d3ee" stroke-width="2" opacity="0.16" fill="none"/>
  <path d="M40 1180 C260 1040, 390 1290, 580 1160 S860 1020, 1040 1160" stroke="#e879f9" stroke-width="2" opacity="0.16" fill="none"/>

  <g transform="translate(84 82)">
    <rect x="0" y="0" width="116" height="116" rx="28" fill="#0d1320" stroke="#22d3ee" stroke-opacity="0.32" stroke-width="2"/>
    <polyline points="35,43 23,58 35,73" fill="none" stroke="#22d3ee" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="81,43 93,58 81,73" fill="none" stroke="#e879f9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="url(#brandGradient)" stroke-width="10" stroke-linecap="round">
      <circle cx="58" cy="43" r="15"/>
      <circle cx="58" cy="76" r="19"/>
    </g>
    <text x="144" y="48" font-size="34" fill="#ffffff" font-weight="700">${escapeXml(config.brand)}</text>
    <text x="144" y="88" font-size="24" fill="#9fb0c8">AI API Gateway</text>
  </g>

  <g filter="url(#shadow)">
    <rect x="64" y="260" width="952" height="1000" rx="34" fill="#0b111d" stroke="#20314a"/>
  </g>
  <rect x="96" y="292" width="888" height="220" rx="28" fill="#101827" stroke="#253753"/>
  <text x="120" y="390" font-size="76" fill="#ffffff" font-weight="800">${escapeXml(poster.title)}</text>
  <text x="120" y="458" font-size="34" fill="#b7c5dd" font-weight="500">${escapeXml(poster.subtitle)}</text>
  <rect x="120" y="520" width="290" height="8" rx="4" fill="url(#brandGradient)"/>

  ${pointRows}

  <g transform="translate(96 1120)">
    <rect x="0" y="0" width="888" height="98" rx="24" fill="#07101a" stroke="#243a55"/>
    <text x="38" y="62" font-size="32" fill="#e7f2ff" font-weight="700">${escapeXml(poster.footer)}</text>
    <text x="650" y="62" font-size="28" fill="#70e1f5" font-weight="700">Search / scan to enter</text>
  </g>

  <text x="84" y="1340" font-size="25" fill="#71829d">For lawful learning, development, and testing workflows only</text>
  <text x="970" y="1340" font-size="25" fill="#71829d" text-anchor="end">0${index + 1}</text>
</svg>`;
}

for (const [index, poster] of config.posters.entries()) {
  const target = path.join(process.cwd(), poster.file);
  const svgPath = target.replace(/\.png$/i, ".svg");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(svgPath, posterSvg(poster, index), "utf8");
  console.log(`Generated ${svgPath}`);
}

console.log("SVG posters generated. Convert them to PNG with a browser or ImageMagick if needed.");
