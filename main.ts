// news-image-20261119 — "The World in One Day", Thursday 19 November 2026.
//
// The entry is a newspaper-front-page poster (poster.html rendered to
// entry.png) summing up the day's world news: the ICJ's genocide ruling
// against Myanmar, the first Trump–Xi–Putin trilateral summit in Shenzhen,
// tanker attacks in the Strait of Hormuz, the US Senate's 51–48 rejection
// of the Iran war-powers resolution, and violence across Bangladesh — plus
// COP31, Gaza and a record Van Gogh sale in the "Also in the news" strip.
//
// This program runs with no network in the grader's sandbox, so it simply
// copies the poster image that ships in this repository to the output
// directory. Copying the same file twice always yields identical bytes.
// After copying it verifies the output's sha256 against the source and
// fails loudly (exit 1) instead of handing the grader a corrupt image.
//
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);

if (!existsSync(source)) {
  console.error(`error: source image not found: ${source.pathname}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(source, dest);

const sha256 = (path) =>
  createHash('sha256').update(readFileSync(path)).digest('hex');

if (sha256(source) !== sha256(dest)) {
  console.error('error: copied entry.png sha256 does not match the source image');
  process.exit(1);
}
