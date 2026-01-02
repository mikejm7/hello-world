import './globals.css'

export const metadata = {
  title: "Lucas's Spidey Birthday",
  description: 'Enter the secret code to join the mission!',
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
