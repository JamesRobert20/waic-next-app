import { createContext } from "react"

const FilesContext = createContext();

export const FileContextProvider = ({ children, value }) => {
    return (
        <FilesContext.Provider value={value}>
            {children}
        </FilesContext.Provider>
    )
}

export default FilesContext