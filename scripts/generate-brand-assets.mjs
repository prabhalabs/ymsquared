// One-off script that derives every YM² brand asset from the source
// reference artwork. Re-run after replacing the source PNG if the mark
// changes; see openspec/changes/rebrand-ym-squared/design.md for how the
// crop/flatten choices below were made.
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const SOURCE = String.raw`C:\Users\bhanu\Downloads\ChatGPT Image Aug 10, 2026, 02_09_08 AM.png`;
const ROOT = path.resolve(import.meta.dirname, '..');
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

async function main() {
  await mkdir(path.join(ROOT, 'src/assets/brand'), { recursive: true });
  await mkdir(path.join(ROOT, 'public/brand'), { recursive: true });

  // The source PNG has an alpha channel — what looks like a black
  // background in a viewer is actually transparency, not an opaque
  // fill. Flatten it onto true black so every opaque-background
  // derivative (icon, favicon, dark wordmark, OG image) renders
  // correctly instead of leaving transparent pixels that some viewers
  // render as white.
  const opaque = sharp(SOURCE).flatten({ background: BLACK });
  const opaqueBuffer = await opaque.png().toBuffer();

  // Square icon mark: the source (1536x1024) is wider than it is tall,
  // and its "YM²" mark spans nearly the full width, so any hard crop to
  // a 1024x1024 square clips the left "Y" tail and/or the right "2".
  // Letterbox instead — scale the whole mark down to fit within a
  // 1024x1024 square (contain), padded with black top/bottom, so
  // nothing is cut off.
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

  // public/ favicon-family derivatives.
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

  // OG / social share image: full landscape source, standard 1200x630
  // card, letterboxed on black (OG cards are wide — the full lockup
  // reads better here than the square crop).
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
  // wordmark's literal ink color. `Logo.vue`'s `variant` prop follows
  // the same convention ('light' => shown on dark backgrounds).

  // logo-light.png: flattened (opaque black) full landscape source —
  // blends into the site's near-black surfaces (navbar/footer).
  await sharp(opaqueBuffer).png().toFile(
    path.join(ROOT, 'src/assets/brand/logo-light.png'),
  );
  await sharp(opaqueBuffer).png().toFile(
    path.join(ROOT, 'public/brand/logo-light.png'),
  );

  // logo-dark.png: composite the ORIGINAL (alpha-preserving, not
  // flattened) artwork onto a white rounded card, so it reads cleanly
  // on light surfaces such as this README.
  const { width, height } = await sharp(SOURCE).metadata();
  const pad = 96;
  const cardW = width + pad * 2;
  const cardH = height + pad * 2;
  const radius = 48;
  const roundedCard = Buffer.from(
    `<svg width="${cardW}" height="${cardH}">
      <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#ffffff"/>
    </svg>`,
  );
  await sharp(roundedCard)
    .composite([{ input: SOURCE, left: pad, top: pad }])
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
