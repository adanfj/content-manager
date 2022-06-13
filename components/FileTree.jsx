import React from 'react'
import $ from 'jquery'
const FileTree = ({ media, setCurrentContent, BackComponent, style }) => {
  
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
  Object.keys(media).map(m=>separateArray(media[m]))
 
  return (
    <div className='file-tree' style={style}>
      {(BackComponent) ? BackComponent : <></>}
      {
        Object.keys(media).map(k => {
          const mArr = separateArray(media[k])
          return <React.Fragment key={k}>
          <h2>{k}</h2>
          <ul>
            {mArr[0].map(m =>
              <li key={m} onClick={e => {
                selectContent($(e.target)); setCurrentContent([m, k.toLowerCase().slice(0,-1)]);
                try { $(".content > video")[0].load(); }
                catch (e) { }
              }}>{m}
              </li>
            )}
            {

              Object.keys(mArr[1]).map(topic => <>
                <h4>{topic}</h4>
                <ul>
                  {mArr[1][topic].map(m => <li key={m} onClick={e => {
                    selectContent($(e.target)); setCurrentContent([topic + "/" + m, k.toLowerCase().slice(0,-1)]);
                    try { $(".content > video")[0].load(); }
                    catch (e) { }
                  }}>{m}
                  </li>)}
                </ul>
              </>)
            }
          </ul>
        </React.Fragment>})
      }
    </div>
  )
}

export default FileTree

