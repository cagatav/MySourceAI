import { useState, useEffect, useRef } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';
import StarsCanvas from "@/components/StarBackground";
import TypingAnimation from "../components/TypingAnimation";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message,}],
      temperature: 0.7,
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
    <div className="h-screen">
      <div className="relative w-1/2 inset-x-0 h-2/3 rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b] border-[#ffffff69] mx-auto my-24 overflow-y-auto cursor-all-scroll  overflow-x-hidden" ref={chatBoxRef}>
        <div className="w-full">
          <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent  bg-clip-text text-center pt-10 pb-0 font-bold text-4xl select-none">AI Chat</h1>
          <div className="p-6">
            <div className="flex flex-col space-y- w-full">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div
                    className={`${
                      message.type === 'user' ? 'bg-[#0e395caa]' : 'bg-[#161a55]'
                    } rounded-lg p-4 text-white max-w-sm`}>
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-transparent rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative inset-x-0 w-1/2 rounded-lg border border-[#ffffff69] mx-auto bottom-12 flex">
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            type="text"
            className="px-4 py-2 w-11/12 bg-transparent text-white focus:outline-none"
            placeholder="Ask something to MySourceAI!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-4 text-gray-400 focus:outline-none font-semibold hover:text-white hover:scale-110 duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
