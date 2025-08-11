import React, { useState } from "react";

interface PillsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

const PillsInput: React.FC<PillsInputProps> = ({ value, onChange, placeholder, label }) => {
  const [input, setInput] = useState("");

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
  };

  const handleRemove = (item: string) => {
    onChange(value.filter(v => v !== item));
  };

  return (
    <div>
      {label && <label className="block font-bold text-[#6B4F3B] mb-1">{label}</label>}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item, idx) => (
          <span key={item + idx} className="bg-[#E8C07D] text-[#6B4F3B] px-3 py-1 rounded-full flex items-center">
            {item}
            <button type="button" className="ml-2 text-[#6B4F3B] hover:text-red-600" onClick={() => handleRemove(item)}>
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="border rounded px-3 py-2 w-full"
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleAdd}
      />
    </div>
  );
};

export default PillsInput;

