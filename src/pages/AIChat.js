import { useState, useEffect, useRef } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

export default function AIChat() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      // Boş veya sadece boşluk içeren bir girdi varsa uyarı göster
      toast.error('Sending empty messages is not allowed. Please enter some text before sending a message.');
      return;
    }
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  }
  
  const sendMessage = (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message,}],
      temperature: 0.1,
      max_tokens: 200
    };
    setIsLoading(true);
    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);
  return (
    <div className="h-auto">
      <div className= "text-transparent" id="ai-chat">MySourceAI</div>
      <div className="h-screen">
        <div className="relative w-full md:w-1/2 xx:w-4/5 inset-x-0 h-2/3 rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b] border-[#ffffff69] mx-auto my-24 overflow-y-auto overflow-x-hidden" ref={chatBoxRef}>
          <div className="w-full">
            <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 pb-0 font-semibold text-3xl select-none">
              AI Chat</h1>
              <div className="flex flex-col  space-y-4 w-full p-6">
                <label className=" flex bg-[#161a5575] backdrop-blur-sm rounded-lg p-4 text-white max-w-fit prose text-inherit break-words">
                  Hello! Welcome to MySourceAI!</label>
                  {chatLog.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                      <div
                        className={`${
                          message.type === 'user' ? 'bg-[#0e395c75]' : 'bg-[#161a5575] backdrop-blur-sm'
                        } prose text-inherit break-words rounded-lg p-4 text-white max-w-sm`}>
                        {message.message}
                      </div>
                    </div>
                  ))}
                {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-[#161a5575] rounded-xl p-5 py-7 text-white max-w-sm backdrop-blur-sm">
                    <TypingAnimation/>
                  </div>
                </div>
              )}
              </div>
          </div>
        </div>
        <div className=" md:w-1/2 xx:w-4/5 relative inset-x-0 w-1/2 border border-[#ffffff69] mx-auto bottom-12 flex backdrop-blur-sm rounded-lg">
          <form onSubmit={handleSubmit} className="w-full flex ">
            <input
              type="text"
              className="px-4 py-2 w-11/12 bg-transparent text-white focus:outline-none"
              placeholder="Ask something to MySourceAI!"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}/>
            <button
              type="submit"
              className="px-5 py-4 text-gray-400 focus:outline-none font-semibold hover:text-white hover:scale-110 transition-transform">
              Send
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
