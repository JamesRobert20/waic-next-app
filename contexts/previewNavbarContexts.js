import { createContext } from "react"

const PreviewContext = createContext();

export const PreviewNavbarContextProvider = ({ children, value }) => {
    return (
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    )
}

export default PreviewContext