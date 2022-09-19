import { createContext, useEffect, useState } from "react"
import netlifyIdentity from 'netlify-identity-widget'

const UserAuthenticationContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: false
});

// testeraccount@nothing.com
// Testeraccountokay2022

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()
            console.log(user, 'logged in')
        })

        // Initialize netlify identity connection
        netlifyIdentity.init();
    },[]);

    const login = () => {
        netlifyIdentity.open()
    };

    const userAuth = { user, login };
    return (
        <UserAuthenticationContext.Provider value={userAuth}>
            {children}
        </UserAuthenticationContext.Provider>
    )
}

export default UserAuthenticationContext