import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { useBasePrompt } from './BasePromptContext';


export default function AIChat() {
    const { basePrompt } = useBasePrompt();  // Context'ten basePrompt'u çekin
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatType, setChatType] = useState('GPT 3.5');
    const [temperature, setTemperature] = useState(0.5);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const storedChatLog = JSON.parse(localStorage.getItem('chatLog')) || [];
        const savedChatType = localStorage.getItem('chatType') || 'gpt-3.5-turbo-0301';
        const savedTemperature = parseFloat(localStorage.getItem('temperature')) || 0.1;
        
        setChatLog(storedChatLog);
        setChatType(savedChatType);
        setTemperature(savedTemperature);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            toast.error('Sending empty messages is not allowed. Please enter some text before sending a message.');
            return;
        }
        sendMessage(inputValue);
        setInputValue('');
    }

    const sendMessage = (message) => {
        const url = '/api/chat';
        const lastFiveMessages = chatLog.slice(Math.max(chatLog.length - 5, 0));
        const dialogHistory = lastFiveMessages.map(log => ({
            role: log.type === 'user' ? 'user' : 'system',
            content: log.message
        }));

        const fullPrompt = `${basePrompt} ${message}`;

        const data = {
            model: chatType, // Model tipi
            messages: [...dialogHistory, { role: "user", content: fullPrompt }],
            temperature: temperature, // Temperature değeri
            max_tokens: 200
        };

        // Log data including the base prompt and last five messages
        console.log("Sending the following data to the API:", data);
        console.log("Base Prompt:", basePrompt);
        console.log("Full Prompt sent to the model:", fullPrompt);
        console.log("Last five messages (dialog history):", dialogHistory);

        setIsLoading(true);
        axios.post(url, data).then((response) => {
            const newBotMessage = { type: 'bot', message: response.data.choices[0].message.content };
            const newChatLog = [...chatLog, { type: 'user', message }, newBotMessage];
            setChatLog(newChatLog);
            localStorage.setItem('chatLog', JSON.stringify(newChatLog));
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error sending message: ", error);
            setIsLoading(false);
        });
    }

    const clearHistory = () => {
        if (chatLog.length === 0) {
            toast.error("There are no messages to clear.");
        } else {
            setChatLog([]);
            localStorage.removeItem('chatLog');
            toast.success("Chat history has been cleared.");
        }
    }

    return (
        <div className="h-auto">
            <div className="text-transparent" id="ai-chat">MySourceAI</div>
            <div className="h-screen">
                <div className="relative w-full md:w-1/2 xx:w-4/5 inset-x-0 h-2/3 rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b] border-[#ffffff69] mx-auto my-24 overflow-y-auto overflow-x-hidden" ref={chatBoxRef}>
                <div className="w-full flex justify-center items-center p-4 relative">
                    <Image src="/MySourceAI-w.png" alt="logo" width={30} height={30} className="mr-3 mt-1"/>
                    <h1 className="text-transparent bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text font-semibold text-3xl select-none">
                        AI Chat
                    </h1>
                    <button
                        onClick={clearHistory}
                        style={{ position: 'absolute', right: '20px' }}
                        className="bg-transparent hover:opacity-100 opacity-70 text-gray-700 font-semibold py-2 px-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>
                        </svg>
                    </button>
                </div>
                    <div className="flex flex-col space-y-4 w-full p-6">
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
                <div className="md:w-1/2 xx:w-4/5 relative inset-x-0 w-1/2 border border-[#ffffff69] mx-auto bottom-12 flex backdrop-blur-sm rounded-lg">
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
