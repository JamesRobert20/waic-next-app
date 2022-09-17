import AlternatingCheckbox from './AlternatingCheckbox';

function Checkboxgroup({ viewmode, pagesChosen }) {

    return ["Select All:", "List view:", "Gallery view:"].map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
            <label htmlFor={item} className='preview-nav-labels preview-navcheckbox-labels'>{item}</label>
            <AlternatingCheckbox
                viewmode={viewmode}
                checkboxname={item} pagesChosen={pagesChosen}
            />
        </div>
    ));
}

export default Checkboxgroup