import React from 'react';
import { useRequestStore } from '../../store/requestStore';

const HeadersEditor: React.FC = () => {
  const { headers, addHeader, updateHeader, removeHeader } = useRequestStore();

  if (headers.length === 0) {
    return (
      <div className="headers-editor">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-title">No headers</div>
          <div className="empty-hint">Add headers to customize your request</div>
        </div>
        <button className="btn btn-ghost" onClick={addHeader}>
          <span>+</span> Add Header
        </button>
      </div>
    );
  }

  return (
    <div className="headers-editor">
      {headers.map((h, idx) => (
        <div key={idx} className="header-row">
          <input
            className="input"
            placeholder="Key"
            value={h.key}
            onChange={e => updateHeader(idx, 'key', e.target.value)}
          />
          <input
            className="input"
            placeholder="Value"
            value={h.value}
            onChange={e => updateHeader(idx, 'value', e.target.value)}
          />
          <button className="btn-icon-only" onClick={() => removeHeader(idx)} title="Remove">
            ✕
          </button>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={addHeader}>
        <span>+</span> Add Header
      </button>
    </div>
  );
};

export default HeadersEditor;