/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PartidoForm() {
  const [equipos, setEquipos] = useState([]);
  const [equipoLocalId, setLocal] = useState('');
  const [equipoVisitaId, setVisita] = useState('');
  const [fecha, setFecha] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    })
      .then((res) => res.json().then((data) => data.data))
      .then(setEquipos);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:admin123'),
      },
      body: JSON.stringify({ equipoLocalId: +equipoLocalId, equipoVisitaId: +equipoVisitaId, fecha }),
    });

    router.push('/partidos');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <select value={equipoLocalId} onChange={(e) => setLocal(e.target.value)} required>
        <option value="">Selecciona equipo local</option>
        {equipos.map((e: any) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <select value={equipoVisitaId} onChange={(e) => setVisita(e.target.value)} required>
        <option value="">Selecciona equipo visitante</option>
        {equipos.map((e: any) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Programar</button>
    </form>
  );
}
