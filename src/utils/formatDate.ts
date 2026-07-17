export function formatPublishedDate(published?: string): string {
  if (!published) {
    return 'Unknown date';
  }

  const date = new Date(published);

  if (Number.isNaN(date.getTime())) {
    return published;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
