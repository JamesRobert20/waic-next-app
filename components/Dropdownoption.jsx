import React from 'react';

function Dropdownoption(props) {

  return props.options.map( (option, index) => (
    <option key={index} className={props.optionClassName} > {option} </option>
  ));

}

export default Dropdownoption