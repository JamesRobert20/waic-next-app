import { useState } from 'react'

function SearchBar(props) {
  const [searchbarFocused, setSearchbarFocused] = useState(false);

  return (
    <div className={props.barClassName + (searchbarFocused ? " bar-focused": "")}>
        <img alt="search-icon" src="./images/search-icon.jpg" className="search-image" />
        <input 
          type="text" name="searchContextInner" placeholder="Search" 
          className={props.inputClassName}
          onChange={ (e) => props.updateContent(e?.target?.value) }
          onFocus={ () => setSearchbarFocused(true) }
          onBlur={ () => setSearchbarFocused(false) }
          />
    </div>
  )
}

export default SearchBar