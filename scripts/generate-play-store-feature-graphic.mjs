// Generates the Play Store "Feature Graphic" listing asset: exactly
// 1024x500px, opaque (no alpha channel) — per Google Play's requirement.
// Re-run after the brand icon changes; run
// `node scripts/generate-brand-assets.mjs` first so
// src/assets/brand/icon.png is up to date.
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const W = 1024;
const H = 500;

async function main() {
  await mkdir(path.join(ROOT, 'store-assets'), { recursive: true });

  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2563EB" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#14B8A6" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="blob3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22C55E" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#22C55E" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#020617"/>
      <circle cx="100" cy="60" r="270" fill="url(#blob1)"/>
      <circle cx="920" cy="90" r="240" fill="url(#blob2)"/>
      <circle cx="820" cy="440" r="260" fill="url(#blob3)"/>
      <text x="360" y="230" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="38" letter-spacing="1.5" fill="#ffffff">YOUR MONEY MATTERS</text>
      <text x="360" y="280" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="27" fill="#94a3b8">Track. Understand. Grow.</text>
    </svg>
  `);

  const iconSize = 210;
  const iconRadius = 46;
  const iconMask = Buffer.from(
    `<svg width="${iconSize}" height="${iconSize}"><rect width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="#fff"/></svg>`,
  );
  const icon = await sharp(path.join(ROOT, 'src/assets/brand/icon.png'))
    .resize(iconSize, iconSize)
    .composite([{ input: iconMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(bgSvg)
    .composite([{ input: icon, left: 95, top: 145 }])
    .flatten({ background: '#020617' }) // no alpha channel, per Play Store spec
    .png()
    .toFile(path.join(ROOT, 'store-assets/play-store-feature-graphic.png'));

  console.log('Feature graphic generated: store-assets/play-store-feature-graphic.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
