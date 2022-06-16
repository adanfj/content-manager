import React from 'react'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import Folder from './FileTree/Folder'
const FileTree = ({ select, media, setCurrentContent, BackComponent, style, host }) => {

  const selectContent = (element) => {
    $(".selected").removeClass("selected")
    element.addClass("selected");
  }

  const separateArray = arr => {
    var topic = {}
    var root = arr.filter(v => v.split("/").length < 2)
    arr.filter(v => v.split("/").length >= 2).map(v => v.split("/")).forEach(v => {
      if (topic[v[0]] == null) topic[v[0]] = []
      topic[v[0]] = [...topic[v[0]], v[1]]
    })
    return [root, topic]
  }
  Object.keys(media).map(m => separateArray(media[m]))

  return (
    <div className='file-tree' style={style}>
      {(BackComponent) ? BackComponent : <></>}
      {
        Object.keys(media).map(k => {
          const mArr = separateArray(media[k])
          return <Folder
            key={k}
            folderName={k}
            rootFolder
            fileList={mArr[0]}
            select={select}
            contentType={k}
            setCurrentContent={setCurrentContent}
            host={host}
            selectContent={selectContent}>
            {
              Object.keys(mArr[1]).map(topic =>
                <Folder key={topic}
                  folderName={topic}
                  topic={topic}
                  fileList={mArr[1][topic]}
                  select={select}
                  contentType={k}
                  host={host}
                  setCurrentContent={setCurrentContent}
                  selectContent={selectContent} />)
            }
          </Folder>
          return <React.Fragment key={k}>
            <h2>{k}</h2>
            <ul>
              {mArr[0].sort().map(m =>
                <li key={m} ><div onClick={e => {
                  selectContent($(e.target)); setCurrentContent([m, k.toLowerCase().slice(0, -1)]);
                  try { $(".content > video")[0].load(); }
                  catch (e) { }
                }}>{m}</div>{(select) ? <span><FontAwesomeIcon style={{ margin: "0" }} fixedWidth size="xs" icon={faRemove} /></span> : <></>}
                </li>
              )}

            </ul>
          </React.Fragment>
        })
      }
    </div>
  )
}

export default FileTree

