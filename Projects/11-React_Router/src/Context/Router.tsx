import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useRouter } from "../Hooks/useRouter";


type RouterContext = {
    currentPath : string
    navigate : (href: string) => void
}
const RouterContext = createContext<RouterContext | null>(null)

export const RouterProvider = ({children} : {children: ReactNode}) => {
    const { currentPath, navigate } = useRouter()

    return (
        <RouterContext.Provider value={{ currentPath, navigate }}>
            {children}
        </RouterContext.Provider>
    )

}

export const useRouterContext = () => {
    const context = useContext(RouterContext)
    if (!context) {
        throw new Error("useRouterContext solo se puede usar dentro de useRouterContext.Provider")
    }
    return context
}