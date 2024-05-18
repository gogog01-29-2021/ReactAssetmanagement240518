const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const { Parser } = require('json2csv');

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define a model for assets
const Asset = sequelize.define('Asset', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  licenseKey: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Sync the model with the database
sequelize.sync();

// Define routes
app.get('/assets', async (req, res) => {
  const assets = await Asset.findAll();
  res.json(assets);
});

app.post('/assets', async (req, res) => {
  const asset = await Asset.create(req.body);
  res.json(asset);
});

app.delete('/assets/:id', async (req, res) => {
  await Asset.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Route to download assets as CSV
app.get('/assets/csv', async (req, res) => {
  const assets = await Asset.findAll();
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(assets);
  
  res.header('Content-Type', 'text/csv');
  res.attachment('assets.csv');
  res.send(csv);
});

// Route to execute raw SQL queries
app.post('/execute-sql', async (req, res) => {
  const { sql } = req.body;
  try {
    const [results, metadata] = await sequelize.query(sql);
    res.json({ results, metadata });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all tables
app.get('/tables', async (req, res) => {
  try {
    const tables = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'", {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get table structure and data
app.get('/tables/:tableName', async (req, res) => {
  const tableName = req.params.tableName;
  try {
    const structure = await sequelize.query(`PRAGMA table_info(${tableName})`, {
      type: sequelize.QueryTypes.SELECT
    });
    const data = await sequelize.query(`SELECT * FROM ${tableName}`, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json({ structure, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
