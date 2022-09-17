import { useState } from "react";

function RangeInput({ range, updateRange }) {
    const [minvalue, setMinvalue] = useState("");
    
    const handleChange = (e, item) => {
        updateRange(item, e?.target?.value); setMinvalue(range["min"])
    };

    return ["min", "max"].map((item, index) => (
        <div key={index}>
            <label htmlFor={item + "PageToSelect"} className="numberRanges-labels preview-nav-labels">
                {item === "min" ? "From" : "To"}
            </label>
            <input
                type="number" onChange={ e => handleChange(e, item) } id={item + "PageToSelect"} 
                className="numberRanges" min={item === "min" ? "1" : minvalue} 
            />
        </div>
    ));
}

export default RangeInput