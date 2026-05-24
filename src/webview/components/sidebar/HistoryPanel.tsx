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
      if (msg.type === MessageType.HISTORY_LIST) loadHistory(msg.payload);
    });
    return unsubscribe;
  }, []);

  const handleClear = () => {
    vscodeService.postMessage(MessageType.CLEAR_HISTORY, {});
  };

  const handleSelect = (item: any) => {
    useRequestStore.getState().loadFromHistory(item.request);
  };

  const statusClass = (status: number) => {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400) return 'status-error';
    return 'status-warning';
  };

  return (
    <div className="panel history-panel">
      <div className="panel-header">
        <span className="panel-title">Recent Requests</span>
        {history.length > 0 && (
          <button className="btn btn-sm btn-ghost btn-danger" onClick={handleClear}>
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🕐</div>
          <div className="empty-title">No history yet</div>
          <div className="empty-hint">Sent requests will appear here for quick replay</div>
        </div>
      )}

      {history.map((item, idx) => (
        <div
          key={idx}
          className="history-item"
          onClick={() => handleSelect(item)}
        >
          <div className="history-main">
            <span className={`method-badge method-${item.request.method.toLowerCase()}`}>
              {item.request.method}
            </span>
            <span className="history-url">{item.request.url}</span>
          </div>
          <div className="history-meta">
            <span className={statusClass(item.response.status)}>{item.response.status}</span>
            <span className="history-time">{item.response.duration}ms</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;