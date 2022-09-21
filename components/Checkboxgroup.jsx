import AlternatingCheckbox from './AlternatingCheckbox';

function Checkboxgroup() {

    return ["Select All:", "List view:", "Gallery view:"].map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
            <label htmlFor={item} className='preview-nav-labels preview-navcheckbox-labels'>{item}</label>
            <AlternatingCheckbox checkboxname={item} />
        </div>
    ));
}

export default Checkboxgroup