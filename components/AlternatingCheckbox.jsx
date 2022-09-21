import { useState, useContext, useEffect } from 'react';
import PreviewContext from '../contexts/previewNavbarContexts'

function AlternatingCheckbox({ checkboxname }) {
    const { viewmode, pagesChosen } = useContext(PreviewContext);
    const [checked, setChecked] = useState(checkboxname === "Select All:" ? 
        false : checkboxname === viewmode.mode
    );

    useEffect(() => {
        setChecked(!pagesChosen.array.includes(false));
    },[pagesChosen.array]);

    const handleSelectAll = (selectChecked) => {
        setChecked(selectChecked)
        pagesChosen.change(selectChecked);
    };

    if(checkboxname === "Select All:")
        return ( <input 
                    id={checkboxname} className="preview-nav-checkbox" 
                    type="checkbox" checked={checked} 
                    onChange={(e) => handleSelectAll(e.target.checked)} 
                />)
  
    return (
    <input 
        id={checkboxname}
        className="preview-nav-checkbox"
        type="checkbox" checked={checkboxname === viewmode.mode} 
        onChange={() => {
            setChecked(!checked);
            viewmode.mode === "List view:" ? viewmode.update("Gallery view:") : viewmode.update("List view:");
        }} 
    />
  )
}

export default AlternatingCheckbox