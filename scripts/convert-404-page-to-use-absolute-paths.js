import fs from 'fs/promises';

const path = 'build/404.html';
const pattern = /\.\/_app/g;
const replacement = '/_app';

const page = await fs.readFile(path, 'utf-8');
const replaced = page.replaceAll(pattern, replacement);
await fs.writeFile(path, replaced);
