import './globals.css'

export const metadata = {
  title: 'Coming Soon',
  description: 'My new website is under construction.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
