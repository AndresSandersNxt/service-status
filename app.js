const $ = id => document.getElementById(id);
const messages = {
  nl: {
    locale: 'nl-BE', title: 'Servicestatus', home: 'Servicestatus — startpagina', language: 'Taal',
    description: 'De actuele beschikbaarheid van onze applicaties, bekende verstoringen en updates over herstel.',
    skip: 'Naar de inhoud', publicPage: 'Publieke statuspagina', eyebrow: 'BESCHIKBAARHEID & UPDATES',
    headingFirst: 'Hoe staan onze', headingSecond: 'applicaties ervoor?',
    intro: 'Bekijk wat beschikbaar is, waar er een probleem is en wat we doen om het op te lossen.',
    refresh: 'Vernieuwen', currentIncident: 'Actuele melding', recovery: 'Verwacht herstel', overview: 'OVERZICHT',
    completeLabel: 'VEILIGHEIDSUPDATE AFGEROND', completeTitle: 'Alles weer online.',
    completeBody: 'Alle applicaties zijn bijgewerkt en opnieuw beschikbaar. Bedankt voor je geduld.',
    pauseAnimation: 'Animatie pauzeren', playAnimation: 'Animatie afspelen',
    resolved: 'Veiligheidsupdate afgerond', recoveryComplete: 'Herstel afgerond',
    progressLabel: 'VEILIGHEIDSUPDATE', progressTitle: 'De update is in uitvoering.',
    progressBody: 'We werken aan het veilig opnieuw beschikbaar maken van de applicaties. Zodra er nieuws is, lees je het hier.',
    services: 'Status per applicatie', manual: 'Handmatig bijgewerkt',
    belgiumOnly: 'Alleen in België beschikbaar', vpnOnly: 'Alleen via VPN beschikbaar', latest: 'LAATSTE INFORMATIE', updates: 'Updates',
    maintenanceOffline: time => `Tijdelijk offline voor onderhoud vanaf ${time}`,
    footer: 'Een helder overzicht. Bijgewerkt zodra er nieuwe informatie is.', timezone: 'Alle tijden zijn Belgische tijd.',
    loading: 'Statusinformatie wordt geladen…', updated: (date, time) => `Laatst bijgewerkt op ${date} om ${time}`,
    refreshed: 'De laatste statusinformatie is opgehaald.',
    loadError: 'De statusinformatie kon niet worden geladen. Probeer opnieuw via Vernieuwen.',
    refreshError: 'Vernieuwen is niet gelukt. De laatst opgehaalde informatie blijft zichtbaar.',
    statuses: {offline: 'Tijdelijk offline', operational: 'Beschikbaar', degraded: 'Beperkt beschikbaar', unknown: 'Nog niet bevestigd'}
  },
  en: {
    locale: 'en-GB', title: 'Service status', home: 'Service status — home', language: 'Language',
    description: 'The current availability of our applications, known disruptions and recovery updates.',
    skip: 'Skip to content', publicPage: 'Public status page', eyebrow: 'AVAILABILITY & UPDATES',
    headingFirst: 'How are our', headingSecond: 'applications doing?',
    intro: 'See what is available, where there is a problem and what we are doing to resolve it.',
    refresh: 'Refresh', currentIncident: 'Current incident', recovery: 'Expected recovery', overview: 'OVERVIEW',
    completeLabel: 'SECURITY UPDATE COMPLETED', completeTitle: 'Everything is back online.',
    completeBody: 'All applications have been updated and are available again. Thank you for your patience.',
    pauseAnimation: 'Pause animation', playAnimation: 'Play animation',
    resolved: 'Security update complete', recoveryComplete: 'Recovery complete',
    progressLabel: 'SECURITY UPDATE', progressTitle: 'The update is in progress.',
    progressBody: 'We’re working to bring the applications back online safely. As soon as there’s news, you’ll find it here.',
    services: 'Status by application', manual: 'Manually updated',
    belgiumOnly: 'Available in Belgium only', vpnOnly: 'Available via VPN only', latest: 'LATEST INFORMATION', updates: 'Updates',
    maintenanceOffline: time => `Temporarily offline for maintenance from ${time}`,
    footer: 'A clear overview. Updated as soon as new information is available.', timezone: 'All times are Belgian time.',
    loading: 'Loading status information…', updated: (date, time) => `Last updated on ${date} at ${time}`,
    refreshed: 'The latest status information has been retrieved.',
    loadError: 'Status information could not be loaded. Please try again using Refresh.',
    refreshError: 'Refresh failed. The last retrieved information remains visible.',
    statuses: {offline: 'Temporarily offline', operational: 'Available', degraded: 'Partially available', unknown: 'Not yet confirmed'}
  },
  fr: {
    locale: 'fr-BE', title: 'État des services', home: 'État des services — accueil', language: 'Langue',
    description: 'La disponibilité actuelle de nos applications, les perturbations connues et les mises à jour sur le rétablissement.',
    skip: 'Aller au contenu', publicPage: 'Page de statut publique', eyebrow: 'DISPONIBILITÉ & ACTUALITÉS',
    headingFirst: 'Quel est l’état de', headingSecond: 'nos applications ?',
    intro: 'Consultez les services disponibles, les problèmes en cours et les mesures prises pour les résoudre.',
    refresh: 'Actualiser', currentIncident: 'Incident en cours', recovery: 'Rétablissement prévu', overview: 'VUE D’ENSEMBLE',
    completeLabel: 'MISE À JOUR DE SÉCURITÉ TERMINÉE', completeTitle: 'Tout est de nouveau en ligne.',
    completeBody: 'Toutes les applications ont été mises à jour et sont de nouveau disponibles. Merci pour votre patience.',
    pauseAnimation: 'Mettre l’animation en pause', playAnimation: 'Animer',
    resolved: 'Mise à jour de sécurité terminée', recoveryComplete: 'Rétablissement terminé',
    progressLabel: 'MISE À JOUR DE SÉCURITÉ', progressTitle: 'La mise à jour est en cours.',
    progressBody: 'Nous travaillons à remettre les applications en ligne en toute sécurité. Dès qu’il y aura du nouveau, vous le lirez ici.',
    services: 'État par application', manual: 'Mise à jour manuelle',
    belgiumOnly: 'Disponible en Belgique uniquement', vpnOnly: 'Disponible uniquement via VPN', latest: 'DERNIÈRES INFORMATIONS', updates: 'Mises à jour',
    maintenanceOffline: time => `Temporairement hors ligne pour maintenance à partir de ${time}`,
    footer: 'Une vue d’ensemble claire. Mise à jour dès que de nouvelles informations sont disponibles.', timezone: 'Toutes les heures sont indiquées à l’heure belge.',
    loading: 'Chargement des informations de statut…', updated: (date, time) => `Dernière mise à jour le ${date} à ${time}`,
    refreshed: 'Les dernières informations de statut ont été récupérées.',
    loadError: 'Impossible de charger les informations de statut. Réessayez en cliquant sur Actualiser.',
    refreshError: 'L’actualisation a échoué. Les dernières informations récupérées restent affichées.',
    statuses: {offline: 'Temporairement hors ligne', operational: 'Disponible', degraded: 'Partiellement disponible', unknown: 'Pas encore confirmé'}
  }
};
const supportedLanguage = value => Object.hasOwn(messages, value);
let savedLanguage;
try { savedLanguage = localStorage.getItem('status-language'); } catch { /* Language selection also works without storage. */ }
const requestedLanguage = new URL(window.location.href).searchParams.get('lang');
let language = supportedLanguage(requestedLanguage) ? requestedLanguage : supportedLanguage(savedLanguage) ? savedLanguage : 'nl';
let currentData;
let feedback = '';
let motionPaused = false;
function renderMotion() {
  $('update-complete').classList.toggle('motion-paused', motionPaused);
  $('complete-motion').setAttribute('aria-pressed', String(motionPaused));
  $('complete-motion-label').textContent = messages[language][motionPaused ? 'playAnimation' : 'pauseAnimation'];
  $('complete-motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
}
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function render() {
  const copy = messages[language];
  document.documentElement.lang = copy.locale;
  document.title = copy.title;
  document.querySelector('.brand').href = `./?lang=${language}`;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = copy[node.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(node => { node.setAttribute('aria-label', copy[node.dataset.i18nAriaLabel]); });
  document.querySelectorAll('[data-language]').forEach(link => {
    if (link.dataset.language === language) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
    const url = new URL(window.location.href);
    url.searchParams.set('lang', link.dataset.language);
    link.href = url.href;
  });
  renderMotion();
  $('feedback').textContent = feedback ? copy[feedback] : '';
  if (!currentData) { $('updated').textContent = copy.loading; return; }
  const data = language === 'nl' ? currentData : currentData.translations[language];
  $('update-progress').hidden = currentData.updateInProgress !== true;
  const updateCompleted = currentData.updateInProgress === false && currentData.services.length > 0
    && currentData.services.every(service => service.status === 'operational' && (!service.access || service.access === 'vpn') && !service.maintenanceStartsAt);
  $('update-complete').hidden = !updateCompleted;
  const vpnServices = currentData.services.filter(service => service.access === 'vpn');
  $('complete-body').textContent = copy.completeBody + vpnServices.map(service =>
    ` ${service.localizedNames?.[language] || service.name}: ${copy.vpnOnly}.`).join('');
  $('incident').classList.toggle('incident-resolved', updateCompleted);
  $('incident-note').textContent = updateCompleted ? copy.resolved : copy.currentIncident;
  $('recovery-label').textContent = updateCompleted ? copy.recoveryComplete : copy.recovery;
  const dateFormat = new Intl.DateTimeFormat(copy.locale, {dateStyle: 'long', timeZone: 'Europe/Brussels'});
  const timeFormat = new Intl.DateTimeFormat(copy.locale, {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels'});
  const updated = new Date(currentData.updatedAt);
  document.title = data.title;
  $('updated').textContent = copy.updated(dateFormat.format(updated), timeFormat.format(updated));
  $('incident-title').textContent = data.incident.title;
  $('summary').textContent = data.incident.summary;
  $('expectation').textContent = data.incident.expectation;
  $('communication-title').textContent = data.communicationAdvice.title;
  $('communication-body').textContent = data.communicationAdvice.body;
  $('service-list').replaceChildren(...currentData.services.map(service => {
    const status = Object.hasOwn(copy.statuses, service.status) ? service.status : 'unknown';
    const row = element('div', 'service-row');
    const details = element('div', 'service-status');
    const badge = element('span', `badge status-${status}`);
    const accessLabel = { belgium: copy.belgiumOnly, vpn: copy.vpnOnly }[service.access];
    const statusLabel = status === 'operational' && accessLabel ? accessLabel : copy.statuses[status];
    badge.append(element('span', 'dot'), document.createTextNode(statusLabel));
    details.append(badge);
    if (service.maintenanceStartsAt && status !== 'offline') {
      const start = new Date(service.maintenanceStartsAt);
      const notice = element('time', 'maintenance-note', copy.maintenanceOffline(timeFormat.format(start)));
      notice.dateTime = service.maintenanceStartsAt;
      notice.title = `${dateFormat.format(start)} · ${timeFormat.format(start)}`;
      details.append(notice);
    }
    row.append(element('span', 'service-name', service.localizedNames?.[language] || service.name), details);
    return row;
  }));
  $('updates-list').replaceChildren(...data.updates.map(update => {
    const row = element('article', 'update');
    const stamp = element('div');
    const published = new Date(update.timestamp);
    const date = element('time');
    date.dateTime = update.timestamp;
    date.append(element('span', '', dateFormat.format(published)), element('span', 'update-time', timeFormat.format(published)));
    stamp.append(date, element('span', 'update-label', update.label));
    const body = element('div');
    body.append(element('h3', '', update.title), element('p', '', update.body));
    row.append(stamp, body);
    return row;
  }));
  $('content').hidden = false;
}
async function refresh(manual = false) {
  $('refresh').disabled = true;
  try {
    const response = await fetch(`status.json?t=${Date.now()}`, {cache: 'no-store'});
    if (!response.ok) throw new Error('Status request failed');
    const data = await response.json();
    if (!Number.isFinite(Date.parse(data.updatedAt)) || !Array.isArray(data.services) || !Array.isArray(data.updates) || !data.translations?.en || !data.translations?.fr) throw new Error('Invalid status information');
    currentData = data;
    feedback = manual ? 'refreshed' : '';
    render();
  } catch {
    feedback = $('content').hidden ? 'loadError' : 'refreshError';
    $('feedback').textContent = messages[language][feedback];
  } finally { $('refresh').disabled = false; }
}
document.querySelectorAll('[data-language]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    language = link.dataset.language;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(null, '', url);
    try { localStorage.setItem('status-language', language); } catch { /* The URL still preserves the selection. */ }
    render();
  });
});
$('complete-motion').addEventListener('click', () => { motionPaused = !motionPaused; renderMotion(); });
$('refresh').addEventListener('click', () => refresh(true));
render();
refresh();
setInterval(() => { if (!document.hidden) refresh(); }, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
