/* Fechas con zona horaria explícita de Argentina. El archivo social se conserva. */
'use strict';
document.querySelectorAll('[data-event-until]').forEach(announcement => {
  const end = Date.parse(announcement.dataset.eventUntil);
  function refreshAnnouncement() {
    const remaining = end - Date.now();
    announcement.hidden = !Number.isFinite(end) || remaining <= 0;
    if (!announcement.hidden) window.setTimeout(refreshAnnouncement, Math.min(remaining, 60000));
  }
  refreshAnnouncement();
});
