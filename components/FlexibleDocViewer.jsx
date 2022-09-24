/* import dynamic from "next/dynamic"
//import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
//import { useEffect } from "react"
const DocViewer = dynamic(
    () => import('react-doc-viewer'), 
    { ssr: false }
);

const { PDFRenderer, PNGRenderer } = dynamic(
    () => import('react-doc-viewer'), 
    { ssr: false }
);

function FlexibleDocViewer({ docs }) {

    
    /* useEffect(() => {
        (async function(){
            const DocViewer = await import('@cyntler/react-doc-viewer');
            const { DocViewerRenderers } = await import('@cyntler/react-doc-viewer');
            console.log("done importing")
            console.log(DocViewer);
            console.log(DocViewerRenderers);
        })();
    },[]); 

    return (
        <DocViewer documents={docs} pluginRenderers={[PDFRenderer, PNGRenderer]} />
    )
}

export default FlexibleDocViewer */