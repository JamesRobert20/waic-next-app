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
            console.log(user.email, 'logged in')
        })

        netlifyIdentity.on('logout', () => {
            setUser(null)
            console.log('Logged out')
        })

        // Initialize netlify identity connection
        netlifyIdentity.init();

        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    },[]);

    const login = () => {
        netlifyIdentity.open()
    };

    const logout = () => {
        netlifyIdentity.logout()
    };

    const userAuth = { user, login, logout };
    return (
        <UserAuthenticationContext.Provider value={userAuth}>
            {children}
        </UserAuthenticationContext.Provider>
    )
}

export default UserAuthenticationContext