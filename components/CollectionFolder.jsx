function CollectionFolder({ folderName }) {
  return (
    <div className="folder-container">
        <img alt="folder-icon" src="images/folder-icon.png" className="folder-icon"></img> 
        <div className="folder-name">{folderName}</div>   
    </div>
  )
}

export default CollectionFolder