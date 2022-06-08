import React from 'react'

const Content = ({currentContent,host}) => {
  return (
    <div className="content">
        {(currentContent[1]=="document")?<iframe src={`${host}/${currentContent[1]}/${currentContent[0]}`} frameBorder="0"></iframe>:(currentContent[1]=="image")?<img src={`${host}/${currentContent[1]}/${currentContent[0]}`}/>:<video controls>
          <source src={`${host}/${currentContent[1]}/${currentContent[0]}`} type="video/mp4" />
          </video>}
      </div>
  )
}

export default Content

