import React from 'react'

const Content = ({currentContent,host}) => {
  return (
    <div className="content">
        {(currentContent[1]=="document")?<iframe src={`${host}/${currentContent[1]}/${currentContent[0]}`} frameBorder="0"></iframe>:<></>}
      </div>
  )
}

export default Content

