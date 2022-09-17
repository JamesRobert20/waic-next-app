import { useRef } from "react";

function Video({ index, url, filename, coverPageDone, mode }) {
    const videoRef = useRef(); 

    const obtainData = () => {
        if (mode === "initial")
        {
            /* setTimeout(() => {
                var canv = document.createElement("canvas");
                document.getElementById("cover-pages").appendChild(canv);
                canv.width = 400;
                canv.height = 400;
            
                console.log("drawing the image now");
                canv.getContext('2d').drawImage(videoRef.current, 0, 0, canv.width, canv.height);
            }, 2500); */
            coverPageDone(index, filename, url, null);
        }
    }; 

    return (
        <video ref={videoRef} onCanPlayThrough={obtainData} controls>
            Your browser does not support video preview!
            <source src={url} type="video/mp4"/>
        </video>
    )
}

export default Video