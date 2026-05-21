import React from 'react';
import RequestWorkspace from './components/request/RequestWorkspace';
import ResponsePanel from './components/response/ResponsePanel';

const App: React.FC = () => {
  return (
    <div>
      <RequestWorkspace />
      <ResponsePanel />
    </div>
  );
};

export default App;