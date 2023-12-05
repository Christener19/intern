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
    
    <section className="flex flex-col align-c align-center">
    //   <div className="name-display" style={{ backgroundColor: 'blue', color: 'white', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     {selectedName ?? 'n/a'}
    //   </div>
    //   <button onClick={pickRandomName} style={{ marginTop: '10px' }}>
    //     Pick
    //   </button>
    //   <button onClick={resetNames} style={{ marginTop: '10px' }}>
    //     Reset list
    //   </button>
    </section>
    
  );
}

export default NamePicker;