import React, { createContext, useState, useEffect, useContext } from 'react';

const BasePromptContext = createContext();

export const useBasePrompt = () => useContext(BasePromptContext);

export const BasePromptProvider = ({ children }) => {
    // İlk değer olarak boş string veya mantıklı bir varsayılan değer atayabiliriz.
    const [basePrompt, setBasePrompt] = useState("You're an intelligent assistant named MySourceAI, focused on giving precise and helpful answers. Excel in multi-turn conversations and ask for clarification if needed.");

    useEffect(() => {
        // localStorage'dan veri çekme işlemini useEffect içinde yaparak tarayıcı tarafında olduğunu garantiliyoruz.
        const storedBasePrompt = localStorage.getItem('basePrompt');
        if (storedBasePrompt) {
            setBasePrompt(storedBasePrompt);
        }
    }, []); // Bağımlılıklar boş, yani sadece bileşen mount edildiğinde çalışacak.

    const updateBasePrompt = (newPrompt) => {
        setBasePrompt(newPrompt);
        localStorage.setItem('basePrompt', newPrompt); // Tarayıcıda yürütüldüğünden localStorage güvenli
    };

    return (
        <BasePromptContext.Provider value={{ basePrompt, updateBasePrompt }}>
            {children}
        </BasePromptContext.Provider>
    );
};
