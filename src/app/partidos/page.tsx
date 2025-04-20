/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

async function getPartidos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error cargando partidos');
  }

  return res.json().then((data) => data.data).catch((err) => console.error(err));
}

export default async function PartidosPage() {
  const partidos = await getPartidos();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📅 Partidos Programados</h1>
        <Link
          href="/partidos/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Programar partido
        </Link>
      </div>

      <ul className="space-y-3 mt-4">
        {partidos.map((p: any) => (
          <li
            key={p.id}
            className="border rounded p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <strong>{p.equipoLocal?.nombre}</strong> vs{' '}
              <strong>{p.equipoVisitante?.nombre}</strong>
              <br />
              <span className="text-sm text-gray-500">
                {new Date(p.fecha).toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/partidos/edit/${p.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                ✏️ Editar
              </Link>

              <form method="POST" action={`/partidos/delete/${p.id}`}>
                <button
                  type="submit"
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑 Eliminar
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
