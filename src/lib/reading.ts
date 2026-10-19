/** Articles worth keeping. Newest first is handled for you; add a line and it shows up. */
export interface Reading {
  title: string;
  url: string;
  /** Who wrote or published it, short: "Quanta" or "Paul Graham", not a full masthead. */
  source: string;
  /** When you read it, YYYY-MM-DD. */
  date: string;
  /** One line on why it's here. */
  note?: string;
}

const reading: Reading[] = [
  {
    title: 'You and Your Research',
    url: 'https://www.cs.virginia.edu/~robins/YouAndYourResearch.html',
    source: 'Richard Hamming',
    date: '2026-10-12',
    note: 'Why some people do important work and most don’t, from someone who watched both at Bell Labs.',
  },
  {
    title: 'The Unreasonable Effectiveness of Recurrent Neural Networks',
    url: 'https://karpathy.github.io/2015/05/21/rnn-effectiveness/',
    source: 'Andrej Karpathy',
    date: '2026-09-28',
  },
];

export function getReading(): Reading[] {
  return [...reading].sort((a, b) => b.date.localeCompare(a.date));
}
