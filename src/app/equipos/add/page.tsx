import EquipoForm from "@/components/EquipoForm";

export default function AddEquipoPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Crear nuevo equipo</h1>
      <EquipoForm />
    </div>
  );
}