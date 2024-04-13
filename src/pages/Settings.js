import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  const [chatType, setChatType] = useState('GPT 3.5');
  const [temperature, setTemperature] = useState(0.5);
  const [basePrompt, setBasePrompt] = useState('');
  const [initialChatType, setInitialChatType] = useState('');
  const [initialTemperature, setInitialTemperature] = useState(0);
  const [initialBasePrompt, setInitialBasePrompt] = useState('');

  useEffect(() => {
    const savedChatType = localStorage.getItem('chatType') || 'GPT 3.5';
    const savedTemperature = parseFloat(localStorage.getItem('temperature')) || 0.1;
    const savedBasePrompt = localStorage.getItem('basePrompt') || "You're an intelligent assistant named "+ "MySourceAI"+", focused on giving precise and helpful answers. Excel in multi-turn conversations and ask for clarification if needed.";

    setChatType(savedChatType);
    setTemperature(savedTemperature);
    setBasePrompt(savedBasePrompt);

    setInitialChatType(savedChatType);
    setInitialTemperature(savedTemperature);
    setInitialBasePrompt(savedBasePrompt);
  }, []);

  const handleChatTypeChange = (selectedType) => {
    setChatType(selectedType);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  const handleBasePromptChange = (event) => {
    setBasePrompt(event.target.value);
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
      localStorage.setItem('basePrompt', basePrompt);
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
    }
  };
  

  const handleCancel = () => {

    setChatType(initialChatType);
    setTemperature(initialTemperature);
    setBasePrompt(initialBasePrompt);

    toast.warning("Cancelled");
  };

  return (
    <div className="h-auto">
      <div>
        <div className="text-transparent select-none" id="settings">Settings</div>
        <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 pb-1 font-semibold text-3xl select-none mt-12">
          Settings</h1>
        
        <div className="relative md:w-1/2 xx:w-4/5 inset-x-0 h-2/3 flex rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b81] backdrop-blur-sm border-[#ffffff69] mx-auto mt-4 overflow-y-auto overflow-x-hidden">
          <div className="w-full">
            <div className="py-10 font-medium">
            <div className="text-center margin pb-3">
                <label htmlFor="basePrompt" className="text-white text-lg border-b select-none">Base Prompt</label>
                <br/><br/>
                <textarea
                  className="mt-3 border border-gray-700 hover:border-white bg-transparent rounded-lg p-2 font-normal duration-200 text-white"
                  id="basePrompt"
                  value={basePrompt}
                  onChange={handleBasePromptChange}
                  rows="4"
                  style={{ width: "80%", resize: "none" }}
                />
              </div>
              <div className="text-center mb-5 margin ">
                <label htmlFor="temperature" className="text-white text-lg border-b select-none">GPT Model</label>
                <br/><br/>
                <button
                  className={`duration-200 mx-2 py-2 px-20 text-white rounded-md focus:outline-none border border-transparent hover:border-white hover:border 
                    ${chatType === 'GPT 3.5' ? 'bg-[#414bd4] border-white' : ''}`}
                    onClick={() => handleChatTypeChange('GPT 3.5')}>
                  GPT 3.5
                </button>
                <button
                  className={`duration-200 mx-2 py-2 px-20 text-white rounded-md focus:outline-none border border-transparent hover:border-white hover:border 
                  ${chatType === 'GPT 4' ? 'bg-[#414bd4] border-white' : ''}`}
                  onClick={() => handleChatTypeChange('GPT 4')}>
                  GPT 4
                </button>
              </div>
              <div className="text-center mb-10 margin text-lg">
              <label htmlFor="temperature" className="text-white border-b select-none">Temperature</label>
                <br/><br/>
                <input
                  className="duration-200 appearance-none bg-gray-200 h-1 w-60 rounded outline-none slider-thumb"
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
                  className="duration-200 bg-[#414bd4] hover:bg-transparent w-[150px] text-white  text-opacity-100 opacity-80 py-2 px-8 rounded-lg mr-2 border border-transparent hover:border-white"
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
    </div>
  );
}
