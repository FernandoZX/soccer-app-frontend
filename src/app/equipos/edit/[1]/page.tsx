// app/equipos/edit/[id]/page.tsx

import EquipoForm from "@/components/EquipoForm";

interface Props {
  params: { id: string };
}

export default function EditEquipoPage({ params }: Props) {
  const equipoId = parseInt(params.id, 10);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Editar Equipo</h1>
      <EquipoForm equipoId={equipoId} />
    </div>
  );
}
