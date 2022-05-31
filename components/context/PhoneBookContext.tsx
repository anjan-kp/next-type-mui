import { useState, createContext, useEffect } from "react";

export type phoneListProps = {    
        name: string,
        phone: string    
}
type PhoneContextProviderProps = {
    children: React.ReactNode
}
export const PhoneContext = createContext<PhoneContextType | null>(null);

type PhoneContextType = {
    phoneDetails:phoneListProps[] | null;
    savePhoneList: (list:phoneListProps)=>void
}

export const PhoneContextProvider = ({ children }: PhoneContextProviderProps) => {
    const [phoneDetails, setPhoneDetails] = useState<phoneListProps[] | []>([]);
    const LOCAL_KEY = 'PHONEBOOK';
    const savePhoneList = (list: phoneListProps) => {
        const newList: phoneListProps = {
            name:list.name.toUpperCase(),
            phone:list.phone
        };
        setPhoneDetails([...phoneDetails, newList]);
      };

    useEffect(() => {
        const data = localStorage.getItem(LOCAL_KEY);
        if (data) {
            setPhoneDetails(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(phoneDetails))
    })

    return <PhoneContext.Provider value={{ phoneDetails, savePhoneList }}>{children}</PhoneContext.Provider>
}

