"use client";
import React, { useState, useEffect } from "react";
import { fetchParticipantNames } from "../dataObjectsForCompProps/namePickerTestObject";

export type ParticipantNamesResponse = {
  names: string[];
};

const NamePicker: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    const initializeNames = async () => {
      const data: ParticipantNamesResponse = await fetchParticipantNames();
      setNames(data.names);
    };
    initializeNames();
  }, []);

  const pickRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const selected = names[randomIndex];
    setSelectedName(selected);
    const newNameList = names.filter((name) => name !== selected);
    setNames(newNameList);
  };

  const resetNames = () => {
    const initializeNames = async () => {
      try {
        const data = await fetchParticipantNames();
        setNames(data.names);
        setSelectedName(null);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    initializeNames();
  };

  return (
    <section className="flex justify-center">
      <div className="border-2 rounded-2xl border-blue-500 w-full h-full ml-2 mt-1">
        <div className="flex flex-col items-center p-4">
          <div>
            <h2 className="text-center text-xl text-blue-700 font-bold mb-4">
              NAME PICKER
            </h2>
          </div>
          <div className="font-serif bg-blue-700 text-white w-11/12 h-52 flex justify-center items-center rounded-2xl text-5xl ">
            {selectedName}
          </div>
          <div className="flex justify-between mt-8 w-11/12 gap-6">
            <button
              onClick={pickRandomName}
              className="bg-green-800 hover:bg-green-600 uppercase font-bold text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl drop-shadow-2xl"
            >
              Pick
            </button>
            <button
              onClick={resetNames}
              className="bg-green-800 hover:bg-green-600 uppercase font-bold text-white py-2 px-4 border-none cursor-pointer text-center w-3/6 rounded-xl drop-shadow-2xl"
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
