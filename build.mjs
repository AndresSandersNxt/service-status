import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const output = new URL('./_site/', import.meta.url);
mkdirSync(output, { recursive: true });
cpSync(new URL('./assets/', import.meta.url), new URL('assets/', output), { recursive: true });
let html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
for (const name of ['app.js', 'styles.css', 'status.json', 'favicon.svg']) {
  const content = readFileSync(new URL(name, import.meta.url));
  writeFileSync(new URL(name, output), content);
  if (name === 'app.js' || name === 'styles.css') {
    const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
    html = html.replace(`"${name}"`, `"${name}?v=${version}"`);
  }
}
writeFileSync(new URL('index.html', output), html);
writeFileSync(new URL('.nojekyll', output), '');
console.log('Publieke bestanden met versiegebonden scripts en stijlen verzameld in _site/.');
