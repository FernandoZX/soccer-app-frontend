import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
