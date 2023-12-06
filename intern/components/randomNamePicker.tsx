"use client";
// components/NamePicker.tsx
import React, { useState } from "react";

const NamePicker: React.FC = () => {
  const initialNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Ivy",
    "Jack",
  ];
  const [names, setNames] = useState<string[]>(initialNames);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const pickRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const selected = names[randomIndex];
    setSelectedName(selected);
    const newNameList = names.filter((name) => name !== selected);
    if (newNameList.length > 0) {
      setNames(newNameList);
    } else {
      setNames(initialNames);
    }
    console.log(names);
  };

  const resetNames = () => {
    setNames([...initialNames]);
    setSelectedName(null);
  };

  return (
    <div className="border-2 rounded-2xl border-blue-500 w-80">
    <div className="flex flex-col items-center p-4">
      <div><h1 className="text-xl text-blue-500 font-bold">Name Picker</h1></div>
      <div className="bg-blue-500 text-white w-11/12 h-36 flex justify-center items-center text-2xl rounded-2xl">
        {selectedName}
      </div>
      <div className="flex justify-between mt-8 w-11/12 gap-2">
      <button
        onClick={pickRandomName}
        className="bg-green-500 text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl"
      >
        Pick
      </button>
      <button
        onClick={resetNames}
        className=" bg-green-500 text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl"
      >
        Reset list
      </button>
      </div>
    </div>
    </div>
  );
};

export default NamePicker;
