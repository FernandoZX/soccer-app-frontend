/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPartidoPage() {
  const [equipos, setEquipos] = useState([]);
  const [partido, setPartido] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    }).then(res => res.json()).then(setEquipos);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos/${id}`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    }).then(res => res.json()).then(setPartido);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:admin123'),
      },
      body: JSON.stringify({
        equipoLocalId: +partido.equipoLocalId,
        equipoVisitaId: +partido.equipoVisitaId,
        fecha: partido.fecha,
      }),
    });

    router.push('/partidos');
    router.refresh();
  };

  if (!partido) return <p className="p-4">Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Editar Partido</h1>
      <select value={partido.equipoLocalId} onChange={e => setPartido({ ...partido, equipoLocalId: e.target.value })}>
        {equipos.map((e: any) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <select value={partido.equipoVisitaId} onChange={e => setPartido({ ...partido, equipoVisitaId: e.target.value })}>
        {equipos.map((e: any) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <input type="datetime-local" value={partido.fecha?.slice(0, 16)} onChange={e => setPartido({ ...partido, fecha: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar cambios</button>
    </form>
  );
}
