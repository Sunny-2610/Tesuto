import React, { useState } from 'react';
import CollectionsPanel from './components/sidebar/CollectionsPanel';
import HistoryPanel from './components/sidebar/HistoryPanel';
import TokenPanel from './components/sidebar/TokenPanel';
import RequestWorkspace from './components/request/RequestWorkspace';
import ResponsePanel from './components/response/ResponsePanel';
import './styles/global.css';

type SidebarTab = 'collections' | 'history' | 'tokens';
// finally really happy with this project
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('collections');

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-tabs">
          <button
            className={`sidebar-tab ${activeTab === 'collections' ? 'active' : ''}`}
            onClick={() => setActiveTab('collections')}
          >
            <span>📁</span> Collections
          </button>

          <button
            className={`sidebar-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span>🕐</span> History
          </button>

          <button
            className={`sidebar-tab ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            <span>🔑</span> Tokens
          </button>
        </div>

        <div className="sidebar-content">
          {activeTab === 'collections' && <CollectionsPanel />}
          {activeTab === 'history' && <HistoryPanel />}
          {activeTab === 'tokens' && <TokenPanel />}
        </div>
      </div>

      <div className="main-workspace">
        <RequestWorkspace />
        <ResponsePanel />
      </div>
    </div>
  );
};

export default App;