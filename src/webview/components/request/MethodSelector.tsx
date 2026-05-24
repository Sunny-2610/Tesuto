import React from 'react';
import { useRequestStore } from '../../store/requestStore';
import { HTTP_METHODS } from '@shared/constants/httpMethods';

const methodClass: Record<string, string> = {
  GET: 'method-get',
  POST: 'method-post',
  PUT: 'method-put',
  DELETE: 'method-delete',
  PATCH: 'method-patch',
  HEAD: 'method-head',
  OPTIONS: 'method-options',
};

const MethodSelector: React.FC = () => {
  const { method, setMethod } = useRequestStore();
  return (
    <select
      className={`method-select ${methodClass[method] || ''}`}
      value={method}
      onChange={(e) => setMethod(e.target.value)}
    >
      {HTTP_METHODS.map(m => (
        <option key={m} value={m} className={methodClass[m]}>{m}</option>
      ))}
    </select>
  );
};

export default MethodSelector;