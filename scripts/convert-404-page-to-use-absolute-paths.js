import fs from 'fs/promises';

const VERCEL_OUTPUT_DIR = '.vercel/output/static';

const path = `${VERCEL_OUTPUT_DIR}/404.html`;
const pattern = /\.\/_app/g;
const replacement = '/_app';

const page = await fs.readFile(path, 'utf-8');
const replaced = page.replaceAll(pattern, replacement);
await fs.writeFile(path, replaced);
