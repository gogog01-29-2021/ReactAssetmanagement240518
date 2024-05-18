import React from 'react';
import axios from 'axios';

const CSVPage = () => {
  const downloadCSV = async () => {
    const response = await axios.get('http://localhost:5001/assets/csv', {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'assets.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2>Download CSV</h2>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default CSVPage;
