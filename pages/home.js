import LibraryRow from "../components/LibraryRow"
import Link from "next/link"

function HomePage() {
    return (
        <div id='home-container'>
            <nav id='top-navbar'>
                <ul id='left-nav-items' className='nav-ul'>
                    <li>
                        <Link href='/createCollection'><a style={{color: "white"}}> Create New Collection </a></Link>
                    </li>
                </ul>
                <ul id='right-nav-items' className='nav-ul'>
                    <li id='right-link-item'>
                        <Link href='/'><a style={{color: "white"}}> My account </a></Link>
                    </li>
                    <li id='right-img-item'>
                        <div className='account-icon-div'>
                            <img src='images/account-img.png' className='account-icon-img' />
                        </div>
                    </li>
                </ul>
            </nav>
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
  }
  
  export default HomePage