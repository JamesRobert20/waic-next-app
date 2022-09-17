import React from 'react';
import Dropdownoption from './Dropdownoption';

function Categorydropdown(props) {

  return props.categories.map( (category, index) => (
        <select onChange={(e) => {
                category.name === "fileType-tag"? props.updateFileTypeFilter(e?.target?.value): props.updateLastModFilter(e?.target?.value);
            }} 
            key={index} className={props.classNameForSelect + " " + category.name}>
            <Dropdownoption optionClassName={"tag-names"} options={category.fields} />
        </select>
    ));
    
}

export default Categorydropdown