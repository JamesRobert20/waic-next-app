import Head from 'next/head'
import Link from "next/link"
import navStyles from '../styles/Navbar.module.scss'
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
            <nav id='top-navbar'>
                <ul className='left-nav-ul nav-ul'>
                    <li className="left-link-item">
                        <Link href="/"><a>Home</a></Link>
                    </li>
                    <li className="left-link-item">
                        <Link href='/CreateCollection'><a> Create New Collection </a></Link>
                    </li>
                </ul>
                <ul className='nav-ul'>
                    <li>
                        <Link href='/'><a> My account </a></Link>
                    </li>
                    <li>
                        <div className='account-icon-div'>
                            <img src='images/account-img.png' className='account-icon-img' />
                        </div>
                    </li>
                    <li>
                        <button onClick={logout} className=".signInOrOutBtn">Log Out</button>
                    </li>
                </ul>
            </nav>
            </>
        )

  return (
    <nav className="landingNavbar">
        <ul className="landingNavUl">
            {router.pathname !== "/CreateCollection" ?
                <Link href="/CreateCollection">
                    <a style={{fontSize: "x-large"}}>Try out Guest mode</a>
                </Link>
                : <></>
            }
        </ul>
        <ul className="landingNavUl">
            <button className="signInOrOutBtn" onClick={login}>Signup/Login</button>
        </ul>
    </nav>
  )
}

export default TopNavbar