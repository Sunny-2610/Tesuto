import React from 'react';
import { useResponseStore } from '../../store/responseStore';

const ResponsePanel: React.FC = () => {
  const { loading, success, status, duration, size, data, error } = useResponseStore();

  if (loading) return <div className="response-panel">Loading...</div>;
  if (!success) return <div className="response-panel">Error: {error}</div>;

  const statusClass = status >= 200 && status < 300 ? 'status-success' : status >= 400 ? 'status-error' : 'status-warning';

  return (
    <div className="response-panel">
      <div>
        <span className={statusClass}>Status: {status}</span>
        <span>Time: {duration}ms</span>
        <span>Size: {size} bytes</span>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ResponsePanel;