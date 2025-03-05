import Navigation from "../components/navigation";
import { GeistSans } from 'geist/font/sans'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'CFA course providers',
  description: 'CFA course providers Utility Analysis - A tool to compare CFA course providers'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background dark:bg-zinc-800 text-foreground dark:text-white">
        <main className="min-h-screen flex flex-col items-center">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  )
}
