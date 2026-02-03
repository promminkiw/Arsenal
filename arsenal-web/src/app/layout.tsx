import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        // ✅ default theme (เหมือนเดิม: ดำ + ขาว)
        style={
          {
            '--app-bg': '#0b0b0f',
            '--app-fg': '#ffffff',
          } as React.CSSProperties
        }
        // ✅ ใช้ tailwind arbitrary values
        className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
