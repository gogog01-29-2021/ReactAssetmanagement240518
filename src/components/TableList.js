import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableList = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables', error);
    }
  };

  return (
    <div>
      <h2>Database Tables</h2>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>
            <Link to={`/table/${table.name}`}>{table.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
