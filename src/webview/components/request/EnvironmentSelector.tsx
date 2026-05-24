import React, { useState } from 'react';

const environments = [
  { id: 'dev', label: 'Development', class: 'env-dev' },
  { id: 'staging', label: 'Staging', class: 'env-staging' },
  { id: 'prod', label: 'Production', class: 'env-prod' },
];

const EnvironmentSelector: React.FC = () => {
  const [selected, setSelected] = useState('dev');
  const env = environments.find(e => e.id === selected) || environments[0];

  return (
    <div className="env-selector">
      <span className={`env-badge ${env.class}`}>● {env.label}</span>
      <select
        className="select"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        style={{ marginLeft: '8px', fontSize: '11px', padding: '2px 8px' }}
      >
        {environments.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
      </select>
    </div>
  );
};

export default EnvironmentSelector;