import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';

export default function Sources() {
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const validateFiles = (files) => {
    const validFiles = files.filter(file => file.type === 'application/pdf');
    const invalidCount = files.length - validFiles.length;
  
    if (invalidCount > 0) {
      toast.error(`Invalid file format. Only PDF files are allowed to be uploaded. Please select a PDF file to proceed.`);
      return [];
    } 
    
    const newFiles = validFiles.filter(file => !uploadedFiles.some(uploadedFile => uploadedFile.name === file.name));
    
    if (newFiles.length > 0) {
      toast.success(`Your PDF file has been uploaded successfully!`);
    } else {
      toast.warning(`File(s) with the same name already exist.`);
    }
  
    return newFiles;
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
    <div className="flex flex-col items-center" id="sources">
      <h1 className="text-3xl font-semibold bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text text-transparent select-none mt-28"
      >
        <svg width="30" height="30"  viewBox="0 0 24 24" fill='white' xmlns="http://www.w3.org/2000/svg" className="inline-block mr-3 -mt-1">
          <path d="m2.394 15.759s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm0-3.113s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm10.271-9.455c-.246-.128-.471-.191-.692-.191-.223 0-.443.065-.675.191l-8.884 5.005c-.276.183-.414.444-.414.698 0 .256.139.505.414.664l8.884 5.006c.221.133.447.203.678.203.223 0 .452-.065.689-.203l8.884-5.006c.295-.166.451-.421.451-.68 0-.25-.145-.503-.451-.682zm-8.404 5.686 7.721-4.349 7.72 4.349-7.72 4.35z" fill-rule="nonzero"/>
        </svg>
        Sources
      </h1>
      <div {...getRootProps()} className={`md:w-1/2 xx:w-4/5 mt-4 p-4 border-2 border-dashed rounded-lg backdrop-blur-sm cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
        } flex flex-col justify-center items-center` }>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-500">Drop the PDF files here...</p>
        ) : (
          <p className="text-gray-500 select-none ">Drag and drop PDF files here, or click to select files</p>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div className="w-1/2 p-4 border border-gray-300 rounded-lg mt-4 backdrop-blur-sm">
          <div className="flex justify-between mb-5">
            <p className="text-lg font-semibold text-white">Uploaded Files</p>
            <p className="text-lg font-semibold text-white">File Size</p>
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
          <div className="flex justify-between">
            <button
              onClick={deleteSelectedFiles}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">
              Delete Selected
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
              Train MySourceAI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
