import { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'

function PdfViewer({ url, filename, viewState, index, coverPageDone, pageDone }) {
    //console.log("The file ", filename, "tried to render page ", index);
    const prevState = useRef(false);

    const canvasRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

    const [pdfRef, setPdfRef] = useState();
    const currentPage = viewState === "cover-page" ? 1 : index;

    const renderPage = useCallback((pageNum, pdf = pdfRef) => {
        if(!prevState.current)
        {
            pdf && pdf.getPage(pageNum).then(function (page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport
                };

                page.render(renderContext).promise.then( 
                    () => setTimeout( 
                        () => {
                            if(viewState === "cover-page")
                                coverPageDone(index, filename, canvasRef.current.toDataURL("image/png"), pdf.numPages);
                            else
                                pageDone(index, filename, canvasRef.current.toDataURL("image/png"));
                        }
                    ,300) 
                );

                prevState.current = true;   
            });
        }
    }, [pdfRef]);

    useEffect(() => {
        renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage, renderPage]);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(loadedPdf => {
            setPdfRef(loadedPdf);
        }, function (reason) {
            console.error(reason);
        });
    }, [url]);

    return (
        <canvas id={viewState === "cover-page" ? "cover-page-" + index : "page-" + index} ref={canvasRef}></canvas>
    )
}

export default PdfViewer