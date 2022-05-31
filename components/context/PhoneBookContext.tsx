import { useState, createContext } from "react";

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

    const savePhoneList = (list: phoneListProps) => {
        const newList: phoneListProps = {
            name:list.name.toUpperCase(),
            phone:list.phone
        };
        setPhoneDetails([...phoneDetails, newList]);
      };
      
    return <PhoneContext.Provider value={{ phoneDetails, savePhoneList }}>{children}</PhoneContext.Provider>
}

