import '../styles/globals.css'
import '../styles/App.scss'
import { useState } from 'react'
import { AuthenticationProvider } from '../User/userAuthenticator'

function MyApp({ Component, pageProps }) {

    return (
        <AuthenticationProvider>
            <Component {...pageProps} />
        </AuthenticationProvider>
    )
}

export default MyApp
