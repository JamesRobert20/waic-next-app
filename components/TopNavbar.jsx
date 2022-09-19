import Head from 'next/head'
import Link from "next/link"

function TopNavbar() {
  return (
    <>
    <Head>
        <title>Content Manager</title>
    </Head>
    <nav id='top-navbar'>
        <ul className='left-nav-ul nav-ul'>
            <li className="left-link-item">
                <Link href="/home"><a>Home</a></Link>
            </li>
            <li className="left-link-item">
                <Link href='/createCollection'><a> Create New Collection </a></Link>
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
        </ul>
    </nav>
    </>
  )
}

export default TopNavbar