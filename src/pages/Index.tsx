
import EditableTable from "@/components/EditableTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Tabla de Configuración de Beneficios
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona los períodos, precios y distribución de beneficios
          </p>
        </div>
        <EditableTable />
      </div>
    </div>
  );
};

export default Index;
