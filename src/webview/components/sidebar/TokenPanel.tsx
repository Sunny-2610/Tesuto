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

    const unsubscribe = vscodeService.onMessage(msg => {
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
    setTokens(prev =>
      prev.map(t =>
        t.id === id ? { ...t, masked: !t.masked } : t
      )
    );
  };

  const setActive = (id: string) => {
    vscodeService.postMessage(MessageType.SET_ACTIVE_TOKEN, { id });
  };

  const deleteToken = (id: string) => {
    vscodeService.postMessage(MessageType.DELETE_TOKEN, { id });
  };

  return (
    <div style={{ padding: '8px' }}>
      <button onClick={addToken}>+ Add Token</button>

      {tokens.map(token => (
        <div
          key={token.id}
          style={{
            background: 'var(--vscode-editor-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: '6px',
            padding: '8px',
            marginBottom: '8px'
          }}
        >
          <div>
            <strong>{token.name}</strong>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>
              {token.masked ? '•'.repeat(20) : token.value}
            </span>

            <button onClick={() => toggleMask(token.id)}>
              👁️
            </button>
          </div>

          <div
            style={{
              marginTop: '6px',
              display: 'flex',
              gap: '6px'
            }}
          >
            <button onClick={() => setActive(token.id)}>
              Use
            </button>

            <button onClick={() => deleteToken(token.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenPanel;