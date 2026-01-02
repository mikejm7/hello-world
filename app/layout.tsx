import './globals.css'

export const metadata = {
  title: 'Spidey Birthday Invite',
  description: 'Enter the secret code to unlock the mission intel!',
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
