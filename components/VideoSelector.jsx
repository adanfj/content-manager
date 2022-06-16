import React, { useState } from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoSelector = ({host}) => {
    const [url, setUrl] = useState("")
    const [topic, setTopic] = useState("")
    const [title, setTitle] = useState("")
    return (
        <>
            <input className='url' value={url} placeholder="URL..." onChange={e => setUrl(e.target.value)} type="text" name="" id="" />
            {//<input className='' value={topic} placeholder="Topic..."        onChange={e=>setTopic(e.target.value)} type="text" name="" id="" />
            }
            <input className='' value={title} placeholder="Title..." onChange={e => setTitle(e.target.value)} type="text" name="" id="" />
            <div className="input-button" onClick={async e => {
                if (url !== "" && title !== "") {
                    const urlSplit = url.split("//")[1]
                    var prepare=""
                    var code=""
                    if  (url.includes("youtube")||url.includes("youtu.be")) prepare="/youtube"
                    if  (url.includes("youtube")) code=url.split("v=")[1]
                    else if  (url.includes("youtu.be")) code=url.split(".be/")[1]
                    else if  (url.includes("vimeo")){
                        code=url.split(".com/")[1]
                        prepare="/vimeo"
                    }
                    await fetch(host + "/prepare/video"+prepare, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            code: code,
                            //topic: topic,
                            title: title,
                        })
                    })
                }
            }}><FontAwesomeIcon icon={faUpload} /></div>
        </>
    )
}

export default VideoSelector