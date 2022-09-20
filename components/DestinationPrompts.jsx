import { useContext } from 'react'
import FilesContext from '../contexts/filesContext'

function DestinationPrompts() {
    const { renewFileslist: renewList, fileslist: oldList, changeFileUploadState: updateState } = useContext(FilesContext);

    const printStuff = stuff => {
        let filesList = Object.keys(stuff).filter(file => stuff[file].name.toLowerCase().includes(".pdf") || stuff[file].name.toLowerCase().includes(".mp4") || stuff[file].name.toLowerCase().includes(".jpg") || stuff[file].name.toLowerCase().includes(".png"))
                            .map( file => ({ filename: stuff[file].name, lastmodified: {}, url:  URL.createObjectURL(stuff[file])}) );

        console.log("The new stuff list  ", filesList);
        //setTheSourcePath(URL.createObjectURL(stuff[0]));
        if(filesList.length !== 0)
        {
            let oldy = oldList.map(file => file.filename);
            let newy = filesList.map(file => file.filename);

            let checker = oldy.length === newy.length;

            oldy.forEach((element,index) => {
                if(element !== newy[index])
                    checker = false;
            });

            //console.log("are they the same ", checker);

            if(!checker)
                renewList(filesList);

            updateState(false);
        }
        else
        {
            alert("There are no compatible files in this folder!")
        }
        
    };

    return (
        <div className='promptsContaier'>
            <label>Choose the source folder</label>
            <input onChange={(e) => printStuff(e?.target?.files)} type="file" webkitdirectory="" directory=""/>
        </div>
    )
}

export default DestinationPrompts