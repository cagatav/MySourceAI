import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
import { toast } from 'react-toastify';
import Image from "next/image";
import { useBasePrompt } from './api/BasePromptContext';

export default function AIChat() {
    const [textItems, setTextItems] = useState([]);
    const {basePrompt}  = useBasePrompt("") || [];
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatType, setChatType] = useState('GPT 3.5');
    const [temperature, setTemperature] = useState(0.5);
    const chatBoxRef = useRef(null);
    const [systemPrompt] = useState(`
    SYSTEM:
    You must follow the rules. Let's start step by step:
    Rule: The AI must exclusively use the context to answer questions. Do not provide answers based on general or common knowledge or external information. If a query cannot be adequately addressed with the provided context, inform the user that the answer is not available within their specific data context.  If the context lacks the information, reply, "I'm sorry, but I can't provide a definite answer based on the available context."
    Rule: If the Assistant is uncertain about the user's intent or the question's context, it should seek clarification with specific, open-ended questions that guide the user to provide more detailed information.
    Rule: Interact with understanding and respect.
    Rule: The assistant must respond in the user's message language.
    Rule: The assistant must provide general assistance without speculating if identifiers are not in the context.
    Rule: The assistant must provide concise, informative summaries in its responses, aimed at delivering clarity and relevance. Although brevity is key, flexibility is permitted to ensure completeness and usefulness of information, especially for complex queries. The assistant is encouraged to include related links for detailed exploration, focusing on delivering core insights within the response itself.
    Rule: Include images in responses when they contribute to the answer. Ensure relevance and enhance understanding without compromising user experience.
`)

const [fullPrompt, setFullPrompt] = useState('');

useEffect(() => {
    const storedTextItems = localStorage.getItem('textItems');
    if (storedTextItems) {
        const parsedTextItems = JSON.parse(storedTextItems);
        const textItemsText = parsedTextItems.map(item => item.text).join('\n \n');
        const updatedSystemPrompt = `${systemPrompt}\nCONTENT: \n${textItemsText}`;
        setTextItems(parsedTextItems);
    }
}, []);

    useEffect(() => {
        const storedChatLog = JSON.parse(localStorage.getItem('chatLog')) || [];
        const savedChatType = localStorage.getItem('chatType') || 'gpt-3.5-turbo-0125';
        const savedTemperature = parseFloat(localStorage.getItem('temperature')) || 0.1;

        setChatLog(storedChatLog);
        setChatType(savedChatType);
        setTemperature(savedTemperature);
    }, []);

    useEffect(() => {
        if(chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatLog]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            toast.error('Sending empty messages is not allowed. Please enter some text before sending a message.');
            return;
        }
        sendMessage(inputValue);
        setInputValue('');
    };

    const sendMessage = (message) => {
        const url = '/api/chat';
        const lastFiveMessages = chatLog.slice(Math.max(chatLog.length - 5, 0));
        const dialogHistory = lastFiveMessages.map(log => ({
            role: log.type === 'user' ? 'user' : 'system',
            content: log.message
        }));



        const requestData = {
            model: chatType,
            messages: [...dialogHistory, 
                        { 
                            role: "system", 
                            content: fullPrompt 
                        }, 
                        { 
                            role: "user", 
                            content: `${message}` 
                        }],
            temperature: temperature,
            max_tokens: 200
        };

        console.log(`Sending the following data to the API:`, requestData);
        
        console.log(`Full Prompt:
    `, fullPrompt);
        console.log("Human Query:",message  );
        
        setIsLoading(true);

        axios.post(url, requestData).then((response) => {
            const newBotMessage = { type: 'bot', message: response.data.choices[0].message.content };
            const newChatLog = [...chatLog, { type: 'user', message }, newBotMessage];
            setChatLog(newChatLog);
            localStorage.setItem('chatLog', JSON.stringify(newChatLog));
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error sending message: ", error);
            setIsLoading(false);
        });
    };

    const clearHistory = () => {
        if (chatLog.length === 0) {
            toast.error("There are no messages to clear.");
        } else {
            setChatLog([]);
            localStorage.removeItem('chatLog');
            toast.success("Chat history has been cleared.");
        }
    };

    return (
        <div className="h-auto">
            <div className="text-transparent select-none" id="ai-chat">.</div>
            <div className="h-screen">
                <div className="relative w-full lg:w-4/6  xx:w-4/5 inset-x-0 h-2/3 rounded-lg border bg-gradient-to-tr from-[#2e2b5285] to-[#08021b] border-white border-opacity-40 hover:border-opacity-80 duration-1000 mx-auto my-24 overflow-y-auto overflow-x-hidden" 
                ref={chatBoxRef}>
                    <div className="w-full flex justify-center items-center p-4 relative">
                        <Image src="/MySourceAI-w.png"  className="mr-3 mt-1 opacity-90 hover:opacity-100 duration-300" alt="logo" width={30} height={30}/>
                        <h1 className="text-transparent bg-gradient-to-t from-slate-100 to-slate-300 bg-clip-text font-semibold text-3xl select-none mt-1">
                            AI Chat</h1>
                        <button
                            onClick={clearHistory}
                            style={{ position: 'absolute', right: '20px'}}
                            className="bg-transparent hover:opacity-100 opacity-70 hover:scale-105 duration-500 hover:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4 w-full p-6">
                        {chatLog.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`${message.type === 'user' ? 'bg-[#0e395c47]' : 'bg-[#161a5575] backdrop-blur-sm'} 
                                    text-inherit break-words rounded-lg p-4 text-white max-w-lg`}>
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
                <div className="lg:w-4/6 xx:w-4/5 relative inset-x-0 w-1/2  mx-auto bottom-12 flex backdrop-blur-sm rounded-lg duration-1000">
                    <form onSubmit={handleSubmit} className="w-full flex ">
                        <input
                            type="text"
                            rows="2"
                            className="p-4 w-full bg-transparent text-white border border-white border-opacity-40 hover:border-opacity-80 focus:outline-none rounded-s-lg duration-500"
                            placeholder="Ask something to MySourceAI!"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}/>
                        <button
                            type="submit"
                            className="p-4 text-white focus:outline-none text-opacity-60 hover:text-opacity-100 border border-white border-opacity-40 hover:border-opacity-80  font-semibold rounded-e-lg hover:opacity-100 duration-500">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
