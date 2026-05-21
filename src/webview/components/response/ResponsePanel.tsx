import React from 'react';
import { useResponseStore } from '../../store/responseStore';

const ResponsePanel: React.FC = () => {
  const { loading, success, status, duration, size, data, error } = useResponseStore();

  if (loading) return <div>Loading...</div>;
  if (!success) return <div>Error: {error}</div>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div>Status: {status} | Time: {duration}ms | Size: {size} bytes</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ResponsePanel;