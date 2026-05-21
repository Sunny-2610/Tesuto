import React from 'react';
import { useRequestStore } from '../../store/requestStore';
import { useResponseStore } from '../../store/responseStore';
import { vscodeService } from '../../services/vscodeService';
import { validateRequest } from '@shared/validators/requestValidator';
import { MessageType } from '@shared/constants/messageTypes';

const RequestWorkspace: React.FC = () => {
  const { method, url, setMethod, setUrl } = useRequestStore();
  const { setLoading, setResponse } = useResponseStore();

  const sendRequest = () => {
    const validation = validateRequest({ url, method });
    if (!validation.valid) {
      setResponse({ success: false, error: validation.error });
      return;
    }
    setLoading(true);
    vscodeService.postMessage(MessageType.SEND_REQUEST, { method, url });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={sendRequest}>Send</button>
      </div>
    </div>
  );
};

export default RequestWorkspace;