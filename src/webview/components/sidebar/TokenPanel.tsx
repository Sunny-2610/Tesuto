import React, { useEffect, useState } from 'react';
import { vscodeService } from '../../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';

interface Token {
  id: string;
  name: string;
  value: string;
  masked?: boolean;
}

const TokenPanel: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    vscodeService.postMessage(MessageType.GET_TOKENS, {});

    const unsubscribe = vscodeService.onMessage((msg) => {
      if (msg.type === MessageType.TOKENS_LIST) {
        setTokens(msg.payload);
      }
    });

    return unsubscribe;
  }, []);

  const addToken = () => {
    vscodeService.postMessage(MessageType.PROMPT_TOKEN, {});
  };

  const toggleMask = (id: string) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, masked: !t.masked }
          : t
      )
    );
  };

  const setActive = (id: string) => {
    vscodeService.postMessage(
      MessageType.SET_ACTIVE_TOKEN,
      { id }
    );
  };

  const deleteToken = (id: string) => {
    vscodeService.postMessage(
      MessageType.DELETE_TOKEN,
      { id }
    );
  };

  return (
    <div className="panel token-panel">
      <button
        className="btn btn-primary btn-full"
        onClick={addToken}
      >
        <span>+</span> Add Token
      </button>

      {tokens.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔑</div>
          <div className="empty-title">No tokens</div>
          <div className="empty-hint">
            Add Bearer tokens for authenticated requests
          </div>
        </div>
      )}

      {tokens.map((token) => (
        <div key={token.id} className="token-card">
          <div className="token-header">
            <span className="token-name">
              {token.name}
            </span>

            <span className="token-active-badge">
              Active
            </span>
          </div>

          <div className="token-value-row">
            <span
              className={
                token.masked ? 'token-masked' : ''
              }
            >
              {token.masked
                ? '•'.repeat(
                    Math.min(token.value.length, 24)
                  )
                : token.value}
            </span>

            <button
              className="btn-icon-only"
              onClick={() => toggleMask(token.id)}
              title="Toggle visibility"
            >
              {token.masked ? '👁' : '🙈'}
            </button>
          </div>

          <div className="token-actions">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setActive(token.id)}
            >
              ✓ Use
            </button>

            <button
              className="btn btn-sm btn-ghost btn-danger"
              onClick={() => deleteToken(token.id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenPanel;