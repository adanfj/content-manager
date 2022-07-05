import React, { useState } from 'react'
import File from './File';

const Folder = ({folderName,topic,fileList,selectContent,setCurrentContent,contentType,select,host,rootFolder, children,onTriggerAddFileToPersonalList}) => {
    const [elementsVisible, setElementsVisible] = useState(true)
    return (<>
        {(rootFolder)?<h2 onClick={e=>{setElementsVisible(!elementsVisible)}}>{elementsVisible?"-":"+"} {folderName}</h2>:
        <h4 onClick={e=>{setElementsVisible(!elementsVisible)}}>{elementsVisible?"-":"+"} {folderName}</h4>}
        <ul >
            {(fileList&&elementsVisible)?fileList.sort().map(m =>
                <File key={m} topic={topic} setCurrentContent={setCurrentContent} fileName={m} selectContent={selectContent} contentType={contentType} host={host} editable={select} triggerAddFileToPersonalList={onTriggerAddFileToPersonalList}/>):<></>}
            {elementsVisible?children:<></>}
        </ul>
        
        </>
    )
}

export default Folder