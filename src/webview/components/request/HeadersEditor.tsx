import React from 'react';
import { useRequestStore } from '../../store/requestStore';

const HeadersEditor: React.FC = () => {
  const { headers, addHeader, updateHeader, removeHeader } = useRequestStore();
  return (
    <div className="headers-editor">
      <h4>Headers</h4>
      {headers.map((h, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            placeholder="Key"
            value={h.key}
            onChange={e => updateHeader(idx, 'key', e.target.value)}
          />
          <input
            placeholder="Value"
            value={h.value}
            onChange={e => updateHeader(idx, 'value', e.target.value)}
          />
          <button onClick={() => removeHeader(idx)}>✖</button>
        </div>
      ))}
      <button onClick={addHeader}>+ Add Header</button>
    </div>
  );
};

export default HeadersEditor;