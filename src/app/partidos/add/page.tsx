import PartidoForm from "@/components/PartidoForm";

export default function AddPartidoPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Registrar Partido</h1>
      <PartidoForm />
    </div>
  );
}