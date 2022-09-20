function CollectionFolder({ folderName, styles }) {
  return (
    <div className={styles.folderContainer}>
        <img alt="folder-icon" src="images/folder-icon.png" className={styles.folderIcon}></img> 
        <div className={styles.folderName}>{folderName}</div>   
    </div>
  )
}

export default CollectionFolder