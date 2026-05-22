import React, { useState } from 'react';

import CollectionsPanel from './components/sidebar/CollectionsPanel';
import HistoryPanel from './components/sidebar/HistoryPanel';

import RequestWorkspace from './components/request/RequestWorkspace';
import ResponsePanel from './components/response/ResponsePanel';

const App: React.FC = () => {

  const [activeTab, setActiveTab] =
    useState<'collections' | 'history'>(
      'collections'
    );

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh'
      }}
    >

      <div
        style={{
          width: '260px',
          borderRight:
            '1px solid var(--vscode-panel-border)',
          overflowY: 'auto'
        }}
      >

        <div
          style={{
            display: 'flex',
            borderBottom:
              '1px solid var(--vscode-panel-border)'
          }}
        >

          <button
            style={{
              flex: 1,
              padding: '8px',
              background:
                activeTab === 'collections'
                  ? 'var(--vscode-editor-background)'
                  : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() =>
              setActiveTab('collections')
            }
          >
            Collections
          </button>

          <button
            style={{
              flex: 1,
              padding: '8px',
              background:
                activeTab === 'history'
                  ? 'var(--vscode-editor-background)'
                  : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() =>
              setActiveTab('history')
            }
          >
            History
          </button>

        </div>

        <div style={{ padding: '8px' }}>

          {activeTab === 'collections' && (
            <CollectionsPanel />
          )}

          {activeTab === 'history' && (
            <HistoryPanel />
          )}

        </div>

      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >

        <RequestWorkspace />

        <ResponsePanel />

      </div>

    </div>
  );
};

export default App;