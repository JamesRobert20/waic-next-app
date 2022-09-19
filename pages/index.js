import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import UserAuthenticationContext from '../User/userAuthenticator'

export default function Home() {
    const { user, login } = useContext(UserAuthenticationContext);

    console.log("preventing prop drilling got: ", user);

    return (
        <>
        <Head>
            <title>Content Manager</title>
        </Head>
        <div className={styles.landingContainer}>
            <nav className={styles.navbar+" "+styles.landingNavbar}>
                <ul className={styles.landingNavUl+" "+styles.leftUlItems}>
                    <Link href="/createCollection">
                        <a style={{fontSize: "x-large"}}>Try out Guest mode</a>
                    </Link>
                </ul>
                <ul className={styles.landingNavUl+" "+styles.rightUlItems}>
                    <button className={styles.GuestmodeBtn} onClick={login}>Signup/Login</button>
                </ul>
            </nav>
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
