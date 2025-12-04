import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['200', '300', '400', '500', '600']
})
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Agrim Jaimini | Software Engineer',
  description: 'Portfolio of Agrim Jaimini, a Software Engineer specializing in Blockchain and AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
