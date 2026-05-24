import React, { useEffect, useState } from 'react';
import { useCollectionStore } from '../../store/collectionStore';
import { vscodeService } from '../../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';

const CollectionsPanel: React.FC = () => {
  const {
    collections,
    loadCollections,
    selectRequest,
  } = useCollectionStore();

  const [expanded, setExpanded] =
    useState<Set<string>>(new Set());

  useEffect(() => {
    vscodeService.postMessage(
      MessageType.GET_COLLECTIONS,
      {}
    );

    const unsubscribe =
      vscodeService.onMessage((msg) => {
        if (
          msg.type === MessageType.COLLECTIONS_LIST
        ) {
          loadCollections(msg.payload);
        }
      });

    return unsubscribe;
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const createCollection = () => {
    vscodeService.postMessage(
      MessageType.PROMPT_COLLECTION_NAME,
      {}
    );
  };

  const deleteCollection = (id: string) => {
    vscodeService.postMessage(
      MessageType.DELETE_COLLECTION,
      { id }
    );
  };

  return (
    <div className="panel">
      <button
        className="btn btn-primary btn-full"
        onClick={createCollection}
      >
        <span>+</span> New Collection
      </button>

      {collections.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📁</div>

          <div className="empty-title">
            No collections
          </div>

          <div className="empty-hint">
            Create collections to organize your
            API requests
          </div>
        </div>
      )}

      {collections.map((coll) => (
        <div
          key={coll.id}
          className="collection-card"
        >
          <div
            className="collection-header"
            onClick={() => toggleExpand(coll.id)}
          >
            <span
              className={`chevron ${
                expanded.has(coll.id)
                  ? 'expanded'
                  : ''
              }`}
            >
              ▶
            </span>

            <strong>{coll.name}</strong>

            <div className="collection-meta">
              <span className="count-badge">
                {coll.requests.length}
              </span>

              <div className="collection-actions">
                <button
                  className="btn-icon-only btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCollection(coll.id);
                  }}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>

          {expanded.has(coll.id) && (
            <div className="collection-body">
              {coll.requests.length === 0 ? (
                <div
                  className="empty-state"
                  style={{ padding: '16px' }}
                >
                  <div className="empty-hint">
                    No saved requests in this
                    collection
                  </div>
                </div>
              ) : (
                coll.requests.map((req) => (
                  <div
                    key={req.id}
                    className="saved-request"
                    onClick={() =>
                      selectRequest(req)
                    }
                  >
                    <span
                      className={`method-badge method-${req.method.toLowerCase()}`}
                    >
                      {req.method}
                    </span>

                    <span className="req-name">
                      {req.name || req.url}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollectionsPanel;