import React, { useState } from 'react'
import Content from '../components/Content'
import FileTree from '../components/FileTree'
import TimeSelector from '../components/TimeSelector'

const ContentSelector = (props) => {
  const [currentContent, setCurrentContent] = useState(["", "documents"])
  const [fileTypes, setFileTypes] = useState({ "🎥": ["video/*", "/video"], "🖼": ["image/*", "/image"], "PDF": [".pdf", "/document"] })
  const [topic, setTopic] = useState("")
  const [snippetTitle, setSnippetTitle] = useState("")
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("00:00:00")
  return (
    <main className='selector'>
      <div className='upload-menu'>
        {Object.keys(fileTypes).map(s => <label className='input-button' key={s}><input type="file" onChange={async e => {
          let formData = new FormData()
          for (let i = 0; i < e.target.files.length; i++) {
            const f = e.target.files.item(i);
            console.log(f, f.name)
            formData.append(f.name, f)
          }
          await fetch(props.host + fileTypes[s][1], {
            method: "POST",
            body: formData
          })
        }} accept={fileTypes[s][0]} />{s}</label>)}
      </div>
      <div className='content-menu'>
        <div className='content-column'>
          <Content currentContent={currentContent} host={props.host}></Content>
          <div className="splitter" style={{
            display: (currentContent[1] != "video") ? "none" : ""
          }}>
            <TimeSelector value={startTime} onChangeValue={setStartTime}></TimeSelector>
            <input value={topic} onChange={e=>setTopic(e.target.value)} type="text" name="" id="" placeholder='Topic...' />
            <TimeSelector value={endTime} onChangeValue={setEndTime}></TimeSelector>
            <input value={snippetTitle} onChange={e=>setSnippetTitle(e.target.value)} style={{
              gridColumn: "2 / 3"
            }} type="text" name="" id="" placeholder='Snippet title...' />

            <div className="input-button" style={{
              gridColumn: "3 / 3"
            }} onClick={async e => {
              await fetch(props.host+"/split/video",{
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  filename: currentContent[0],
                  topic: topic,
                  title: snippetTitle,
                  startTime: startTime,
                  endTime: endTime
                })
              })
            }}>Upload</div>

          </div>
        </div>
        <FileTree setCurrentContent={setCurrentContent} documents={props.documents} images={props.images} videos={props.videos}></FileTree>
      </div>

    </main>
  )
}

export default ContentSelector

export async function getStaticProps() {
  let documents = await fetch(process.env.VIDEO_SERVER_HOST + '/documents')
  documents = await documents.json()
  let images = await fetch(process.env.VIDEO_SERVER_HOST + '/images')
  images = await images.json()
  let videos = await fetch(process.env.VIDEO_SERVER_HOST + '/videos')
  videos = await videos.json()
  return {
    props: {
      host: process.env.VIDEO_SERVER_HOST,
      documents: documents,
      images: images,
      videos: videos
    },
    revalidate: 60
  }
}