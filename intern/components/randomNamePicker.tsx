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
    <section className="flex justify-center">
      <div className="border-2 rounded-2xl border-blue-500 w-full h-full">
        <div className="flex flex-col items-center p-4">
          <div>
            <h2 className="text-center text-xl text-blue-500 font-bold mb-4">
              NAME PICKER
            </h2>
          </div>
          <div className="bg-blue-500 text-white w-11/12 h-52 flex justify-center items-center rounded-2xl text-5xl ">
            {selectedName}
          </div>
          <div className="flex justify-between mt-8 w-11/12 gap-6">
            <button
              onClick={pickRandomName}
              className="bg-green-500 uppercase font-bold text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl drop-shadow-2xl"
            >
              Pick
            </button>
            <button
              onClick={resetNames}
              className=" bg-green-500 uppercase font-bold text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl drop-shadow-2xl"
            >
              Reset list
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NamePicker;
