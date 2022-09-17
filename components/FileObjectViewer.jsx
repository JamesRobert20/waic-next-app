function FileObjectViewer({ file }) {
    
    return (
        <div className="file-container">
            <object data={'files/'+file} type="application/pdf" className="file-element"></object>
            <div className="file-name">{file}</div>
        </div>
    )
}

export default FileObjectViewer