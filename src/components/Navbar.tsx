'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path ? 'font-bold text-blue-600 underline' : 'text-gray-700';

  return (
    <nav className="bg-gray-100 px-6 py-3 shadow mb-6">
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/" className={linkStyle('/')}>🏠 Inicio</Link>
        </li>
        <li>
          <Link href="/equipos" className={linkStyle('/equipos')}>🏟️ Equipos</Link>
        </li>
        <li>
          <Link href="/tabla" className={linkStyle('/tabla')}>📊 Tabla</Link>
        </li>
        <li>
          <Link href="/partidos" className={linkStyle('/partidos')}>📅 Partidos</Link>
        </li>
        <li>
          <Link href="/resultados" className={linkStyle('/resultados')}>🥅 Resultados</Link>
        </li>
        {/* Puedes agregar Partidos o Resultados aquí */}
      </ul>
    </nav>
  );
}
