/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditResultadoPage() {
  const [resultado, setResultado] = useState<any>(null);
  const [partidos, setPartidos] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // Cargar resultado
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados/${id}`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    })
      .then((res) => res.json())
      .then(setResultado);

    // Cargar partidos
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/partidos`, {
      headers: { Authorization: 'Basic ' + btoa('admin:admin123') },
    })
      .then((res) => res.json().then((data) => data.data))
      .then(setPartidos);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:admin123'),
      },
      body: JSON.stringify({
        partidoId: Number(resultado.partidoId),
        golesLocal: Number(resultado.golesLocal),
        golesVisita: Number(resultado.golesVisita),
        resultadoFinal: resultado.resultadoFinal,
      }),
    });

    if (res.ok) {
      router.push('/resultados');
      router.refresh();
    } else {
      console.error('No se guardó el resultado');
    }
  };

  if (!resultado) return <p className="p-4">Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Editar Resultado</h1>

      <select
        value={resultado.partidoId}
        onChange={(e) => setResultado({ ...resultado, partidoId: e.target.value })}
      >
        {partidos.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.equipoLocal?.nombre} vs {p.equipoVisitante?.nombre}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={resultado.golesLocal}
        onChange={(e) => setResultado({ ...resultado, golesLocal: e.target.value })}
        placeholder="Goles Local"
        required
      />

      <input
        type="number"
        value={resultado.golesVisita}
        onChange={(e) => setResultado({ ...resultado, golesVisita: e.target.value })}
        placeholder="Goles Visita"
        required
      />

      <select
        value={resultado.resultadoFinal}
        onChange={(e) => setResultado({ ...resultado, resultadoFinal: e.target.value })}
      >
        <option value="LOCAL">Gana local</option>
        <option value="VISITA">Gana visita</option>
        <option value="EMPATE">Empate</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}
