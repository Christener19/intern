import React, { useEffect } from 'react';

const Component = () => {
  useEffect(() => {
    async function loadData() {
      const response = await fetch('/api/database/fetchdatabase');
      const data = await response.json();
      // Use this data in your component
    }
  
    loadData();
  }, []);

  return (
   
  );
};

export default Component;
