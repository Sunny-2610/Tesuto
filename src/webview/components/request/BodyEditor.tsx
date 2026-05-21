import React from 'react';
import { useRequestStore } from '../../store/requestStore';

const BodyEditor: React.FC = () => {
  const { body, setBody } = useRequestStore();
  const stringValue = typeof body === 'object' ? JSON.stringify(body, null, 2) : (body || '');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setBody(JSON.parse(e.target.value));
    } catch {
      setBody(e.target.value);
    }
  };
  return (
    <div className="body-editor">
      <h4>Body (JSON)</h4>
      <textarea rows={8} value={stringValue} onChange={handleChange} placeholder='{"key": "value"}' style={{ width: '100%', fontFamily: 'monospace' }} />
    </div>
  );
};

export default BodyEditor;