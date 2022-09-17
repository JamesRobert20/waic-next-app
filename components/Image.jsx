
function Image({ index, url, filename, coverPageDone }) {

  return (
    <img alt={filename} src={url} onLoad={ () => coverPageDone(index, filename, url, null) } />
  )
}

export default Image