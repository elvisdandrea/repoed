import React, { useState, useCallback } from 'react';
import { postFetcher } from '../../../utils/fetcher';

interface FileDropAreaProps {
  handleSetFileContent: (content: Object, fileName: string) => void;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ 
  handleSetFileContent
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // handle the drop event
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // const password = "Why would you want to cheat?... :o It's no fun. :') :'D";
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);

    try {
      const res = await postFetcher(`${import.meta.env.VITE_API_URL}file-manager/readfile`, formData);
      handleSetFileContent(res, file.name);
    } finally {
      //
    }
  }, [handleSetFileContent]);

  // handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
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
    </div>
  );
}

export { FileDropArea }