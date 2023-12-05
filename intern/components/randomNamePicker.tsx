"use client"
// components/NamePicker.tsx
import React, { useState } from 'react';

const NamePicker: React.FC = () => {
  const initialNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack'];
  const [names, setNames] = useState<string[]>(initialNames);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const pickRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setSelectedName(names[randomIndex]);
  };

  const resetNames = () => {
    setNames([...initialNames]);
    setSelectedName(null);
  };

   return (
    
    <div className="flex flex-col items-center p-4">
      <div className="bg-blue-500 text-white w-72 h-36 flex justify-center items-center text-2xl">
        {selectedName}
      </div>
      <button onClick={pickRandomName} className="mt-2 bg-green-500 text-white py-2 px-4 border-none cursor-pointer">
        Pick
      </button>
      <button onClick={resetNames} className="mt-2 bg-green-500 text-white py-2 px-4 border-none cursor-pointer">
        Reset list
      </button>
    </div>
    
  );
}

export default NamePicker;