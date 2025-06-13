
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditableCellProps {
  value: string | number;
  type: "text" | "number" | "select";
  onUpdate: (value: string | number) => void;
  options?: string[];
  prefix?: string;
  suffix?: string;
  error?: string;
}

const EditableCell = ({ 
  value, 
  type, 
  onUpdate, 
  options = [], 
  prefix = "", 
  suffix = "", 
  error 
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());

  const handleSave = () => {
    if (type === "number") {
      const numValue = parseFloat(editValue) || 0;
      onUpdate(numValue);
    } else {
      onUpdate(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value.toString());
      setIsEditing(false);
    }
  };

  if (type === "select") {
    return (
      <Select value={value.toString()} onValueChange={onUpdate}>
        <SelectTrigger className={`w-full bg-white border-gray-300 ${error ? "border-red-500" : ""}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="hover:bg-gray-100">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (isEditing) {
    return (
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        type={type}
        className={`w-full bg-white border-gray-300 ${error ? "border-red-500" : ""}`}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
        error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
      }`}
    >
      <span className="text-gray-600">{prefix}</span>
      <span className={error ? "text-red-700" : "text-black"}>
        {type === "number" ? Number(value).toLocaleString('es-PE') : value}
      </span>
      <span className="text-gray-600">{suffix}</span>
    </div>
  );
};

export default EditableCell;
