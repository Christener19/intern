"use client"
import React from 'react';

export default function ButtonAttendanceCSV() {
    // A fetch function to get CSV data
    async function fetchCSV() {
        try {
            const response = await fetch('https://intern-soc.vercel.app/api/database/routes/downloads/downloadAttendance');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text(); // Assuming the API returns CSV text
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle the error according to your application's needs
        }
    }

    // Function to handle the button click
    async function handleDownloadClick() {
        const csvData = await fetchCSV();
        if (csvData) {
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'attendance.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    return (
        <button
            className="bg-green-500 hover:bg-green-600 rounded-xl uppercase font-bold py-2 px-4 m-6 text-white"
            onClick={handleDownloadClick}
        >
            Download CSV
        </button>
    );
}
