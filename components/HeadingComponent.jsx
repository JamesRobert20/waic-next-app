import { useState, useRef } from 'react'

function HeadingComponent({ heading, updateHeading }) {
    const [mode, setMode] = useState("read");    
    const inputRef = useRef();

    //console.log("Heading component rendered with: ", heading);

    const submitHeading = () => {
        updateHeading(inputRef.current.value);
        setMode("read");
    };

    if(mode === "read")
        return (
            <div className="headingContainer">
                <img  onClick={() => setMode("edit")} alt="pencil" className="pencil-edit" title="Edit Name" src="images/pencil.png" />
                <h2 id="deckName-written">{heading}</h2>
            </div>
        )
        
  return (
    <form className="headingContainer" onSubmit={e => { e.preventDefault(); submitHeading() }}>
        <img onClick={submitHeading} alt="Checkmark" className="done-edit" src="images/done.png" />
        <input ref={inputRef} id="deckName" defaultValue={heading} />
    </form>
  )
}

export default HeadingComponent