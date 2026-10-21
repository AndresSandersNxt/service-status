const $ = id => document.getElementById(id);
const statuses = {offline: 'Tijdelijk offline', operational: 'Beschikbaar', degraded: 'Beperkt beschikbaar', unknown: 'Nog niet bevestigd'};
const dateFormat = new Intl.DateTimeFormat('nl-BE', {dateStyle: 'long', timeZone: 'Europe/Brussels'});
const timeFormat = new Intl.DateTimeFormat('nl-BE', {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels'});
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function list(id, items) { $(id).replaceChildren(...items.map(text => element('li', '', text))); }
async function refresh(manual = false) {
  $('refresh').disabled = true;
  try {
    const response = await fetch(`status.json?t=${Date.now()}`, {cache: 'no-store'});
    if (!response.ok) throw new Error('Status kon niet worden geladen');
    const data = await response.json();
    const updated = new Date(data.updatedAt);
    if (!Number.isFinite(updated.getTime()) || !Array.isArray(data.services) || !Array.isArray(data.updates)) throw new Error('Ongeldige statusinformatie');
    document.title = data.title;
    $('updated').textContent = `Laatst bijgewerkt op ${dateFormat.format(updated)} om ${timeFormat.format(updated)}`;
    $('phase').textContent = data.incident.phase;
    $('incident-title').textContent = data.incident.title;
    $('summary').textContent = data.incident.summary;
    $('expectation').textContent = data.incident.expectation;
    $('assurance').textContent = data.assurance;
    list('available', data.available);
    list('unavailable', data.unavailable);
    $('service-list').replaceChildren(...data.services.map(service => {
      const status = Object.hasOwn(statuses, service.status) ? service.status : 'unknown';
      const row = element('div', 'service-row');
      const badge = element('span', `badge status-${status}`);
      badge.append(element('span', 'dot'), document.createTextNode(statuses[status]));
      row.append(element('span', 'service-name', service.name), badge);
      return row;
    }));
    $('updates-list').replaceChildren(...data.updates.map(update => {
      const row = element('article', 'update');
      const stamp = element('div');
      const date = element('time', '', dateFormat.format(new Date(`${update.date}T12:00:00+02:00`)));
      date.dateTime = update.date;
      stamp.append(date, element('span', 'update-label', update.label));
      const body = element('div');
      body.append(element('h3', '', update.title), element('p', '', update.body));
      row.append(stamp, body);
      return row;
    }));
    $('content').hidden = false;
    $('feedback').textContent = manual ? 'De laatste statusinformatie is opgehaald.' : '';
  } catch {
    $('feedback').textContent = $('content').hidden ? 'De statusinformatie kon niet worden geladen. Probeer opnieuw via Vernieuwen.' : 'Vernieuwen is niet gelukt. De laatst opgehaalde informatie blijft zichtbaar.';
  } finally { $('refresh').disabled = false; }
}
$('refresh').addEventListener('click', () => refresh(true));
refresh();
setInterval(() => { if (!document.hidden) refresh(); }, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
