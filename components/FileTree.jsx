import React from 'react'

const FileTree = ({documents,images,videos,setCurrentContent}) => {
  return (
    <div className='file-tree'>
        <h2>Documents (PDF):</h2>
        <ul>
          {documents.map(document => <li key={document} onClick={e=>{setCurrentContent([document,"document"])}}>{document}</li>)}
        </ul>
        <h2>Images:</h2>
        <ul>
          {images.map(image => <li key={image} onClick={e=>{setCurrentContent([image,"image"])}}>{image}</li>)}
        </ul>
        <h2>Videos:</h2>
        <ul>
          {videos.map(video => <li key={video} onClick={e=>{setCurrentContent([video,"video"])}}>{video}</li>)}
        </ul>
      </div>
  )
}

export default FileTree
