import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'


const File = ({ fileName, selectContent, setCurrentContent, contentType, host, editable, topic }) => {
    const [fname, setFname] = useState(fileName)
    const [isEditing, setIsEditing] = useState(false)
    const [removed, setRemoved] = useState(false)
    useEffect(() => {
      //console.log(fname)
        $("#file-edit").trigger("focus")
    }, [isEditing])
    
    return (
        !removed?<li onDrag={e=>{console.log(e)}}>{
            (isEditing) ? <input id="file-edit" onChange={e => { setFname(e.target.value) }} onBlur={async e => {
                await fetch(host + "/rename", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        file: contentType + "/" + (topic ? (topic + "/") : "") + fileName,
                        name: fname
                    })
                })
                setIsEditing(false)
            }} type="text" style={{
                color: "#555",
                width: "100%"
            }} value={fname} />: 
            
            <div onClick={e => {
                selectContent($(e.target)); 
                setCurrentContent([(topic?(topic + "/"):"") + fname, contentType.toLowerCase().slice(0, -1)]);
                try { $(".content > video")[0].load(); }
                catch (e) { }
            }}>{fname.split(".")[0]}</div>

        }{editable && !isEditing ? <span onClick={async e => {
            await fetch(host + "/delete", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file: contentType + "/" + (topic ? (topic + "/") : "") + fname
                })
            })
            setRemoved(true)
        }}>
            <FontAwesomeIcon style={{ margin: "0" }} fixedWidth size="xs" icon={faRemove} /></span> : <></>
            }{
                editable && !isEditing ? <span onClick={e => {setIsEditing(true); }}><FontAwesomeIcon style={{ margin: "0" }} fixedWidth size="xs" icon={faPencil} /></span> : <></>
            }
        </li>:<></>
    )
}

export default File