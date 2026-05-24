import React from 'react';
import { useResponseStore } from '../../store/responseStore';

const ResponsePanel: React.FC = () => {
  const { loading, success, status, duration, size, data, error } = useResponseStore();

  if (loading) {
    return (
      <div className="response-panel empty">
        <div className="empty-state">
          <div className="send-btn">
            <div className="spinner"></div>
          </div>
          <div className="empty-title">Sending request...</div>
        </div>
      </div>
    );
  }

  if (!success && status === 0 && !error) {
    return (
      <div className="response-panel empty">
        <div className="empty-state">
          <div className="empty-icon">📡</div>
          <div className="empty-title">Ready to send</div>
          <div className="empty-hint">Enter a URL and click Send to see the response</div>
          <div className="empty-hint" style={{ marginTop: '4px', fontSize: '11px' }}>Tip: Press Ctrl+Enter to send quickly</div>
        </div>
      </div>
    );
  }

  if (error || !success) {
    return (
      <div className="response-panel">
        <div className="response-status-bar">
          <span className="status-pill status-error">✕ Error</span>
          <span className="metric">{error || 'Request failed'}</span>
        </div>
      </div>
    );
  }

  const statusClass = status >= 200 && status < 300 ? 'status-success' : status >= 400 ? 'status-error' : 'status-warning';
  const statusLabel = `${status}`;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatJSON = (obj: any): string => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  const handleCopy = () => {
    const text = formatJSON(data);
    try {
      navigator.clipboard?.writeText(text).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
    } catch {
      // Silent fail
    }
  };

  return (
    <div className="response-panel">
      <div className="response-status-bar">
        <span className={`status-pill ${statusClass}`}>
          {status >= 200 && status < 300 ? '✓' : status >= 400 ? '✕' : '◆'} {statusLabel}
        </span>
        <span className="metric">⏱ {duration}ms</span>
        <span className="metric">📦 {formatSize(size)}</span>
      </div>
      <div className="response-body">
        <pre className="json-viewer">{formatJSON(data)}</pre>
      </div>
      <div className="response-toolbar">
        <button className="btn btn-sm btn-ghost" onClick={handleCopy}>
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default ResponsePanel;