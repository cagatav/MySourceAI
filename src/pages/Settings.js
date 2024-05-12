import React, { useState, useEffect } from 'react';
import { useBasePrompt } from './api/BasePromptContext'; 
import { toast } from 'react-toastify';

export default function Settings() {
    const { basePrompt, updateBasePrompt } = useBasePrompt() || [];
    const [chatType, setChatType] = useState('GPT 3.5');
    const [temperature, setTemperature] = useState(0.5);
    const [initialChatType, setInitialChatType] = useState('');
    const [initialTemperature, setInitialTemperature] = useState(0);
    const [initialBasePrompt, setInitialBasePrompt] = useState(basePrompt);

    useEffect(() => {
        const savedChatType = localStorage.getItem('chatType') || 'gpt-3.5-turbo-0125';
        const savedTemperature = parseFloat(localStorage.getItem('temperature')) || 0.1;

        setChatType(savedChatType);
        setTemperature(savedTemperature);
        setInitialChatType(savedChatType);
        setInitialTemperature(savedTemperature);
    }, []);

    const handleChatTypeChange = (selectedType) => {
        setChatType(selectedType);
    };

    const handleTemperatureChange = (event) => {
        setTemperature(parseFloat(event.target.value));
    };

    const handleBasePromptChange = (event) => {
        updateBasePrompt(event.target.value);
    };
    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };
  
    const handleSubmit = () => {
        let changesMade = false;

        if (chatType !== initialChatType) {
            localStorage.setItem('chatType', chatType);
            toast.info('Selected GPT Model: ' + chatType);
            setInitialChatType(chatType);
            changesMade = true;
        }

        if (temperature !== initialTemperature) {
            localStorage.setItem('temperature', temperature);
            toast.info('Selected Temperature: ' + temperature);
            setInitialTemperature(temperature);
            changesMade = true;
        }

        if (basePrompt !== initialBasePrompt) {
          toast.success('The base prompt has been updated: ' + truncateText(basePrompt, 50));
          setInitialBasePrompt(basePrompt);
            changesMade = true;
        }

        if (!changesMade) {
            toast.error('No changes to save.');
        } else {
            console.log("Changes saved: ", {
                chatType: chatType,
                temperature: temperature,
                basePrompt: basePrompt
            });
            setTimeout(() => {
              window.location.reload();
          }, 3500);

          }
    };

    const handleCancel = () => {
        setChatType(initialChatType);
        setTemperature(initialTemperature);
        updateBasePrompt(initialBasePrompt);
        toast.warning("Changes cancelled.");
    };

  return (
    <div className="h-auto" id="settings">
      <div className="text-transparent select-none" id="settings">.</div>
      <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 pb-1 font-semibold text-3xl select-none mt-12">
      <svg 
        width="30" 
        height="30"  
        viewBox="0 0 25 25" 
        fill='white' 
        xmlns="http://www.w3.org/2000/svg" 
        className="inline-block mr-3 -mt-1 opacity-90 hover:opacity-100 duration-1000 animate-spin-slow">
        <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/> 
      </svg>
        Settings</h1>
        <div className="relative lg:w-4/6  xx:w-4/5 inset-x-0 h-2/3 flex rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b81] backdrop-blur-sm border-white border-opacity-40 hover:border-opacity-80 duration-1000 mx-auto mt-4 mb-12 overflow-y-auto overflow-x-hidden">
          <div className="w-full">
            <div className="py-10 font-medium">
            <div className="text-center margin pb-3 mb-5">
                <label htmlFor="basePrompt" className="text-white text-lg border-b select-none">Base Prompt</label>
                <br className='select-none'/>
                <p className='text-white mt-5 font-light opacity-40 text-xs'>
                  The foundational text used to guide the model in understanding the context and purpose of the interaction.</p>
                <textarea
                  className="mt-5 border border-white border-opacity-40 hover:border-opacity-70 bg-transparent rounded-lg p-2 font-normal duration-500 text-white opacity-50 hover:opacity-100 focus:opacity-100"
                  id="basePrompt"
                  placeholder="Enter your Base Prompt."
                  value={basePrompt}
                  onChange={handleBasePromptChange}
                  rows="3"
                  style={{ width: "80%", resize: "none" }}
                />
              </div>
              <div className="text-center mb-3 margin ">
              <hr className='opacity-40 hover:opacity-80 duration-1000 mb-7'/>

                <label htmlFor="temperature" className="text-white text-lg border-b select-none">GPT Model</label>
                <p className='text-white mt-5 font-light opacity-40 text-xs'>
                The AI model processes text inputs and generates responses. Larger models are generally capable of higher complexity and accuracy.</p>

                <br className='select-none'/>
                <button
                  className={`duration-200 m-5 py-2 px-20 text-gray-400 rounded-md focus:outline-none border border-transparent hover:border-white hover:border hover:text-white
                  ${chatType === 'gpt-3.5-turbo-0125'  ? 'bg-[#414bd4] border-white text-white' : ''}`}
                  onClick={() => handleChatTypeChange('gpt-3.5-turbo-0125')}>
                  GPT 3.5
                </button>
                <button
                  className={`duration-200 m-5 py-2 px-20 text-gray-400 rounded-md focus:outline-none border border-transparent hover:border-white hover:border hover:text-white
                  ${chatType === 'gpt-4-turbo' ? 'bg-[#414bd4] border-white text-white' : ''}`}
                  onClick={() => handleChatTypeChange('gpt-4-turbo')}>
                  GPT 4
                </button>
              </div>
              <div className="text-center mb-10 margin text-lg">
              <hr className='opacity-40 hover:opacity-80 duration-1000 mb-7'/>

              <label htmlFor="temperature" className="text-white border-b select-none">Temperature</label>
              <p className='text-white mt-5 font-light opacity-40 text-xs'>
              Temperature controls text creativity: lower temps for predictability, higher temps for creativity.</p>
                <br/>
                <input
                  className="duration-200 appearance-none bg-gray-200 h-1 w-60 rounded outline-none slider-thumb mt-5"
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={handleTemperatureChange}
                />
                <br/>
                <span className="text-slate-200 select-none">{temperature}</span>
              </div>
              <div className="flex justify-center">
                <button
                  className="duration-200 bg-[#414bd4] hover:bg-transparent w-[150px] text-white py-2 px-8 rounded-lg mr-2 border border-transparent hover:border-white"
                  onClick={handleSubmit}
                >
                  SAVE 
                </button>
                <button
                  className="duration-200 bg-gray-400 hover:bg-[#ffffff2a] text-white py-2 px-8 rounded-lg w-[150px] border border-transparent hover:border-white"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
