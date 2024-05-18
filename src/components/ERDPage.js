import React from 'react';

const ERDPage = () => {
  return (
    <div>
      <h2>ERD Diagram</h2>
      {/* You can embed an ERD tool here or use an iframe */}
      <iframe src="https://dbdiagram.io/d" title="ERD Diagram" width="100%" height="600px"></iframe>
    </div>
  );
};

export default ERDPage;
