import React, { useEffect } from 'react';

const AssetList = ({ assets, deleteAsset }) => {
  useEffect(() => {
    console.log('AssetList received assets:', assets);
  }, [assets]);

  return (
    <div>
      <h2>Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            {asset.name} - {asset.department} - {asset.price} - {asset.category || asset.licenseKey}
            <button onClick={() => deleteAsset(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
