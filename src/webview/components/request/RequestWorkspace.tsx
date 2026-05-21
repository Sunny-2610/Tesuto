import React, { useState } from 'react';
import MethodSelector from './MethodSelector';
import HeadersEditor from './HeadersEditor';
import BodyEditor from './BodyEditor';
import { useRequestStore } from '../../store/requestStore';
import { useResponseStore } from '../../store/responseStore';
import { vscodeService } from '../../services/vscodeService';
import { validateRequest } from '@shared/validators/requestValidator';
import { MessageType } from '@shared/constants/messageTypes';

type TabType = 'headers' | 'body';

const RequestWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('headers');
  const { method, url, headers, body, setMethod, setUrl } = useRequestStore();
  const { setLoading, setResponse } = useResponseStore();

  const sendRequest = () => {
    const validation = validateRequest({ url, method });
    if (!validation.valid) {
      setResponse({ success: false, error: validation.error });
      return;
    }
    setLoading(true);
    // Convert headers array to object
    const headersObj: Record<string, string> = {};
    headers.forEach(h => { if (h.key) headersObj[h.key] = h.value; });
    vscodeService.postMessage(MessageType.SEND_REQUEST, { method, url, headers: headersObj, body });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <MethodSelector />
        <input
          type="text"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={sendRequest}>Send</button>
      </div>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('headers')} style={activeTab === 'headers' ? { fontWeight: 'bold' } : {}}>Headers</button>
        <button onClick={() => setActiveTab('body')} style={activeTab === 'body' ? { fontWeight: 'bold' } : {}}>Body</button>
      </div>
      <div>
        {activeTab === 'headers' && <HeadersEditor />}
        {activeTab === 'body' && <BodyEditor />}
      </div>
    </div>
  );
};

export default RequestWorkspace;