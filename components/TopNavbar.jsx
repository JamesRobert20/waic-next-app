import Head from 'next/head'
import Link from "next/link"
import navstyles from '../styles/Navbar.module.scss'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserAuthenticationContext from '../User/userAuthenticator'

function TopNavbar() {
    const { user, login, logout } = useContext(UserAuthenticationContext);
    const router = useRouter();

    if(user)
        return (
            <>
            <Head>
                <title>Content Manager</title>
            </Head>
            <nav className={navstyles.topNavbar}>
                <ul className={navstyles.leftNavUl+" "+navstyles.navUl}>
                    <li className={navstyles.leftLinkItem}>
                        <Link href="/"><a>Home</a></Link>
                    </li>
                    <li className={navstyles.leftLinkItem}>
                        <Link href='/CreateCollection'><a> Create New Collection </a></Link>
                    </li>
                </ul>
                <ul className={navstyles.rightNavUl+" "+navstyles.navUl}>
                    <li>
                        <Link href='/'><a> My account </a></Link>
                    </li>
                    <li>
                        <div className={navstyles.accountIconDiv}>
                            <img src='images/account-img.png' className={navstyles.accountIconImg} />
                        </div>
                    </li>
                    <li>
                        <button onClick={logout} className={navstyles.signInOrOutBtn}>Log out</button>
                    </li>
                </ul>
            </nav>
            </>
        )

  return (
    <nav className={navstyles.landingNavbar}>
        <ul className={navstyles.landingNavUl}>
            {router.pathname.slice(1).toLowerCase() !== "createcollection" ?
                <Link href="/CreateCollection">
                    <a style={{fontSize: "large"}}>Try out Guest mode</a>
                </Link>
                : <></>
            }
            <button className={navstyles.signInOrOutBtn} onClick={login}>Signup/Login</button>
        </ul>
    </nav>
  )
}

export default TopNavbar