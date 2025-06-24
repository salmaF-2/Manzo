import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

const FileUpload = ({ 
  label, 
  maxSize = 10, // en Mo
  onFileChange, 
  name,
  accept = 'image/*,.pdf',
  required = false
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      validateAndSetFile(selectedFile);
    }
  }, []);

  const handleChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };


  const validateAndSetFile = (file) => {
    // Vérification du type de fichier
    const acceptedTypes = accept.split(',');
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    const isTypeValid = acceptedTypes.some(type => {
      if (type === '*/*') return true;
      if (type.startsWith('.')) {
        return fileName.endsWith(type.substring(1));
      }
      if (type.endsWith('/*')) {
        const mainType = type.split('/')[0];
        return fileType.startsWith(`${mainType}/`);
      }
      return fileType === type;
    });

    if (!isTypeValid) {
      setError(`Type de fichier non supporté. Formats acceptés: ${accept}`);
      return;
    }

    // Vérification de la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Le fichier est trop volumineux. Taille max: ${maxSize} Mo`);
      return;
    }

    setFile(file);
    
    // Création d'une prévisualisation pour les images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onFileChange) {
      onFileChange(file, name);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    setError(null);
    if (onFileChange) {
      onFileChange(null, name);
    }
  };


  return (
    <div className="mb-4">
      {label && (
        <div className="mb-2 flex items-center gap-1">
          {required && <span className="text-red-500">*</span>}
          <span className="text-md font-medium">{label}</span>
        </div>
      )}
      
      <label className="block">
        <div 
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer relative transition-colors
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#4A5B8C]'}
            ${file ? 'border-[#4A5B8C] bg-[#f0f5fa]' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview ? (
            <>
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain max-h-40 mb-2"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                aria-label="Supprimer le fichier"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </>
          ) : file ? (
            <div className="text-center w-full">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {(file.size / (1024 * 1024)).toFixed(2)} Mo
              </p>
              <button
                type="button"
                onClick={removeFile}
                className="mt-2 text-sm text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <div className="text-center">
                <p className="text-gray-600">
                  <span className="font-medium text-[#4A5B8C]">Cliquez pour téléverser</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Formats: {accept.replace(/\*/g, '').replace(/,/g, ', ')}
                </p>
              </div>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          onChange={handleChange}
          accept={accept}
          required={required && !file}
        />
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      
      <div className="text-xs text-gray-500 mt-1">
        Taille maximale: {maxSize} Mo
      </div>
    </div>
  );
};

export default FileUpload;