import React, { useState, useCallback } from 'react';
import { decryptEs3 } from '../../../utils/encryption';

export default function FileDropArea() {
  const [fileContent, setFileContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // handle the drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const password = "Why would you want to cheat?... :o It's no fun. :') :'D";
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
    const arrayBuffer = reader.result; // This is an ArrayBuffer
    const uint8 = new Uint8Array(arrayBuffer);

    const decrypted = decryptEs3(uint8, password);
    console.log(decrypted);
    };
    reader.readAsArrayBuffer(file); // read file as text
  }, []);

  // handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div style={{width: "100%"}}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: '2px dashed #aaa',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          color: isDragging ? '#0a84ff' : '#555',
          backgroundColor: isDragging ? '#f0f8ff' : '#fafafa',
          transition: 'all 0.2s ease',
        }}
      >
        Drag your file here
      </div>

      {fileContent && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}