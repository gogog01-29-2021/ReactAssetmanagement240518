import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableDetails = ({ match }) => {
  const [structure, setStructure] = useState([]);
  const [data, setData] = useState([]);
  const { tableName } = match.params;

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/tables/${tableName}`);
        setStructure(response.data.structure);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching table details', error);
      }
    };

    fetchTableDetails();
  }, [tableName]);

  return (
    <div>
      <h2>Table: {tableName}</h2>
      <h3>Structure</h3>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Not Null</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {structure.map((col, index) => (
            <tr key={index}>
              <td>{col.name}</td>
              <td>{col.type}</td>
              <td>{col.notnull ? 'Yes' : 'No'}</td>
              <td>{col.dflt_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Data</h3>
      <table>
        <thead>
          <tr>
            {structure.map((col, index) => (
              <th key={index}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {structure.map((col, colIndex) => (
                <td key={colIndex}>{row[col.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDetails;
