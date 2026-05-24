import React from 'react';
import { useRequestStore } from '../../store/requestStore';

const BodyEditor: React.FC = () => {
  const { body, setBody } = useRequestStore();

  const stringValue =
    typeof body === 'object'
      ? JSON.stringify(body, null, 2)
      : body || '';

  let isValid = true;

  try {
    if (stringValue) JSON.parse(stringValue);
  } catch {
    isValid = false;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      setBody(JSON.parse(e.target.value));
    } catch {
      setBody(e.target.value);
    }
  };

  return (
    <div className="body-editor">
      <div className="body-toolbar">
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          JSON Body
        </span>

        <span
          className={`format-badge ${
            isValid ? 'format-valid' : 'format-invalid'
          }`}
        >
          {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
        </span>
      </div>

      <textarea
        className="textarea"
        rows={12}
        value={stringValue}
        onChange={handleChange}
        placeholder='{\n  "key": "value"\n}'
        spellCheck={false}
      />
    </div>
  );
};

export default BodyEditor;