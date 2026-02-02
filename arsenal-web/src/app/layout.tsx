import type { Metadata } from 'next';

// ✅ Global styles (Tailwind + base styles)
import '@/styles/globals.css';

// ✅ Export viewport separately (not in metadata)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

// ✅ Export metadata separately
export const metadata: Metadata = {
  title: 'Arsenal FC - History Timeline',
  description: 'Explore the legendary history of Arsenal Football Club from 1886 to present day',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
