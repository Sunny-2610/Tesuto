import React, { useState } from 'react';

const environments = ['Development', 'Staging', 'Production'];

const EnvironmentSelector: React.FC = () => {
  const [selected, setSelected] = useState('Development');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label>Environment:</label>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {environments.map(env => <option key={env}>{env}</option>)}
      </select>
    </div>
  );
};

export default EnvironmentSelector;