import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  const [chatType, setChatType] = useState('gpt-3.5');
  const [temperature, setTemperature] = useState(0.5);
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    // Başlangıç durumunu yerel depolamadan al
    const savedChatType = localStorage.getItem('chatType') || 'gpt-3.5';
    const savedTemperature = parseFloat(localStorage.getItem('temperature')) || 0.1;
    const savedCustomText = localStorage.getItem('customText') || "You're an intelligent assistant named "+ "MySourceAI"+", focused on giving precise and helpful answers. Excel in multi-turn conversations and ask for clarification if needed.";

    setChatType(savedChatType);
    setTemperature(savedTemperature);
    setCustomText(savedCustomText);
  }, []);

  const handleChatTypeChange = (selectedType) => {
    setChatType(selectedType);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  const handleCustomTextChange = (event) => {
    setCustomText(event.target.value);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const handleSubmit = () => {
    // Verileri yerel depolama kaydedin
    localStorage.setItem('chatType', chatType);
    localStorage.setItem('temperature', temperature);
    localStorage.setItem('customText', customText);

    // Bildirim gönderin
    toast.info('Selected GPT Model: ' + chatType);
    toast.info('Selected Temperature: ' + temperature);
    toast.success('The base prompt has been updated: ' + truncateText(customText, 50));
    console.log("Custom Text:", customText);
  };

  const handleCancel = () => {
    toast.info("Cancelled");
  };

  return (
    <div className="h-screen">
      <div className="h-auto">
        <div className="text-transparent " id="settings">Settings</div>
        <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 pb-1 font-semibold text-3xl select-none">Settings</h1>
        
        <div className="relative md:w-1/2 xx:w-4/5 inset-x-0 h-2/3 flex rounded-lg border backdrop-blur-sm border-[#ffffff69] mx-auto mt-8 overflow-y-auto overflow-x-hidden">
          <div className="w-full">
            <div className="pt-10 font-medium">
              <div className="text-center mb-20 margin">
                <label htmlFor="temperature" className="text-white text-lg">GPT Model</label>
                <br/><br/>
                <button
                  className={`mx-2 py-2 px-20 text-white rounded-md focus:outline-none border border-[#00000000] hover:bg-[#00000000] hover:border-[#FFFFFF] hover:border ${chatType === 'gpt-3.5' ? 'bg-[#414bd4]' : ''}`}
                  onClick={() => handleChatTypeChange('gpt-3.5')}>
                  GPT 3.5
                </button>
                <button
                  className={`mx-2 py-2 px-20  text-white rounded-md focus:outline-none border border-[#00000000] hover:bg-[#00000000] hover:border-[#FFFFFF] hover:border  ${chatType === 'gpt-4' ? 'bg-[#414bd4]' : ''}`}
                  onClick={() => handleChatTypeChange('gpt-4')}>
                  GPT 4
                </button>
              </div>
              <div className="text-center mb-20 margin text-lg">
                <label htmlFor="temperature" className="text-white">Temperature</label>
                <br/><br/>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={handleTemperatureChange}
                  style={{ width: "60%" }}
                />
                <br/>
                <span className="text-slate-200">{temperature}</span>
              </div>
              <div className="text-center mb-10 margin">
                <label htmlFor="customText" className="text-white text-lg">Custom Text</label>
                <br/><br/>
                <textarea
                  className="mt-3 border border-gray-700 hover:border-white bg-transparent rounded p-2 font-normal"
                  id="customText"
                  value={customText}
                  onChange={handleCustomTextChange}
                  rows="3"
                  style={{ width: "60%", resize: "none" }}
                />
              </div>
              <div className="flex justify-center mb-10 flex-col">
                <button
                  className="bg-[#161a55] hover:bg-[#4d517a] w-[150px] text-white  text-opacity-100 opacity-80 py-2 px-8 rounded mr-2"
                  onClick={handleSubmit}
                >
                  SAVE 
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-8 rounded w-[150px]"
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
