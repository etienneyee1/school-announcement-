export function typeBadgeClass(type) {
  const m = { urgent: 'badge-urgent', event: 'badge-event', academic: 'badge-academic', general: 'badge-general', holiday: 'badge-holiday' };
  return m[type] || 'badge-general';
}

export function typeLabel(type) {
  const m = { urgent: '⚡ Urgent', event: '📅 Event', academic: '📚 Academic', general: '📢 General', holiday: '🎉 Holiday' };
  return m[type] || type;
}

export function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-RW', { day: 'numeric', month: 'short', year: 'numeric' });
}
