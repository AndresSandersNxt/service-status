import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const data = JSON.parse(readFileSync(new URL('./status.json', import.meta.url)));
const text = value => assert.equal(typeof value, 'string');
text(data.title);
assert.ok(Number.isFinite(Date.parse(data.updatedAt)), 'updatedAt moet een geldige datum zijn');
for (const key of ['title', 'summary', 'phase', 'expectation']) text(data.incident[key]);
assert.ok(Array.isArray(data.services));
for (const service of data.services) {
  text(service.name);
  assert.ok(['offline', 'operational', 'degraded', 'unknown'].includes(service.status), 'Onbekende dienststatus');
}
for (const key of ['available', 'unavailable']) { assert.ok(Array.isArray(data[key])); data[key].forEach(text); }
text(data.assurance);
assert.ok(Array.isArray(data.updates));
for (const update of data.updates) {
  for (const key of ['date', 'label', 'title', 'body']) text(update[key]);
  assert.match(update.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Number.isFinite(Date.parse(update.date)));
}
console.log('Statusgegevens gecontroleerd.');
