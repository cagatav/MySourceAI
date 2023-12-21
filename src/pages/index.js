import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';

import TypingAnimation from "../components/TypingAnimation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="container mx-auto max-w-[700px]"> 
      <div className="flex flex-col h-screen bg-gradient-to-b from-slate-700	 to-slate-900">
        <h1 className="bg-gradient-to-t from-slate-100	 to-slate-300 text-transparent bg-clip-text text-center pb-32 font-bold text-6xl">MySourceAI</h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-slate-600' : 'bg-slate-800'
            } rounded-lg p-4 text-white max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-transparent rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
              </div>
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-slate-600 bg-transparent">  
        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" 
          placeholder="Ask something to MySourceAI!"
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-transparent  px-5 py-3 text-gray-400 focus:outline-none hover:text-white font-semibold duration-300">Send</button>
            </div>
        </form>
        </div>
    </div>
  )
}
