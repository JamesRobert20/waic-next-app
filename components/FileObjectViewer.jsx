function FileObjectViewer({ file, styles }) {
    
    return (
        <div className={styles.fileContainer}>
            <iframe src={'files/'+file} className={styles.fileElement}></iframe>
            <div className={styles.fileName}>{file}</div>
        </div>
    )
}

export default FileObjectViewer