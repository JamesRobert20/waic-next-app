
function CoverPageCanvas( { files, covercanvases }) {
  
  return files.map( (file, index) => (
    <canvas id={"cover-page-"+index} key={index} width={400}></canvas>
  ))
}

export default CoverPageCanvas