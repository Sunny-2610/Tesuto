import React, { useState } from 'react';
import CollectionsPanel from './components/sidebar/CollectionsPanel';
import HistoryPanel from './components/sidebar/HistoryPanel';
import TokenPanel from './components/sidebar/TokenPanel';
import RequestWorkspace from './components/request/RequestWorkspace';
import ResponsePanel from './components/response/ResponsePanel';

type SidebarTab = 'collections' | 'history' | 'tokens';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('collections');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '260px', borderRight: '1px solid var(--vscode-panel-border)', overflowY: 'auto' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--vscode-panel-border)' }}>
          <button
            style={{
              flex: 1,
              padding: '8px',
              background: activeTab === 'collections' ? 'var(--vscode-editor-background)' : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('collections')}
          >
            Collections
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px',
              background: activeTab === 'history' ? 'var(--vscode-editor-background)' : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px',
              background: activeTab === 'tokens' ? 'var(--vscode-editor-background)' : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </button>
        </div>
        <div style={{ padding: '8px' }}>
          {activeTab === 'collections' && <CollectionsPanel />}
          {activeTab === 'history' && <HistoryPanel />}
          {activeTab === 'tokens' && <TokenPanel />}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <RequestWorkspace />
        <ResponsePanel />
      </div>
    </div>
  );
};

export default App;