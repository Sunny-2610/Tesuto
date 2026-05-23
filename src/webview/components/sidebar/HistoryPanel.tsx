import React, { useEffect } from 'react';
import { useHistoryStore } from '../../store/historyStore';
import { vscodeService } from '../../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';
import { useRequestStore } from '../../store/requestStore';

const HistoryPanel: React.FC = () => {
  const { history, loadHistory } = useHistoryStore();

  useEffect(() => {
    vscodeService.postMessage(MessageType.GET_HISTORY, {});
    const unsubscribe = vscodeService.onMessage(msg => {
      if (msg.type === MessageType.HISTORY_LIST) {
        loadHistory(msg.payload);
      }
    });
    return unsubscribe;
  }, []);

  const handleClear = () => {
    vscodeService.postMessage(MessageType.CLEAR_HISTORY, {});
  };

  const handleSelect = (item: any) => {
    useRequestStore.getState().loadFromHistory(item.request);
  };

  return (
    <div className="history-panel">
      <button onClick={handleClear}>Clear All</button>
      <div>
        {history.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(item)}
            style={{ cursor: 'pointer', padding: '6px', borderBottom: '1px solid var(--vscode-panel-border)', display: 'flex', justifyContent: 'space-between' }}
          >
            <span>
              <span style={{ fontWeight: 'bold', width: '45px', display: 'inline-block' }}>{item.request.method}</span>
              <span>{item.request.url}</span>
            </span>
            <span>{item.response.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;