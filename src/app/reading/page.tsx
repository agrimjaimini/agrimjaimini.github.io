import ReadingList from '@/components/ReadingList';
import { getReading } from '@/lib/reading';
import type { Metadata } from 'next';

const description = 'Articles I’ve read and keep coming back to.';

export const metadata: Metadata = {
  title: 'Reading',
  description,
  alternates: { canonical: '/reading' },
  openGraph: {
    title: 'Reading — Agrim Jaimini',
    description,
    url: '/reading',
    siteName: 'Agrim Jaimini',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Agrim Jaimini' }],
  },
};

export default function ReadingPage() {
  return <ReadingList items={getReading()} />;
}
