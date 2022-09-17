
function LandingPage() {
    return (
      <div className='landing-container'>
          <nav className="navbar landing-navbar">
              <ul className="landing-nav-ul left-ul-items">
                  <button className="Guestmode-btn" onClick={() => {}}>
                      Try out Guest mode
                  </button>
              </ul>
              <ul className="landing-nav-ul right-ul-items">
                  <button className="Log-in-btn Guestmode-btn" onClick={() => {}}>LOG IN</button>
                  <button className="Sign-up-btn Guestmode-btn" onClick={() => {}}>SIGN UP</button>
              </ul>
          </nav>
          <center>
              <h1 className="landing-heading">Your very own library</h1>
              <p style={{fontSize: "xx-large", fontWeight: "bold", color: "lightblue"}}>
                  Manage files from your computer, onedrive or <br />google drive
                  through a well built content <br />management system with an easy to use Interface and </p>
          </center>
          
      </div>
    )
  }
  
  export default LandingPage