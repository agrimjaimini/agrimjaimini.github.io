import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'

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
  description: 'Engineer, researcher, and builder working on ML systems and the infrastructure behind them. CS & Math at Cornell.',
  openGraph: {
    title: 'Agrim Jaimini',
    description: 'Engineer, researcher, and builder. CS & Math at Cornell.',
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
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <head>
        {/* Switzer is served by Fontshare (not on Google Fonts) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap" />
        {/* Apply a saved theme before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
