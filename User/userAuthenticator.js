import { createContext, useEffect, useState } from "react"
import netlifyIdentity from 'netlify-identity-widget'

const UserAuthenticationContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: false
});

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Initialize netlify identity connection
        netlifyIdentity.init();
    },[]);

    return (
        <UserAuthenticationContext.Provider value={user}>
            {children}
        </UserAuthenticationContext.Provider>
    )
}

export default UserAuthenticationContext