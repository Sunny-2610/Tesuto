import React, { useState } from 'react';

const TestsEditor: React.FC = () => {
  const [tests, setTests] = useState('// Write tests here (coming soon)');
  return (
    <div style={{ padding: '8px' }}>
      <textarea rows={6} value={tests} onChange={e => setTests(e.target.value)} style={{ width: '100%', fontFamily: 'monospace' }} />
    </div>
  );
};

export default TestsEditor;