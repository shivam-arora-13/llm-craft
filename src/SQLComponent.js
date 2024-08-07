import React, { useState } from 'react';
import supabase from './supabase.client';

const SQLQueryComponent = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const executeQuery = async () => {
    try {
      const { data, error } = await supabase
        .rpc('execute_sql', { query_text: query });

      if (error) {
        throw error;
      }

      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Execute SQL Query</h1>
      <textarea
        value={query}
        onChange={handleQueryChange}
        rows="10"
        cols="50"
      />
      <button onClick={executeQuery}>Execute</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default SQLQueryComponent;
