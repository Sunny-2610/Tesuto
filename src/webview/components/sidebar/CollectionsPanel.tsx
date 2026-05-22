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
    <div className="collections-panel">
      <button onClick={createCollection}>+ New Collection</button>
      <div>
        {collections.map(coll => (
          <div key={coll.id} style={{ borderLeft: '2px solid #ccc', margin: '8px 0', paddingLeft: '8px' }}>
            <div style={{ fontWeight: 'bold' }}>{coll.name}</div>
            <div style={{ marginLeft: '12px' }}>
              {coll.requests.map(req => (
                <div key={req.id} onClick={() => selectRequest(req)} style={{ cursor: 'pointer', padding: '4px' }}>
                  <span style={{ fontWeight: 'bold', width: '45px', display: 'inline-block' }}>{req.method}</span>
                  {req.name || req.url}
                </div>
              ))}
            </div>
            <button onClick={() => deleteCollection(coll.id)}>Delete Collection</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPanel;