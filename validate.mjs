import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const data = JSON.parse(readFileSync(new URL('./status.json', import.meta.url)));
const text = value => {
  assert.equal(typeof value, 'string');
  assert.ok(value.trim(), 'Tekst mag niet leeg zijn');
};
function validateContent(content) {
  text(content.title);
  for (const key of ['title', 'summary', 'phase', 'expectation']) text(content.incident[key]);
  for (const key of ['available', 'unavailable']) { assert.ok(Array.isArray(content[key])); content[key].forEach(text); }
  text(content.assurance);
  text(content.contractInstructions);
  for (const key of ['title', 'body']) text(content.communicationAdvice[key]);
  assert.ok(Array.isArray(content.updates));
  for (const update of content.updates) {
    for (const key of ['timestamp', 'label', 'title', 'body']) text(update[key]);
    assert.match(update.timestamp, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/, 'Updates moeten een tijdstip met tijdzone bevatten');
    assert.ok(Number.isFinite(Date.parse(update.timestamp)), 'Ongeldig tijdstip voor update');
  }
}
assert.ok(Number.isFinite(Date.parse(data.updatedAt)), 'updatedAt moet een geldige datum zijn');
assert.ok(Array.isArray(data.services));
for (const service of data.services) {
  text(service.name);
  assert.ok(['offline', 'operational', 'degraded', 'unknown'].includes(service.status), 'Onbekende dienststatus');
  if (service.access !== undefined) assert.equal(service.access, 'vpn', 'Onbekende toegangsbeperking');
  if (service.maintenanceStartsAt !== undefined) {
    text(service.maintenanceStartsAt);
    assert.match(service.maintenanceStartsAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/, 'Gepland onderhoud moet een tijdstip met tijdzone bevatten');
    assert.ok(Number.isFinite(Date.parse(service.maintenanceStartsAt)), 'Ongeldig tijdstip voor gepland onderhoud');
  }
  if (service.localizedNames) for (const language of ['en', 'fr']) text(service.localizedNames[language]);
}
validateContent(data);
for (const language of ['en', 'fr']) {
  const translation = data.translations?.[language];
  assert.ok(translation, `Vertaling ontbreekt: ${language}`);
  validateContent(translation);
  for (const key of ['available', 'unavailable']) assert.equal(translation[key].length, data[key].length, `${language}: ${key} moet evenveel items bevatten`);
  assert.deepEqual(translation.updates.map(update => update.timestamp), data.updates.map(update => update.timestamp), `${language}: tijdstippen van updates moeten overeenkomen met de Nederlandse updates`);
}
console.log('Statusgegevens gecontroleerd in het Nederlands, Engels en Frans.');
