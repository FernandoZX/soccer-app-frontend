interface Posicion {
  equipoId: number;
  nombre: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dif: number;
  pts: number;
}

async function getTabla(): Promise<Posicion[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/estadisticas`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function TablaPage() {
  const tabla = await getTabla();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tabla de Posiciones</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DIF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((t) => (
            <tr key={t.equipoId}>
              <td>{t.nombre}</td>
              <td>{t.pj}</td>
              <td>{t.pg}</td>
              <td>{t.pe}</td>
              <td>{t.pp}</td>
              <td>{t.gf}</td>
              <td>{t.gc}</td>
              <td>{t.dif}</td>
              <td>{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}