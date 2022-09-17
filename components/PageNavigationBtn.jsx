
function PageNavigationBtn({ buttonName, pageInView }) {

    const navigationClick = () => pageInView.update(buttonName === "previous" ? pageInView.number - 1: pageInView.number + 1, buttonName);

    return (
        <div
            id={buttonName === "previous" ? "prevbtn-container" : "nextbtn-container"}
            className='prevnextcontainers' onClick={() => navigationClick()}
        >
            <img
                alt={buttonName === "previous" ? "previous-button" : "next-button"}
                src={buttonName === "previous" ? "images/prvBtn.png" : "images/nxtBtn.png"}
                className="prevnext-button"
            />
        </div>
    )
}

export default PageNavigationBtn