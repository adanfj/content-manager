import React, { useState } from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoSelector = ({host}) => {
    const [code, setCode] = useState("")
    const [topic, setTopic] = useState("")
    const [title, setTitle] = useState("")
    return (
        <>
            <input className='url' value={code} placeholder="Code..." onChange={e => setCode(e.target.value)} type="text" name="" id="" />
            {//<input className='' value={topic} placeholder="Topic..."        onChange={e=>setTopic(e.target.value)} type="text" name="" id="" />
            }
            <input className='' value={title} placeholder="Title..." onChange={e => setTitle(e.target.value)} type="text" name="" id="" />
            <div className="input-button" onClick={async e => {
                if (code !== "" && title !== "") {
                    await fetch(host + "/prepare/video/youtube", {
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