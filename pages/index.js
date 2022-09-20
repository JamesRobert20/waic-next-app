import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import LibraryRow from "../components/LibraryRow"
import TopNavbar from "../components/TopNavbar"
import { useContext } from 'react'
import UserAuthenticationContext from '../User/userAuthenticator'

export default function Home() {
    const { user } = useContext(UserAuthenticationContext);

    console.log("preventing prop drilling got: ", user);

    if(user)
        return (
            <div className={styles.homeContainer}>
                <TopNavbar />
                <center>
                    <div className={styles.libraryAndHeading}>
                        <h1 className={styles.greyHeading}>{"Welcome back, "+user.user_metadata.full_name.split(' ')[0]}</h1>
                        <div className={styles.libraryContainer}>
                            {["Suggested","Your Collections","Your files"].map((elem, index) => (
                                <LibraryRow styles={styles} key={index} item={elem} />
                            ))}
                        </div>
                    </div>
                </center>     
            </div>
        )

    return (
        <>
        <div className={styles.landingContainer}>
            <TopNavbar />
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
