import React, { useState, useEffect, useCallback } from 'react';
import MethodSelector from './MethodSelector';
import HeadersEditor from './HeadersEditor';
import BodyEditor from './BodyEditor';
import AuthEditor from './AuthEditor';
import TestsEditor from './TestsEditor';
import EnvironmentSelector from './EnvironmentSelector';
import { useRequestStore } from '../../store/requestStore';
import { useResponseStore } from '../../store/responseStore';
import { vscodeService } from '../../services/vscodeService';
import { validateRequest } from '@shared/validators/requestValidator';
import { MessageType } from '@shared/constants/messageTypes';
import { useCollectionStore } from '../../store/collectionStore';

type TabType = 'headers' | 'body' | 'auth' | 'tests';

const RequestWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('headers');
  const { method, url, headers, body, setMethod, setUrl } = useRequestStore();
  const { setLoading, setResponse } = useResponseStore();
  const { collections, loadCollections } = useCollectionStore();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');

  useEffect(() => {
    vscodeService.postMessage(MessageType.GET_COLLECTIONS, {});
    const unsubscribe = vscodeService.onMessage(msg => {
      if (msg.type === MessageType.COLLECTIONS_LIST) loadCollections(msg.payload);
    });
    return unsubscribe;
  }, []);

  const sendRequest = useCallback(() => {
    const validation = validateRequest({ url, method });
    if (!validation.valid) {
      setResponse({ success: false, error: validation.error });
      return;
    }
    setLoading(true);
    const headersObj: Record<string, string> = {};
    headers.forEach(h => { if (h.key) headersObj[h.key] = h.value; });
    vscodeService.postMessage(MessageType.SEND_REQUEST, { method, url, headers: headersObj, body });
  }, [url, method, headers, body, setLoading, setResponse]);

  const saveToCollection = useCallback(() => {
    if (!selectedCollectionId) {
      setResponse({ success: false, error: 'Select a collection first' });
      return;
    }
    const headersObj: Record<string, string> = {};
    headers.forEach(h => { if (h.key) headersObj[h.key] = h.value; });
    const requestPayload = { method, url, headers: headersObj, body: body !== null ? body : undefined };
    vscodeService.postMessage(MessageType.PROMPT_REQUEST_NAME, {
      collectionId: selectedCollectionId,
      request: requestPayload
    });
  }, [selectedCollectionId, method, url, headers, body, setResponse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        sendRequest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sendRequest]);

  const headerCount = headers.filter(h => h.key).length;

  return (
    <div className="request-workspace">
      <div className="url-bar">
        <MethodSelector />
        <input
          type="text"
          className="input url-input"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn btn-primary btn-lg send-btn" onClick={sendRequest}>
          <span className="btn-icon">▶</span> Send
        </button>
      </div>

      <div className="action-bar">
        <EnvironmentSelector />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            className="select"
            value={selectedCollectionId}
            onChange={(e) => setSelectedCollectionId(e.target.value)}
            style={{ minWidth: '140px' }}
          >
            <option value="">Save to collection...</option>
            {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="btn btn-ghost btn-sm" onClick={saveToCollection}>
            💾 Save
          </button>
        </div>
      </div>

      <div className="request-tabs">
        <button
          className={`request-tab ${activeTab === 'headers' ? 'active' : ''}`}
          onClick={() => setActiveTab('headers')}
        >
          Headers
          {headerCount > 0 && <span className="tab-badge">{headerCount}</span>}
        </button>
        <button
          className={`request-tab ${activeTab === 'body' ? 'active' : ''}`}
          onClick={() => setActiveTab('body')}
        >
          Body
        </button>
        <button
          className={`request-tab ${activeTab === 'auth' ? 'active' : ''}`}
          onClick={() => setActiveTab('auth')}
        >
          Auth
        </button>
        <button
          className={`request-tab ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Tests
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'headers' && <HeadersEditor />}
        {activeTab === 'body' && <BodyEditor />}
        {activeTab === 'auth' && <AuthEditor />}
        {activeTab === 'tests' && <TestsEditor />}
      </div>
    </div>
  );
};

export default RequestWorkspace;