export function formatDate(dateString: string, style: 'month' | 'short' | 'long' = 'long') {
  // Parse YYYY-MM-DD as a local date so it doesn't shift a day in US time zones
  const [y, m, d] = dateString.split('-').map(Number);
  const date = y && m && d ? new Date(y, m - 1, d) : new Date(dateString);
  if (style === 'month') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
  });
}

/** `{words|term}` marks in a highlight, which tie words to a part of a figure. */
export const TERM = /\{([^}|]+)\|([^}]+)\}/g;

/** A highlight without its marks, for print. */
export const plain = (text: string) => text.replace(TERM, '$1');
