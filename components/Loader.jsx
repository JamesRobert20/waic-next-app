import React from 'react'

function Loader( { loadSize }) {
  return (
    <div id="load-wrapper" className={ loadSize === "huge"? "large-loader": "small-loader"}> 
        <div id="the-loader" className={ loadSize === "huge"? "large-revolver": "small-revolver"}></div> 
    </div>
  )
}

export default Loader