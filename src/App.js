import React, { useState, useEffect } from 'react'; // Add necessary imports
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import SQLExecutor from './components/SQLExecutor';
import TableList from './components/TableList';
import TableDetails from './components/TableDetails';
import CSVPage from './components/CSVPage';
import ERDPage from './components/ERDPage';
import SQLQueryPage from './components/SQLQuerypage'; // Ensure this matches the file name
import { SQLProvider } from './SQLContext';
import axios from 'axios'; // Add axios import

const HomePage = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:5001/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets', error);
    }
  };

  const addAsset = async (asset) => {
    try {
      const response = await axios.post('http://localhost:5001/assets', asset);
      setAssets([...assets, response.data]);
    } catch (error) {
      console.error('Error adding asset', error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/assets/${id}`);
      setAssets(assets.filter(asset => asset.id !== id));
    } catch (error) {
      console.error('Error deleting asset', error);
    }
  };

  return (
    <div>
      <AssetForm addAsset={addAsset} />
      <AssetList assets={assets} deleteAsset={deleteAsset} />
      <SQLExecutor />
      <TableList />
    </div>
  );
};

function App() {
  return (
    <SQLProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Asset Management System</h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/csv">CSV</Link>
              <Link to="/erd">ERD</Link>
              <Link to="/sql-query">SQL Query</Link>
            </nav>
          </header>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/csv" element={<CSVPage />} />
            <Route path="/erd" element={<ERDPage />} />
            <Route path="/sql-query" element={<SQLQueryPage />} />
            <Route path="/table/:tableName" element={<TableDetails />} />
          </Routes>
        </div>
      </Router>
    </SQLProvider>
  );
}

export default App;
