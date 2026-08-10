// One-off script that derives every YM² brand asset from the source
// reference artwork. Re-run after replacing the source PNG if the mark
// changes; see openspec/changes/rebrand-ym-squared/design.md for the
// history behind these choices.
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

// Soft-glow wordmark artwork, genuinely transparent (RGBA) outside the
// mark itself — the single source for every derived asset.
const SOURCE = String.raw`C:\Users\bhanu\Downloads\TRANSPARENT.png`;

const ROOT = path.resolve(import.meta.dirname, '..');
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function main() {
  await mkdir(path.join(ROOT, 'src/assets/brand'), { recursive: true });
  await mkdir(path.join(ROOT, 'public/brand'), { recursive: true });

  // Crop tight to the visible glow (sharp's trim, alpha-based) then add
  // an EQUAL amount of padding back on all four sides — a single,
  // simple operation that guarantees symmetric breathing room around
  // the mark, instead of the letterbox-style crops used previously
  // (which only padded top/bottom, unevenly, to force a square).
  const trimmed = await sharp(SOURCE).trim({ threshold: 10 }).png().toBuffer();
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
  // sits directly on the site's dark surfaces with no visible edge/box.
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
  // there) — flatten the same equally-padded crop onto black.
  const opaqueBuffer = await sharp(paddedBuffer)
    .flatten({ background: BLACK })
    .png()
    .toBuffer();

  // Square favicon/app-icon family: letterbox (contain-fit) the padded
  // mark into a square canvas.
  const iconSquare = sharp(opaqueBuffer).resize(1024, 1024, {
    fit: 'contain',
    background: BLACK,
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

  // OG / social share image: 1200x630 card, letterboxed on black.
  await sharp(opaqueBuffer)
    .resize(1200, 630, { fit: 'contain', background: BLACK })
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
