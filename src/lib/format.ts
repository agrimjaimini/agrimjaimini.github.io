export function formatDate(dateString: string, style: 'short' | 'long' = 'long') {
  // Parse YYYY-MM-DD as a local date so it doesn't shift a day in US time zones
  const [y, m, d] = dateString.split('-').map(Number);
  const date = y && m && d ? new Date(y, m - 1, d) : new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
  });
}
