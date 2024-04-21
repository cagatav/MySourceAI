import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function Sources() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const textAreaRef = useRef(null);
  const maxRows = 12;
  const lineHeight = 20; // Her satır için yükseklik

  const autoResize = () => {
    const element = textAreaRef.current;
    element.style.height = 'auto'; // Yüksekliği sıfırla ve içeriğe göre ayarla
    if (element.scrollHeight > maxRows * lineHeight) {
      element.style.height = `${maxRows * lineHeight}px`; // Maksimum yükseklik sınırlaması
      element.style.overflowY = 'auto'; // İçerik sınırlamayı aşarsa scroll bar ekle
    } else {
      element.style.height = `${element.scrollHeight}px`;
    }
  };

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
      <h1 className="text-3xl font-semibold bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text text-transparent select-none mt-28">
        Sources
      </h1>
      <div {...getRootProps()} className={`md:w-1/2 xx:w-4/5 mt-4 p-4 border-2 border-dashed border-opacity-40 hover:border-opacity-100 duration-1000 rounded-lg backdrop-blur-sm cursor-pointer ${
          isDragActive ? 'border-blue-100 bg-blue-100' : 'border-white border-opacity-40'
        } flex flex-col justify-center items-center` }>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-white opacity-40 hover:opacity-100 duration-500">Drop the PDF files here...</p>
        ) : (
          <p className="text-white opacity-40 hover:opacity-100 duration-500">Drag and drop PDF files here, or click to select files</p>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div className="w-1/2 p-4 border border-white border-opacity-40 hover:border-opacity-80 duration-1000 rounded-lg mt-4 backdrop-blur-sm">
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
                <span className="text-gray-300 text-sm">{uploadedFile.name}</span>
              </div>
              <span className="text-gray-500 text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</span>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={deleteSelectedFiles}
              className="bg-red-800 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg duration-500 ">
              Delete Selected
            </button>
            <button
              className="bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg duration-500 border border-transparent hover:border-white">
              Train MySourceAI
            </button>
          </div>
        </div>
      )}
      <div className="relative md:w-1/2 xx:w-4/5 inset-x-0 h-4/6 flex rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b81] backdrop-blur-sm border-white border-opacity-40 hover:border-opacity-80 duration-1000 mx-auto mt-4 overflow-y-auto overflow-x-hidden">
        <div className="text-center m-3 pb-3 mb-5 relative w-full">
          <label htmlFor="basePrompt" className="text-white text-lg border-b select-none">Text Content</label>
          <br className='textContent'/>
          <textarea
            ref={textAreaRef}
            onInput={autoResize}
            className="mt-5 border border-white border-opacity-40 hover:border-opacity-70 bg-transparent rounded-lg p-2 font-normal duration-500 text-white opacity-50 hover:opacity-100 focus:opacity-100"
            id="textContent"
            placeholder="Enter Text Content."
            rows="2"
            style={{ width: "90%", resize: "vertical" }}
          />
        </div>
      </div>
    </div>
  );
}
