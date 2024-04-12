import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';

export default function Sources() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const validateFiles = (files) => {
    const validFiles = files.filter(file => file.type === 'application/pdf');
    const invalidCount = files.length - validFiles.length;
  
    if (invalidCount > 0) {
      toast.error(`Invalid file format. Only PDF files are allowed to be uploaded. Please select a PDF file to proceed.`);
    } else if (validFiles.length > 0) {
      toast.success(`Your PDF file has been uploaded successfully!`); // Use toast.success instead of toast.accept
    }
  
    return validFiles;
  };

  const onDrop = (acceptedFiles, rejectedFiles) => {
    const validFiles = validateFiles([...acceptedFiles, ...rejectedFiles]);
    const newFiles = validFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      selected: false,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    multiple: true,
    
  });

  const deleteSelectedFiles = () => {
    const updatedFiles = uploadedFiles.filter(file => !file.selected);
    setUploadedFiles(updatedFiles);
  };

  const handleCheckboxChange = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].selected = !updatedFiles[index].selected;
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="flex flex-col items-center h-screen" id="sources">
      <h1 className="text-3xl font-semibold bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text text-transparent select-none "
      >
        Sources
      </h1>
      <div {...getRootProps()} className={`md:w-1/2 xx:w-4/5 mt-4 p-4 border-2 border-dashed rounded-md backdrop-blur-sm ${
          isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
        } flex flex-col justify-center items-center` }>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-500">Drop the PDF files here...</p>
        ) : (
          <p className="text-gray-500 select-none">Drag and drop PDF files here, or click to select files</p>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div className="w-1/2 p-4 border border-gray-300 rounded-md mt-4 backdrop-blur-sm">
          <div className="flex justify-between mb-5">
            <p className="text-lg font-semibold">Uploaded Files</p>
            <p className="text-lg font-semibold">File Size</p>
          </div>
          {uploadedFiles.map((uploadedFile, index) => (
            <div key={index} className="flex items-center justify-between my-5 ml-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={uploadedFile.selected}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2"
                />
                <span className="text-gray-300 text-sm">
                  {uploadedFile.name}</span>
              </div>
              <span className="text-gray-500 text-sm">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </span>
            </div>
          ))}
          <button
            onClick={deleteSelectedFiles}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
