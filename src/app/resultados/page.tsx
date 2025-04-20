/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

async function getResultados() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error cargando resultados');
  }

  return res.json().then((data) => data.data).catch((err) => console.error(err));
}

export default async function ResultadosPage() {
  const resultados = await getResultados();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🥅 Resultados Registrados</h1>
        <Link
          href="/resultados/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Registrar resultado
        </Link>
      </div>

      <ul className="space-y-3 mt-4">
        {resultados.map((r: any) => (
          <li
            key={r.id}
            className="border rounded p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <strong>{r.partido?.equipoLocal?.nombre}</strong> {r.golesLocal} - {r.golesVisita}{' '}
              <strong>{r.partido?.equipoVisitante?.nombre}</strong>
              <br />
              <span className="text-sm text-gray-500">
                Resultado Final: {r.resultadoFinal}
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/resultados/edit/${r.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                ✏️ Editar
              </Link>

              <form method="POST" action={`/resultados/delete/${r.id}`}>
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
