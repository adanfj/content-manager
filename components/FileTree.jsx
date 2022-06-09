import React from 'react'
import $ from 'jquery'
const FileTree = ({documents,images,videos,setCurrentContent,BackComponent}) => {
  const selectContent = (element)=>{
    $(".selected").removeClass("selected")
    element.addClass("selected");
  }
  return (
    <div className='file-tree'>
        {(BackComponent)?BackComponent:<></>}
        <h2>Documents (PDF)</h2>
        <ul>
          {documents.map(document => <li key={document} onClick={e=>{selectContent($(e.target)); setCurrentContent([document,"document"])}}>{document}</li>)}
        </ul>
        <h2>Images</h2>
        <ul>
          {images.map(image => <li key={image} onClick={e=>{selectContent($(e.target)); setCurrentContent([image,"image"])}}>{image}</li>)}
        </ul>
        <h2>Videos</h2>
        <ul>
          {videos.map(video => <li key={video} onClick={e=>{selectContent($(e.target)); setCurrentContent([video,"video"])}}>{video}</li>)}
        </ul>
      </div>
  )
}

export default FileTree

