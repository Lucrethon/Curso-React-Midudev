import { createContext, type ReactNode } from "react";
import { useContext, useState } from "react";

type ModalContextType = {
    isModalOpen : boolean,
    setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({children} : {children: ReactNode}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false) 

    return (
        <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            {children}
        </ModalContext.Provider>
    )
}   

export const useModalContext = () => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('useModalContext se debe usar dentro de un ModalContextProvider')
    }

    return context
}