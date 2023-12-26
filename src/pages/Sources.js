import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Sources() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrorMessage('File type is not supported. Please upload a .PDF file.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size, // File size in bytes
      selected: false,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setSelectedFiles([]);
    // You can perform other operations here, like uploading the files to a server
  };

  const onFileChange = (event) => {
    const fileList = event.target.files;
    const invalidFiles = Array.from(fileList).filter(
      (file) => !file.name.toLowerCase().endsWith('.pdf')
    );

    if (invalidFiles.length > 0) {
      setErrorMessage('File type is not supported. Please upload a .PDF file.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    const filesArray = Array.from(fileList).map((file) => ({
      file,
      name: file.name,
      size: file.size, // File size in bytes
      selected: false,
    }));

    setSelectedFiles(filesArray);
    setUploadedFiles([...uploadedFiles, ...filesArray]);
    // You can perform other operations here, like uploading the files to a server
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      onDrop(acceptedFiles, rejectedFiles);
    },
    accept: '.pdf',
    multiple: true,
  });

  const deleteSelectedFiles = () => {
    const updatedFiles = uploadedFiles.filter((file) => !file.selected);
    setUploadedFiles(updatedFiles);
  };

  const handleCheckboxChange = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = {
      ...updatedFiles[index],
      selected: !updatedFiles[index].selected,
    };
    setUploadedFiles(updatedFiles);
  };
  
  return (
    <div>
      <div className="text-transparent mt-[200px]" id="sources">
        Sources
      </div>
      <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 font-semibold text-3xl select-none mt-[100px]">
        Sources
      </h1>

      <div className="mt-8 flex justify-center">
        <div className="w-[700px] p-4 border border-gray-300 rounded-md flex flex-col gap-4 items-center">
          <div
            {...getRootProps()}
            className="w-full h-[200px] border-2 border-dashed rounded-md p-4 flex flex-col justify-center items-center"
            style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the PDF files here...</p>
            ) : (
              <p className="text-gray-600">
                Drag and drop PDF files here, or click to select files
              </p>
            )}
            <input
              type="file"
              onChange={onFileChange}
              multiple
              className="mt-4 p-2 border border-gray-300 rounded"
            />
          </div>

          {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 mt-4 text-center">
          {errorMessage}
        </div>
      )}
          {selectedFiles.length > 0 && (
            <div className="w-full p-4 border border-gray-300 rounded-md">
              <p className="text-lg font-semibold mb-2">Selected Files:</p>
              <div className="flex flex-col gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center">
                    <span>{file.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="w-full p-4 border border-gray-300 rounded-md">
              <div className="flex justify-between mb-2">
                <p className="text-lg font-semibold">Uploaded Files</p>
                <p className="text-lg font-semibold">File Size</p>
              </div>
              <div className="flex flex-col gap-2">
                {uploadedFiles.map((uploadedFile, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={uploadedFile.selected}
                        onChange={() => handleCheckboxChange(index)}
                        className="mr-2"
                      />
                      <span>{uploadedFile.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={deleteSelectedFiles}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
