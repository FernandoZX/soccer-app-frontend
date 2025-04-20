/* eslint-disable @typescript-eslint/no-explicit-any */
async function getResumen() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al cargar los resultados');
  }

  return res.json();
}

export default async function DashboardPage() {
  const resultados = await getResumen();

  const totalPartidos = resultados.length;
  const totalGoles = resultados.reduce((acc: number, r: any) => acc + r.golesLocal + r.golesVisita, 0);
  const totalLocales = resultados.filter((r: any) => r.resultadoFinal === 'LOCAL').length;
  const totalVisitas = resultados.filter((r: any) => r.resultadoFinal === 'VISITA').length;
  const totalEmpates = resultados.filter((r: any) => r.resultadoFinal === 'EMPATE').length;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📊 Resumen de la Liga</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-xl font-semibold">Partidos Jugados</h2>
          <p className="text-3xl">{totalPartidos}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-xl font-semibold">Total de Goles</h2>
          <p className="text-3xl">{totalGoles}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-xl font-semibold">Ganó Local</h2>
          <p className="text-3xl">{totalLocales}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-xl font-semibold">Ganó Visita</h2>
          <p className="text-3xl">{totalVisitas}</p>
        </div>

        <div className="p-4 bg-white rounded shadow border">
          <h2 className="text-xl font-semibold">Empates</h2>
          <p className="text-3xl">{totalEmpates}</p>
        </div>
      </div>
    </div>
  );
}
