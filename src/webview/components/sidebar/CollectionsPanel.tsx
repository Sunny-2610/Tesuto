import React, { useEffect } from 'react';
import { useCollectionStore } from '../../store/collectionStore';
import { vscodeService } from '../../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';

const CollectionsPanel: React.FC = () => {

  const {
    collections,
    loadCollections,
    selectRequest
  } = useCollectionStore();

  useEffect(() => {

    vscodeService.postMessage(
      MessageType.GET_COLLECTIONS,
      {}
    );

    const unsubscribe =
      vscodeService.onMessage((msg) => {

        if (
          msg.type ===
          MessageType.COLLECTIONS_LIST
        ) {

          loadCollections(msg.payload);
        }
      });

    return unsubscribe;

  }, []);

  const createCollection = () => {

    const name =
      window.prompt(
        'Enter collection name'
      );

    if (!name || !name.trim()) {
      return;
    }

    const newCollection = {
      id: Date.now().toString(),
      name: name.trim(),
      requests: []
    };

    vscodeService.postMessage(
      MessageType.SAVE_COLLECTION,
      newCollection
    );
  };

  const handleDelete = (
    id: string
  ) => {

    vscodeService.postMessage(
      MessageType.DELETE_COLLECTION,
      { id }
    );
  };

  return (

    <div className="collections-panel">

      <button
        onClick={createCollection}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '12px',
          cursor: 'pointer'
        }}
      >
        + New Collection
      </button>

      <div>

        {collections.length === 0 && (
          <div>
            No collections found
          </div>
        )}

        {collections.map((coll) => (

          <div
            key={coll.id}
            style={{
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '10px'
            }}
          >

            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px'
              }}
            >
              {coll.name}
            </div>

            <div>

              {coll.requests.map((req) => (

                <div
                  key={req.id}
                  onClick={() =>
                    selectRequest(req)
                  }
                  style={{
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      marginRight: '6px'
                    }}
                  >
                    {req.method}
                  </span>

                  {req.name || req.url}

                </div>
              ))}

            </div>

            <button
              onClick={() =>
                handleDelete(coll.id)
              }
              style={{
                marginTop: '8px',
                cursor: 'pointer'
              }}
            >
              Delete Collection
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CollectionsPanel;