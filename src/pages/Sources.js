import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function Sources() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [inputText, setInputText] = useState('');
  const [textItems, setTextItems] = useState([]);
  const textAreaRef = useRef(null);
  const maxRows = 12;
  const lineHeight = 20;

  const autoResize = () => {
    const element = textAreaRef.current;
    element.style.height = 'auto';
    if (element.scrollHeight > maxRows * lineHeight) {
      element.style.height = `${maxRows * lineHeight}px`;
      element.style.overflowY = 'auto';
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
    toast.warning(`PDF file has been deleted successfully!`);
  };

  const handleCheckboxChange = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].selected = !updatedFiles[index].selected;
    setUploadedFiles(updatedFiles);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDisplayText = () => {
    if (inputText.trim().length === 0) {
      toast.error("Please enter some text before adding.");
      return;
    }
    setTextItems([{ id: uuidv4(), text: inputText.trim() }, ...textItems]);
    setInputText('');
    toast.success("Text content has been added successfully!");
  };
  
  const handleDeleteText = (id) => {
    setTextItems(textItems.filter(item => item.id !== id));
    toast.warning(`Text content has been deleted successfully!`);
  };
  

  const isScrollable = textItems.length >= 4;

  return (
    <div className="flex flex-col items-center h-screen pb-5" id="sources">
      <h1 className="text-3xl font-semibold bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text text-transparent select-none mt-28">
        Sources
      </h1>
      <div {...getRootProps()} className={`lg:w-4/6 xx:w-4/5 mt-4 p-4 border-2 border-solid hover:border-dashed border-opacity-40 hover:border-opacity-100 backdrop-blur-sm duration-1000 rounded-lg cursor-pointer 
      ${isDragActive ? 'border-blue-100 bg-blue-100' : 'border-white border-opacity-40'
        } flex flex-col justify-center items-center`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-white opacity-40 hover:opacity-100 duration-500">Drop the PDF files here...</p>
        ) : (
          <p className="text-white opacity-40 hover:opacity-100 duration-500">Drag and drop PDF files here, or click to select files</p>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div className="overflow-y-scroll' : 'h-auto lg:w-4/6 xx:w-4/5 p-4 border border-white border-opacity-40 hover:border-opacity-80 duration-1000 rounded-lg mt-4 backdrop-blur-sm" 
        style={{}}>
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
                <span className="text-gray-300 text-sm" style={{ overflowWrap: 'break-word' }}>{uploadedFile.name}</span>
              </div>
              <span className="text-gray-500 text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</span>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={deleteSelectedFiles}
              className="duration-200 bg-[#824848] hover:bg-transparent text-white py-2 px-8 rounded-lg border border-transparent hover:border-white">
              Delete Selected
            </button>
            <button
              className="duration-200 bg-[#414bd4] hover:bg-transparent text-white py-2 px-8 rounded-lg border border-transparent hover:border-white">
              Train MySourceAI
            </button>
          </div>
        </div>
      )}
      <div className={`pb-[20px] relative lg:w-4/6 xx:w-4/5 inset-x-0 flex flex-col rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b81] backdrop-blur-sm border-white border-opacity-40 hover:border-opacity-80 duration-1000 mx-auto mt-4 
      ${isScrollable ? 'h-4/6 overflow-y-scroll' : 'h-auto'}`}>
        <div className="weight-saver text-center m-3 pb-3 mb-5 relative w-full">
          <label htmlFor="textContent" className="text-white text-lg border-b select-none">Text Content</label>
          <textarea
            value={inputText}
            ref={textAreaRef}
            onInput={autoResize}
            onChange={handleTextChange}
            className=" mt-5 border border-white border-opacity-40 hover:border-opacity-70 bg-transparent rounded-lg p-2 font-normal duration-500 text-white opacity-50 hover:opacity-100 focus:opacity-100"
            id="textContent"
            placeholder="Enter Text Content."
            rows="2"
            style={{ width: "95%", resize: "vertical", overflowWrap: 'break-word'}}
          />
          <div className="flex justify-center mt-4">
            <button onClick={handleDisplayText} className="duration-200 bg-[#414bd4] hover:bg-transparent text-white py-2 px-8 rounded-lg border border-transparent hover:border-white">
              Add Text
            </button>
          </div>
        </div>
        {textItems.map((item) => (
          <div key={item.id} className="bg-transparent text-white p-3 my-3 rounded-lg flex justify-between items-center border-slate-200 m-10 border backdrop-blur-sm" 
          style={{ height: 'auto', wordBreak:"break-all"}}>
            {item.text}
            <button onClick={() => handleDeleteText(item.id)} className="duration-200 bg-[#824848] hover:bg-transparent text-white py-1 px-3 rounded-lg border border-transparent hover:border-white ml-5"
            style={{ height: 'auto', wordBreak:"keep-all" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
