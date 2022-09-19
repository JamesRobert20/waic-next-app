import LibraryRow from "../components/LibraryRow"
import Link from "next/link"
import TopNavbar from "../components/TopNavbar"

function HomePage() {
    return (
        <div id='home-container'>
            <TopNavbar />
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