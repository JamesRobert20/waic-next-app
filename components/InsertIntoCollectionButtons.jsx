import { useEffect, useState } from 'react';
import InsertButton from './InsertButton';

function InsertIntoCollectionButtons({ submitPages, submitMorePages, insertToCollectionBtn }) {
    useEffect(() => {
        setButtonsToShow(
            insertToCollectionBtn.mainState === "Add to Deck" ? ["Add to Deck"] : 
            ["Insert Into Deck", ...Array.apply(null, {length: insertToCollectionBtn.number - 1}).map((el, index) => ""+(index+1))])
    },[insertToCollectionBtn]);

    const [buttonsToShow, setButtonsToShow] = useState(
        insertToCollectionBtn.mainState === "Add to Deck" ? 
            ["Add to Deck"] : 
        ["Insert Into Deck", ...Array.apply(null, {length: insertToCollectionBtn.number - 1}).map((el, index) => ""+(index+1))]
    );    

    return (
        <div id="insertPagesButtonsContainer">
            <InsertButton submitMorePages={submitMorePages} submitPages={submitPages} buttonsToShow={buttonsToShow} />
        </div>
    )
}

export default InsertIntoCollectionButtons