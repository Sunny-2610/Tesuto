import React from 'react';
import { useRequestStore } from '../../store/requestStore';
import { HTTP_METHODS } from '@shared/constants/httpMethods';

const MethodSelector: React.FC = () => {
  const { method, setMethod } = useRequestStore();
  return (
    <select value={method} onChange={(e) => setMethod(e.target.value)}>
      {HTTP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
    </select>
  );
};

export default MethodSelector;