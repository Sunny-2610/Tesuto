import React, { useEffect } from 'react';
import { useCollectionStore } from '../../store/collectionStore';
import { vscodeService } from '../../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';

const CollectionsPanel: React.FC = () => {
  const { collections, loadCollections, deleteCollection, selectRequest } = useCollectionStore();

  useEffect(() => {
    vscodeService.postMessage(MessageType.GET_COLLECTIONS, {});
    const unsubscribe = vscodeService.onMessage(msg => {
      if (msg.type === MessageType.COLLECTIONS_LIST) {
        loadCollections(msg.payload);
      }
    });
    return unsubscribe;
  }, []);

  const createCollection = () => {
    const name = prompt('Collection name');
    if (name) {
      const newCollection = { id: Date.now().toString(), name, requests: [] };
      vscodeService.postMessage(MessageType.SAVE_COLLECTION, newCollection);
    }
  };

  return (
    <div style={{ padding: '4px' }}>
      <button onClick={createCollection}>+ New Collection</button>
      {collections.map(coll => (
        <div key={coll.id} style={{ marginTop: '12px', borderLeft: '2px solid #ccc', paddingLeft: '8px' }}>
          <strong>{coll.name}</strong>
          <div style={{ marginLeft: '12px' }}>
            {coll.requests.map(req => (
              <div
                key={req.id}
                onClick={() => {
                  console.log('[UI] Request clicked', req);
                  selectRequest(req);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '4px',
                  margin: '2px 0',
                  background: 'var(--vscode-list-hoverBackground)',
                  borderRadius: '3px'
                }}
              >
                <span style={{ fontWeight: 'bold', width: '45px', display: 'inline-block' }}>{req.method}</span>
                {req.name || req.url}
              </div>
            ))}
          </div>
          <button onClick={() => deleteCollection(coll.id)} style={{ marginTop: '6px', fontSize: '11px' }}>Delete Collection</button>
        </div>
      ))}
    </div>
  );
};

export default CollectionsPanel;