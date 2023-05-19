import fs from 'fs/promises';

const LOCAL_OUTPUT_DIR = 'build';
const VERCEL_OUTPUT_DIR = '.vercel/output/static';

const directory = process.argv.includes('--vercel') ? VERCEL_OUTPUT_DIR : LOCAL_OUTPUT_DIR;

const path = `${directory}/404.html`;
const pattern = /\.\/_app/g;
const replacement = '/_app';

const page = await fs.readFile(path, 'utf-8');
const replaced = page.replaceAll(pattern, replacement);
await fs.writeFile(path, replaced);
