
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TableRowData } from "./EditableTable";
import EditableCell from "./EditableCell";
import RangeInputs from "./RangeInputs";
import BenefitInputs from "./BenefitInputs";
import { toast } from "sonner";

interface TableRowProps {
  data: TableRowData;
  onUpdate: (id: string, updatedData: Partial<TableRowData>) => void;
  onDelete: (id: string) => void;
  isLast: boolean;
  index: number;
}

const TableRow = ({ data, onUpdate, onDelete, isLast, index }: TableRowProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateMontoRepartir = (monto: number) => {
    const { rangoMinimo, rangoMaximo } = data;
    const maxValue = rangoMaximo === "∞" ? Infinity : rangoMaximo;
    
    if (monto < rangoMinimo || monto > maxValue) {
      const maxDisplay = rangoMaximo === "∞" ? "∞" : rangoMaximo.toString();
      return `El monto debe estar entre ${rangoMinimo} y ${maxDisplay}`;
    }
    return "";
  };

  const handleUpdate = (field: keyof TableRowData, value: any) => {
    const updatedData = { [field]: value };
    
    // Validar monto a repartir
    if (field === "montoRepartir" || field === "rangoMinimo" || field === "rangoMaximo") {
      const newData = { ...data, ...updatedData };
      const error = validateMontoRepartir(newData.montoRepartir);
      
      if (error) {
        setErrors({ ...errors, montoRepartir: error });
        toast.error(error);
      } else {
        setErrors({ ...errors, montoRepartir: "" });
      }
    }

    onUpdate(data.id, updatedData);
  };

  const rowBgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
  const hasError = errors.montoRepartir;

  return (
    <tr className={`${rowBgClass} hover:bg-gray-100 transition-colors duration-150 ${hasError ? "bg-red-50" : ""}`}>
      <td className="px-4 py-4">
        <EditableCell
          value={data.periodoInicial}
          type="select"
          options={["1 mes", "3 meses", "6 meses", "12 meses"]}
          onUpdate={(value) => handleUpdate("periodoInicial", value)}
        />
      </td>
      <td className="px-4 py-4">
        <EditableCell
          value={data.tipo}
          type="text"
          onUpdate={(value) => handleUpdate("tipo", value)}
        />
      </td>
      <td className="px-4 py-4">
        <EditableCell
          value={data.precioReferencial}
          type="number"
          onUpdate={(value) => handleUpdate("precioReferencial", value)}
          prefix="S/ "
        />
      </td>
      <td className="px-4 py-4">
        <RangeInputs
          rangoMinimo={data.rangoMinimo}
          rangoMaximo={data.rangoMaximo}
          onUpdateMinimo={(value) => handleUpdate("rangoMinimo", value)}
          onUpdateMaximo={(value) => handleUpdate("rangoMaximo", value)}
        />
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <EditableCell
            value={data.montoRepartir}
            type="number"
            onUpdate={(value) => handleUpdate("montoRepartir", value)}
            prefix="S/ "
            error={errors.montoRepartir}
          />
          {errors.montoRepartir && (
            <p className="text-xs text-red-600 font-medium">{errors.montoRepartir}</p>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <BenefitInputs
          porcentaje={data.coleccionablesPorcentaje}
          monto={data.coleccionablesMonto}
          onUpdatePorcentaje={(value) => handleUpdate("coleccionablesPorcentaje", value)}
          onUpdateMonto={(value) => handleUpdate("coleccionablesMonto", value)}
        />
      </td>
      <td className="px-4 py-4">
        <BenefitInputs
          porcentaje={data.suscripcionesPorcentaje}
          monto={data.suscripcionesMonto}
          onUpdatePorcentaje={(value) => handleUpdate("suscripcionesPorcentaje", value)}
          onUpdateMonto={(value) => handleUpdate("suscripcionesMonto", value)}
        />
      </td>
      <td className="px-4 py-4 text-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(data.id)}
          disabled={isLast}
          className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
