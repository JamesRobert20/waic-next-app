
function InsertButton({ buttonsToShow, submitPages, submitMorePages }) {

    return buttonsToShow.map((item, index) => (
        <button
            onClick={
                item === "Add to Deck"  ?
                    () => submitPages() : 
                    item === "Insert Into Deck" ?
                        () => {} :
                        () => submitMorePages(item)
            }
            className={"insertPagesButtons " + 
            (item === "Add to Deck" ? 
                "mainInsert" : 
                item === "Insert Into Deck" ? 
                    "mainInsert inactive" : 
                    "smallerInsert")
            }
            key={index}
        >
            {item}
        </button>
    ));
}

export default InsertButton