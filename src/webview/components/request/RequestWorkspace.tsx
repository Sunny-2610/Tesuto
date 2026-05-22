import React, { useState, useEffect } from 'react';
import MethodSelector from './MethodSelector';
import HeadersEditor from './HeadersEditor';
import BodyEditor from './BodyEditor';
import { useRequestStore } from '../../store/requestStore';
import { useResponseStore } from '../../store/responseStore';
import { vscodeService } from '../../services/vscodeService';
import { validateRequest } from '@shared/validators/requestValidator';
import { MessageType } from '@shared/constants/messageTypes';
import { useCollectionStore } from '../../store/collectionStore';

type TabType = 'headers' | 'body';

const RequestWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('headers');
  const { method, url, headers, body, setMethod, setUrl } = useRequestStore();
  const { setLoading, setResponse } = useResponseStore();
  const { collections, loadCollections } = useCollectionStore();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');

  // Load collections for the dropdown
  useEffect(() => {
    vscodeService.postMessage(MessageType.GET_COLLECTIONS, {});
    const unsubscribe = vscodeService.onMessage(msg => {
      if (msg.type === MessageType.COLLECTIONS_LIST) {
        loadCollections(msg.payload);
      }
    });
    return unsubscribe;
  }, []);

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

  const saveToCollection = () => {
    if (!selectedCollectionId) {
      // You could use vscode window show warning, but simple alert for now
      alert('Select a collection first');
      return;
    }
    const headersObj: Record<string, string> = {};
    headers.forEach(h => { if (h.key) headersObj[h.key] = h.value; });
    const name = prompt('Name for this request (optional)') || url;
    const requestToSave = {
      name,
      method,
      url,
      headers: headersObj,
      body
    };
    vscodeService.postMessage(MessageType.ADD_REQUEST_TO_COLLECTION, {
      collectionId: selectedCollectionId,
      request: requestToSave
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <MethodSelector />
        <input
          type="text"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button onClick={sendRequest}>Send</button>
        <select
          value={selectedCollectionId}
          onChange={(e) => setSelectedCollectionId(e.target.value)}
          style={{ width: '130px' }}
        >
          <option value="">Save to...</option>
          {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={saveToCollection}>Save</button>
      </div>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--vscode-panel-border)', marginBottom: '1rem' }}>
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