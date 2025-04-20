"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  equipoId?: number;
}

export default function EquipoForm({ equipoId }: Props) {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  // Si hay ID, traer los datos para edición
  useEffect(() => {
    if (equipoId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/${equipoId}`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin123"),
        },
      })
        .then((res) => res.json())
        .then((data) => setNombre(data.nombre));
    }
  }, [equipoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = equipoId ? "PUT" : "POST";
    const url = equipoId
      ? `${process.env.NEXT_PUBLIC_API_URL}/equipos/${equipoId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/equipos`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin123"),
      },
      body: JSON.stringify({ nombre }),
    });

    router.push("/equipos");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del equipo"
        className="w-full border rounded p-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {equipoId ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
