
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TableRow from "./TableRow";
import { toast } from "sonner";

export interface TableRowData {
  id: string;
  periodoInicial: string;
  tipo: string;
  precioReferencial: number;
  rangoMinimo: number;
  rangoMaximo: number | "∞";
  montoRepartir: number;
  coleccionablesPorcentaje: number;
  coleccionablesMonto: number;
  suscripcionesPorcentaje: number;
  suscripcionesMonto: number;
}

const EditableTable = () => {
  const [rows, setRows] = useState<TableRowData[]>([
    {
      id: "1",
      periodoInicial: "1 mes",
      tipo: "Ecom club",
      precioReferencial: 0,
      rangoMinimo: 0,
      rangoMaximo: "∞",
      montoRepartir: 0,
      coleccionablesPorcentaje: 0,
      coleccionablesMonto: 0,
      suscripcionesPorcentaje: 0,
      suscripcionesMonto: 0,
    },
  ]);

  const addNewRow = () => {
    const newRow: TableRowData = {
      id: Date.now().toString(),
      periodoInicial: "1 mes",
      tipo: "Ecom club",
      precioReferencial: 0,
      rangoMinimo: 0,
      rangoMaximo: "∞",
      montoRepartir: 0,
      coleccionablesPorcentaje: 0,
      coleccionablesMonto: 0,
      suscripcionesPorcentaje: 0,
      suscripcionesMonto: 0,
    };
    setRows([...rows, newRow]);
    toast.success("Nueva fila añadida correctamente");
  };

  const updateRow = (id: string, updatedData: Partial<TableRowData>) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, ...updatedData } : row
    ));
  };

  const deleteRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
      toast.success("Fila eliminada correctamente");
    } else {
      toast.error("Debe mantener al menos una fila");
    }
  };

  return (
    <Card className="w-full shadow-lg border border-gray-300 bg-white">
      <CardHeader className="bg-black text-white">
        <CardTitle className="text-2xl font-bold">
          Configuración de Beneficios y Distribución
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-black min-w-[120px]">
                  Periodo Inicial
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-black min-w-[120px]">
                  Tipo
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-black min-w-[140px]">
                  Precio Referencial
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-black min-w-[200px]">
                  Condición para Entrega
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-black min-w-[140px]">
                  Monto a Repartir
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-black min-w-[180px]">
                  CB - Coleccionables
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-black min-w-[180px]">
                  CB - Suscripciones
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-black w-[80px]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data={row}
                  onUpdate={updateRow}
                  onDelete={deleteRow}
                  isLast={rows.length === 1}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gray-100 border-t">
          <Button
            onClick={addNewRow}
            className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir Nueva Fila
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableTable;
