import React, { useState } from 'react';

function SearchTerm() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <input
      type="text"
      placeholder="Have a question? Search for answers…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '50%', padding: '10px', marginBottom: '20px' }}
    />
  );
}

export default SearchTerm;
