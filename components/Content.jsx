import Image from 'next/image'
import React from 'react'

const Content = ({currentContent,host, onVideoChanged, style}) => {
  return (
    <div className="content" style={style}>
        {(currentContent[1]=="document")?<iframe src={`${host}/${currentContent[1]}/${currentContent[0]}`} frameBorder="0"></iframe>:(currentContent[1]=="image")?<img src={`${host}/${currentContent[1]}/${currentContent[0]}`}/>:<video onTimeUpdate={e=>{
          let time = e.target.currentTime.toFixed(2).split(".")
          let seconds = parseInt(time[0])
          time=(parseInt(seconds/3600)).toLocaleString('en-US',{
            minimumIntegerDigits: 2
          })+":"+(parseInt(seconds/60)%60).toLocaleString('en-US',{
            minimumIntegerDigits: 2
          })+":"+(seconds%60).toLocaleString('en-US',{
            minimumIntegerDigits: 2
          })+"."+time[1]
          if(onVideoChanged) onVideoChanged(time)
        }} controls>
          <source src={`${host}/${currentContent[1]}/${currentContent[0]}`} type="video/mp4" />
          </video>}
      </div>
  )
}

export default Content

