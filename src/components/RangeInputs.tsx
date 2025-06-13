
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RangeInputsProps {
  rangoMinimo: number;
  rangoMaximo: number | "∞";
  onUpdateMinimo: (value: number) => void;
  onUpdateMaximo: (value: number | "∞") => void;
}

const RangeInputs = ({ 
  rangoMinimo, 
  rangoMaximo, 
  onUpdateMinimo, 
  onUpdateMaximo 
}: RangeInputsProps) => {
  const [minimoEdit, setMinimoEdit] = useState(rangoMinimo.toString());
  const [maximoEdit, setMaximoEdit] = useState(rangoMaximo === "∞" ? "∞" : rangoMaximo.toString());

  const handleMinimoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinimoEdit(value);
    const numValue = parseFloat(value) || 0;
    onUpdateMinimo(numValue);
  };

  const handleMaximoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaximoEdit(value);
    if (value === "∞" || value === "") {
      onUpdateMaximo("∞");
    } else {
      const numValue = parseFloat(value) || 0;
      onUpdateMaximo(numValue);
    }
  };

  const setInfinite = () => {
    setMaximoEdit("∞");
    onUpdateMaximo("∞");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label className="text-xs text-gray-600 block mb-1">Mínimo</label>
          <Input
            type="number"
            value={minimoEdit}
            onChange={handleMinimoChange}
            className="w-full text-sm"
            placeholder="Min"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-600 block mb-1">Máximo</label>
          <div className="flex space-x-1">
            <Input
              type="text"
              value={maximoEdit}
              onChange={handleMaximoChange}
              className="flex-1 text-sm"
              placeholder="Max"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={setInfinite}
              className="px-2 text-xs"
            >
              ∞
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInputs;
