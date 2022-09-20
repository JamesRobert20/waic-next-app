import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import LibraryRow from "../components/LibraryRow"

import { useContext } from 'react'
import UserAuthenticationContext from '../User/userAuthenticator'

export default function Home() {
    const { user } = useContext(UserAuthenticationContext);

    console.log("preventing prop drilling got: ", user);

    if(user)
        return (
            <div id='home-container'>
                
                <center>
                    <div id="library-and-heading">
                        <h1 className="grey-heading">Welcome back, User</h1>
                        <div id="library-container">
                            {["Suggested","Your Collections","Your files"].map((elem, index) => (
                                <LibraryRow key={index} item={elem} />
                            ))}
                        </div>
                    </div>
                </center>     
            </div>
        )

    return (
        <>
        <div className={styles.landingContainer}>
            
            <center>
                <h1 className={styles.landingHeading}>Your very own library</h1>
                <p style={{ fontSize: "xx-large", fontWeight: "bold", color: "rgb(212, 189, 147)" }}>
                    Manage files from your computer, onedrive or <br />google drive
                    through a well built content <br />management system with an easy to use Interface<br />and enjoy the perks of having your own virtual library</p>
            </center>
        </div>
        </>
    )
}
