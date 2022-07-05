import React from 'react'
import $ from 'jquery'
import Folder from './FileTree/Folder'
const FileTree = ({ select, media, setCurrentContent, BackComponent, style, host,onTriggerAddFileToPersonalList }) => {

  const selectContent = (element) => {
    $(".selected").removeClass("selected")
    element.addClass("selected");
  }

  const separateArray = (arr) => {
    var topic = {}
    var root = (arr.length>0) ? arr.filter(v => v.split("/").length < 2) : []
    if (arr.length > 0) {
      arr.filter(v => v.split("/").length >= 2).map(v => v.split("/")).forEach(v => {
        if (topic[v[0]] == null) topic[v[0]] = []
        topic[v[0]] = [...topic[v[0]], v[1]]
      })
    }
    return [root, topic]
  }

  return (
    <div className='file-tree' style={style}>
      {(BackComponent) ? BackComponent : <></>}
      {
        Object.keys(media).map(k => {
          let mArr = separateArray(media[k])
          return <Folder
            key={k}
            folderName={k}
            rootFolder
            fileList={mArr[0]}
            select={select}
            contentType={k}
            setCurrentContent={setCurrentContent}
            host={host}
            selectContent={selectContent}
            onTriggerAddFileToPersonalList={onTriggerAddFileToPersonalList}>
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
                  selectContent={selectContent} 
                  onTriggerAddFileToPersonalList={onTriggerAddFileToPersonalList}/>)
            }
          </Folder>
        })
      }
    </div>
  )
}

export default FileTree

