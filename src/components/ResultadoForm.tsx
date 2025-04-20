/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultadoForm() {
  const [partidos, setPartidos] = useState([]);
  const [partidoId, setPartido] = useState('');
  const [golesLocal, setGL] = useState('');
  const [golesVisita, setGV] = useState('');
  const [resultadoFinal] = useState('EMPATE');
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    })
      .then((res) => res.json().then((data) => data.data))
      .then(setPartidos);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:admin123'),
      },
      body: JSON.stringify({
        partidoId: +partidoId,
        golesLocal: +golesLocal,
        golesVisita: +golesVisita,
        resultadoFinal,
      }),
    });

    router.push('/resultados');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <select value={partidoId} onChange={(e) => setPartido(e.target.value)} required>
        <option value="">Selecciona partido</option>
        {partidos.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.equipoLocal?.nombre} vs {p.equipoVisitante?.nombre}
          </option>
        ))}
      </select>
      <input type="number" value={golesLocal} onChange={(e) => setGL(e.target.value)} placeholder="Goles local" required />
      <input type="number" value={golesVisita} onChange={(e) => setGV(e.target.value)} placeholder="Goles visita" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Registrar resultado</button>
    </form>
  );
}
