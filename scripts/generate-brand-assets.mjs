// One-off script that derives every YM² brand asset from the source
// reference artwork. Re-run after replacing the source PNG if the mark
// changes; see openspec/changes/rebrand-ym-squared/design.md for the
// history behind these choices.
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

// Shaded teal-ribbon "YM²" wordmark, flattened onto its own off-white paper
// background (not natively transparent) — the single source for every
// derived asset. extractTransparent() below recovers alpha via a
// color-distance chroma-key so it can still sit directly on arbitrary
// surfaces for the on-page wordmark, OG icon chip, and logo-light/dark.
const SOURCE = String.raw`C:\Users\bhanu\Downloads\ChatGPT Image Sep 8, 2026, 01_34_41 AM.png`;
// Pre-composed app-icon glyph: deep-teal rounded square (genuinely
// transparent outside it) with the ivory ribbon mark already inset — used
// only for the square favicon/app-icon family (it's a purpose-built icon,
// not the wordmark, so it doesn't feed the on-page logo, OG card, or
// logo-light/dark).
const FAVICON_SOURCE = String.raw`C:\Users\bhanu\Downloads\ChatGPT Image Sep 8, 2026, 01_53_08 AM.png`;

const ROOT = path.resolve(import.meta.dirname, '..');
// Warm Ivory — the site's light-neutral background — used as the
// flatten/letterbox color so favicons/app icons/OG chips match the on-page
// surface instead of a generic black or mismatched-off-white square.
const FLATTEN_BG = { r: 244, g: 240, b: 231, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// Recovers alpha transparency from a flattened image via color distance
// from its own sampled background color, with a soft threshold band (t0-t1)
// so anti-aliased ink edges fade out instead of leaving a hard cutout ring.
async function extractTransparent(sourcePath, bg, { t0 = 24, t1 = 70 } = {}) {
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, p = 0; i < data.length; i += info.channels, p += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.hypot(r - bg.r, g - bg.g, b - bg.b);
    const alpha = dist <= t0 ? 0 : dist >= t1 ? 255 : Math.round(((dist - t0) / (t1 - t0)) * 255);
    out[p] = r;
    out[p + 1] = g;
    out[p + 2] = b;
    out[p + 3] = alpha;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function main() {
  await mkdir(path.join(ROOT, 'src/assets/brand'), { recursive: true });
  await mkdir(path.join(ROOT, 'public/brand'), { recursive: true });

  const { data: cornerPixel } = await sharp(SOURCE)
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sourceBg = { r: cornerPixel[0], g: cornerPixel[1], b: cornerPixel[2] };

  const transparentSource = await extractTransparent(SOURCE, sourceBg);

  // Crop tight to the visible mark (alpha-based trim, now that transparency
  // has been recovered) then add an EQUAL amount of padding back on all
  // four sides — a single, simple operation that guarantees symmetric
  // breathing room around the mark, instead of a letterbox-style crop that
  // only pads top/bottom, unevenly, to force a square.
  const trimmed = await sharp(transparentSource).trim({ threshold: 10 }).png().toBuffer();
  const PAD = 120;
  const padded = sharp(trimmed).extend({
    top: PAD,
    bottom: PAD,
    left: PAD,
    right: PAD,
    background: TRANSPARENT,
  });
  const paddedBuffer = await padded.png().toBuffer();

  // On-page logo mark (navbar/footer/masthead): kept transparent so it
  // sits directly on the site's light surfaces with no visible edge/box.
  await sharp(paddedBuffer).png().toFile(
    path.join(ROOT, 'src/assets/brand/icon-wide.png'),
  );
  // Pre-resized copy for actual on-page use — the mark never renders
  // taller than ~52px, so shipping the full-resolution master to the
  // browser would be far more image data than ever gets displayed.
  await sharp(paddedBuffer).resize(200).png().toFile(
    path.join(ROOT, 'src/assets/brand/icon-wide-200.png'),
  );

  // Everything below needs an opaque background (favicons/OG cards can
  // land on an arbitrary page background, so transparency isn't safe
  // there) — flatten the same equally-padded crop onto ivory.
  const opaqueBuffer = await sharp(paddedBuffer)
    .flatten({ background: FLATTEN_BG })
    .png()
    .toBuffer();

  // Square favicon/app-icon family: crop the pre-composed icon glyph tight
  // (alpha-based trim). The glyph itself isn't quite square (~1110x1060),
  // so use cover-fit rather than contain — contain would letterbox the
  // short axis with FLATTEN_BG, leaving a visible seam around the rounded
  // corners; cover crops the small overshoot instead, which lands in the
  // icon's own background margin, not the wordmark.
  const faviconTrimmed = await sharp(FAVICON_SOURCE).trim({ threshold: 10 }).png().toBuffer();
  const iconSquare = sharp(faviconTrimmed).resize(1024, 1024, {
    fit: 'cover',
  });
  await iconSquare.clone().png().toFile(
    path.join(ROOT, 'src/assets/brand/icon.png'),
  );
  await iconSquare
    .clone()
    .resize(128, 128)
    .png()
    .toFile(path.join(ROOT, 'src/assets/brand/icon-128.png'));
  await iconSquare
    .clone()
    .resize(512, 512)
    .png()
    .toFile(path.join(ROOT, 'public/icon.png'));
  await iconSquare
    .clone()
    .resize(180, 180)
    .png()
    .toFile(path.join(ROOT, 'public/apple-touch-icon.png'));

  const icoSource = path.join(ROOT, '.tmp-favicon-256.png');
  await iconSquare.clone().resize(256, 256).png().toFile(icoSource);
  const icoBuffer = await pngToIco(icoSource);
  await writeFile(path.join(ROOT, 'public/favicon.ico'), icoBuffer);
  await unlink(icoSource);

  // OG / social share image: a composed card (icon chip + "YOUR MONEY
  // MATTERS" title + tagline) on a plain warm-ivory background — not just
  // the bare logo mark letterboxed onto black, which reads as unfinished
  // in link-preview contexts. The title is "YOUR MONEY MATTERS" rather
  // than "YM²" since the icon chip already visually reads as "YM²" — same
  // no-redundant-text reasoning applied to the on-page navbar/footer
  // logo lockup. Caps + letter-spacing matches the site's established
  // eyebrow/label typographic convention (see Logo.vue's tagline,
  // SectionHeading's eyebrow, etc.).
  const OG_W = 1200;
  const OG_H = 630;
  const ogBackground = Buffer.from(`
    <svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${OG_W}" height="${OG_H}" fill="#F4F0E7"/>
      <text x="470" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="46" letter-spacing="2" fill="#101918">YOUR MONEY MATTERS</text>
      <text x="470" y="365" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="34" fill="#4F5D57">Track. Understand. Grow.</text>
    </svg>
  `);

  const ogIconSize = 260;
  const ogIconRadius = 56;
  const ogIconMask = Buffer.from(
    `<svg width="${ogIconSize}" height="${ogIconSize}"><rect width="${ogIconSize}" height="${ogIconSize}" rx="${ogIconRadius}" ry="${ogIconRadius}" fill="#fff"/></svg>`,
  );
  const ogIcon = await sharp(opaqueBuffer)
    .resize(1024, 1024, { fit: 'contain', background: FLATTEN_BG })
    .resize(ogIconSize, ogIconSize)
    .composite([{ input: ogIconMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(ogBackground)
    .composite([{ input: ogIcon, left: 120, top: 185 }])
    .png()
    .toFile(path.join(ROOT, 'public/og-image.png'));

  // Per this repo's established naming convention (see README.md's
  // "Brand assets" section, which predates this rebrand and is
  // authoritative): `logo-light.png` is the variant used ON DARK
  // surfaces (e.g. the navbar), and `logo-dark.png` is the variant used
  // ON LIGHT surfaces (e.g. this README on GitHub's white background) —
  // the name describes the surface's own contrast partner, not the
  // wordmark's literal ink color.

  await sharp(opaqueBuffer).png().toFile(
    path.join(ROOT, 'src/assets/brand/logo-light.png'),
  );
  await sharp(opaqueBuffer).png().toFile(
    path.join(ROOT, 'public/brand/logo-light.png'),
  );

  // logo-dark.png: composite the padded (still-transparent) mark onto a
  // white rounded card, so it reads cleanly on light surfaces.
  const { width, height } = await sharp(paddedBuffer).metadata();
  const cardPad = 80;
  const cardW = width + cardPad * 2;
  const cardH = height + cardPad * 2;
  const radius = 48;
  const roundedCard = Buffer.from(
    `<svg width="${cardW}" height="${cardH}">
      <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#ffffff"/>
    </svg>`,
  );
  await sharp(roundedCard)
    .composite([{ input: paddedBuffer, left: cardPad, top: cardPad }])
    .png()
    .toFile(path.join(ROOT, 'src/assets/brand/logo-dark.png'));
  await sharp(path.join(ROOT, 'src/assets/brand/logo-dark.png'))
    .png()
    .toFile(path.join(ROOT, 'public/brand/logo-dark.png'));

  console.log('Brand assets generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
