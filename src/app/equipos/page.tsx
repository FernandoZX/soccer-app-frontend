// app/equipos/page.tsx
import Link from "next/link";

interface Equipo {
  id: number;
  nombre: string;
}

async function getEquipos(): Promise<Equipo[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error cargando los equipos");
  }

  return res.json().then((data) => data.data);
}

export default async function EquiposPage() {
  const equipos = await getEquipos();
  console.log(equipos);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipos</h1>
        <Link href="/equipos/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Equipo
        </Link>
      </div>

      <ul className="space-y-3">
        {equipos.map((equipo) => (
          <li key={equipo.id} className="border rounded p-4 shadow-sm flex justify-between items-center">
            <span>{equipo.nombre}</span>
            <div className="flex gap-3">
              <Link
                href={`/equipos/edit/${equipo.id}`}
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
              <form action={`/equipos/delete/${equipo.id}`} method="POST">
                <button type="submit" className="text-red-600 hover:underline">
                  Eliminar
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
