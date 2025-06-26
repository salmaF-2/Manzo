import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ label, maxSize = "10 Mo" }) => {
  return (
    <div className="mb-4">
      {label && <div className="mb-2 flex items-center gap-1">
        {label.startsWith('•') ? (
          <span className="text-md font-medium">{label}</span>
        ) : (
          <span className="text-md font-medium">{label}</span>
        )}
      </div>}
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
        <Upload className="h-6 w-6 text-gray-400" />
        <span className="text-gray-500 mt-2">Glissez-déposez</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Joindre un fichier. La taille ne doit pas dépasser {maxSize}
      </div>
    </div>
  );
};

export default FileUpload;