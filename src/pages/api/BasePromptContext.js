import React, { createContext, useState, useEffect, useContext } from 'react';

const BasePromptContext = createContext();

export const useBasePrompt = () => useContext(BasePromptContext);

export const BasePromptProvider = ({ children }) => {
    const [basePrompt, setBasePrompt] = useState("You're an intelligent assistant named MySourceAI, focused on giving precise and helpful answers. Excel in multi-turn conversations and ask for clarification if needed.");

    useEffect(() => {
        const storedBasePrompt = localStorage.getItem('basePrompt');
        if (storedBasePrompt) {
            setBasePrompt(storedBasePrompt);
        }
    }, []);

    const updateBasePrompt = (newPrompt) => {
        setBasePrompt(newPrompt);
        localStorage.setItem('basePrompt', newPrompt); 
    };

    return (
        <BasePromptContext.Provider value={{ basePrompt, updateBasePrompt }}>
            {children}
        </BasePromptContext.Provider>
    );
};
