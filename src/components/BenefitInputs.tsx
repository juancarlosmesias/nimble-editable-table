
import { Input } from "@/components/ui/input";

interface BenefitInputsProps {
  porcentaje: number;
  monto: number;
  onUpdatePorcentaje: (value: number) => void;
  onUpdateMonto: (value: number) => void;
}

const BenefitInputs = ({ 
  porcentaje, 
  monto, 
  onUpdatePorcentaje, 
  onUpdateMonto 
}: BenefitInputsProps) => {
  const handlePorcentajeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onUpdatePorcentaje(Math.min(100, Math.max(0, value))); // Limitar entre 0 y 100
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onUpdateMonto(Math.max(0, value)); // No permitir valores negativos
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs text-gray-600 block mb-1">Porcentaje (%)</label>
        <Input
          type="number"
          value={porcentaje}
          onChange={handlePorcentajeChange}
          className="w-full text-sm"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600 block mb-1">Monto (PEN)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            S/
          </span>
          <Input
            type="number"
            value={monto}
            onChange={handleMontoChange}
            className="w-full text-sm pl-8"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default BenefitInputs;
