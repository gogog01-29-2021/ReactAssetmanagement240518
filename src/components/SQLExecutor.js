import React, { useState } from 'react';
import axios from 'axios';

const SQLExecutor = () => {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/execute-sql', { sql });
      setResult(response.data);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error executing SQL command');
      setResult(null);
    }
  };

  return (
    <div>
      <h2>SQL Command Executor</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows="5"
          cols="80"
          placeholder="Enter your SQL command here"
        />
        <br />
        <button type="submit">Execute SQL</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && (
        <div>
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SQLExecutor;
