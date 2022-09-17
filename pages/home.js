function HomePage() {
    return (
      <div id='home-container'>
          <nav id='top-navbar'>
              <ul id='left-nav-items' className='nav-ul'>
              
              </ul>
              <ul id='right-nav-items' className='nav-ul'>
                  <li id='right-link-item'>
                      <a href='#w' style={{color: "white"}}>
                          Your account
                      </a>
                  </li>
                  <li id='right-img-item'>
                      <div className='account-icon-div'>
                          <img src='images/account-img.png' className='account-icon-img' />
                      </div>
                  </li>
              </ul>
          </nav>
      </div>
    )
  }
  
  export default HomePage