import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Switzer (Fontshare, free license), self-hosted so the site doesn't depend on their CDN
const switzer = localFont({
  src: [
    { path: './fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL('https://agrimjaimini.github.io'),
  title: {
    default: 'Agrim Jaimini',
    template: '%s — Agrim Jaimini',
  },
  description: 'Building machine learning systems and the infrastructure behind them. CS & Math at Cornell.',
  openGraph: {
    title: 'Agrim Jaimini',
    description: 'ML systems and the infrastructure behind them. CS & Math at Cornell.',
    url: '/',
    siteName: 'Agrim Jaimini',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0e' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${switzer.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply a saved theme before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
