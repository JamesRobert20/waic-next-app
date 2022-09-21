import { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'

function PdfViewer({ url, filename, viewState, index, coverPageDone, pageDone }) {
    //console.log("The file ", filename, "tried to render page ", index);
    const prevState = useRef(false);

    const canvasRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

    const pdfRef = useRef();
    const currentPage = viewState === "cover-page" ? 1 : index;

    const renderPage = useCallback((pageNum, pdf = pdfRef) => {
        //console.log("render same page of ", filename)
        if(!prevState.current)
        {
            //console.log("made it... ", filename);
            pdf && pdf.getPage(pageNum).then(function (page) {
                if(canvasRef.current)
                {
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = canvasRef.current;
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport
                    };
                

                    page.render(renderContext).promise.then( () => {
                        if(canvasRef.current)
                        {
                            if(viewState === "cover-page")
                                coverPageDone(index, filename, canvasRef.current.toDataURL("image/png"), pdf.numPages);
                            else
                                pageDone(index, filename, canvasRef.current.toDataURL("image/png"));
                        }
                    });

                    prevState.current = true;   
                }
            });
        }
    }, []);


    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(loadedPdf => {
            pdfRef.current = loadedPdf;
            renderPage(currentPage, pdfRef.current);
        }, function (reason) {
            console.error(reason);
        });
    }, []);

    return (
        <canvas id={viewState === "cover-page" ? "cover-page-" + index : "page-" + index} ref={canvasRef}></canvas>
    )
}

export default PdfViewer