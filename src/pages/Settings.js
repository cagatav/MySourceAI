import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useState } from "react";

export default function Settings() {
  const [chatType, setChatType] = useState('gpt-3.5');
  const [temperature, setTemperature] = useState(0.5);

  const handleChatTypeChange = (selectedType) => {
    setChatType(selectedType);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  const handleSubmit = () => {
    console.log('Selected Chat Type:', chatType);
    console.log('Selected Temperature:', temperature);
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <div className="h-auto">
      <div className="h-screen">
        <div className="text-transparent mt-[1200px]" id="settings">Settings</div>
        <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 pb-1 font-semibold text-3xl select-none mt-[100px]">Settings</h1>
        
        <div className="relative w-1/2 inset-x-0 h-2/3 flex rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b] border-[#ffffff69] mx-auto mt-8 overflow-y-auto overflow-x-hidden">
          <div className="w-full">
            <div className="pt-24">
            <div className="flex justify-center mb-12">
              <button
                className={`mx-2 py-2 px-20 bg-[#161a55] text-white rounded-md focus:outline-none ${chatType === 'gpt-3.5' ? 'bg-[#161a55]' : ''}`}
                onClick={() => handleChatTypeChange('gpt-3.5')}>
                GPT 3.5
              </button>
              <button
                className={`mx-2 py-2 px-20 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-md focus:outline-none ${chatType === 'gpt-4' ? 'bg-gray-600' : ''}`}
                onClick={() => handleChatTypeChange('gpt-4')}>
                GPT 4
              </button>
            </div>
            <div className="text-center mb-20 margin">
              <label htmlFor="temperature" className="text-white">Temperature</label>
              <br/>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={handleTemperatureChange}
                style={{ width: "60%" }}
              />
              <br/>
              <span className="text-slate-200">{temperature}</span>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#161a55] hover:opacity-100 hover:text-opacity-100 transition-transform text-white  text-opacity-100 opacity-80 py-2 px-8 rounded mr-2"
                onClick={handleSubmit}
              >
                SAVE
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-8 rounded"
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