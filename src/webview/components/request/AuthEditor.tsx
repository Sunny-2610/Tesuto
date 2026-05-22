import React, { useState } from 'react';
import { useRequestStore } from '../../store/requestStore';

const AuthEditor: React.FC = () => {
  const [authType, setAuthType] = useState<'none' | 'bearer'>('none');
  const [token, setToken] = useState('');
  const { setAuth } = useRequestStore();

  const applyAuth = () => {
    if (authType === 'bearer' && token) {
      setAuth({ type: 'bearer', token });
    } else {
      setAuth(null);
    }
  };

  return (
    <div style={{ padding: '8px' }}>
      <select value={authType} onChange={(e) => setAuthType(e.target.value as any)}>
        <option value="none">No Auth</option>
        <option value="bearer">Bearer Token</option>
      </select>
      {authType === 'bearer' && (
        <div style={{ marginTop: '8px' }}>
          <input
            type="text"
            placeholder="Enter JWT token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onBlur={applyAuth}
            style={{ width: '100%', padding: '4px' }}
          />
        </div>
      )}
    </div>
  );
};

export default AuthEditor;