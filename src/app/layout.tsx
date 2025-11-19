import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import ScrollProgress from '@/components/ScrollProgress'
import LiquidBackground from '@/components/LiquidBackground'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ScrollProgress />
        <LiquidBackground />
        {children}
      </body>
    </html>
  )
}
