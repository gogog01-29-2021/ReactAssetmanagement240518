import React, { useState } from 'react';

const AssetForm = ({ addAsset }) => {
  const [assetType, setAssetType] = useState('Hardware');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [licenseKey, setLicenseKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const asset = {
      name,
      department,
      price: parseFloat(price),
      ...(assetType === 'Hardware' ? { category } : { licenseKey })
    };

    try {
      await addAsset(asset);
      alert(`${assetType} registered successfully!`);
    } catch (error) {
      console.error('There was an error registering the asset!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Asset Type:
        <select value={assetType} onChange={(e) => setAssetType(e.target.value)}>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
        </select>
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Department:
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      {assetType === 'Hardware' ? (
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      ) : (
        <label>
          License Key:
          <input type="text" value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} />
        </label>
      )}
      <button type="submit">Register Asset</button>
    </form>
  );
};

export default AssetForm;
