import React, { useEffect, useState } from 'react'
import Content from '../components/Content'
import FileTree from '../components/FileTree'
import TimeSelector from '../components/TimeSelector'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faCrop, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import VideoSelector from '../components/VideoSelector'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'
import { checkCookie } from '../lib/cookie'


const ContentSelector = (props) => {
  const [currentContent, setCurrentContent] = useState(["", "documents"])
  const [fileTypes, setFileTypes] = useState({ "🎥": ["video/*", "/video"], "🖼": ["image/*", "/image"], "PDF": [".pdf", "/document"] })
  const [topic, setTopic] = useState("")
  const [snippetTitle, setSnippetTitle] = useState("")
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("00:00:00")
  const [currentUpdater, setCurrentUpdater] = useState(t => setEndTime)
/*
  useEffect(() => {
    const router = useRouter()
    if(!login)router.push("/login")
  }, [])
  */

  return (
    <main className='selector'>
      <Head>
        <title>A Personal Selector</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className='upload-menu'>
        <Link as="viewer" href="/viewer"><div className='input-button link' ><FontAwesomeIcon icon={faArrowRotateLeft} /></div></Link>
        {Object.keys(fileTypes).map(s => <label className='input-button' key={s}><input type="file" onChange={async e => {
          let formData = new FormData()
          for (let i = 0; i < e.target.files.length; i++) {
            const f = e.target.files.item(i);
            formData.append(f.name, f)
          }
          await fetch(props.host + fileTypes[s][1], {
            method: "POST",
            body: formData
          })
        }} accept={fileTypes[s][0]} /><span>{s}</span></label>)}
        <div className="separator"></div>
        <VideoSelector host={props.host} />
      </div>


      <div>
        <FileTree host={props.host} select={true} setCurrentContent={setCurrentContent} media={props.media} />
        <Content style={{
          gridColumn: "1/4",
          //gridRow:(currentContent[1] != "video")?"1/4":""
        }} currentContent={currentContent} host={props.host} onVideoChanged={currentUpdater} />

        {currentContent[1] == "video" ? <>
          <TimeSelector onClick={e => setCurrentUpdater(t => setStartTime)} value={startTime} onChangeValue={setStartTime}></TimeSelector>
          <input value={topic} onChange={e => setTopic(e.target.value)} type="text" name="" id="" placeholder='Topic...' />
          <TimeSelector onClick={e => setCurrentUpdater(t => setEndTime)} value={endTime} onChangeValue={setEndTime}></TimeSelector>
          <input value={snippetTitle} onChange={e => setSnippetTitle(e.target.value)} type="text" name="" id="" placeholder='Snippet title...'

          />

          <div className="input-button" style={{

            cursor: (topic !== "" && snippetTitle !== "" && startTime !== endTime) ? "pointer" : "no-drop"
          }} onClick={async e => {
            if (topic !== "" && snippetTitle !== "" && startTime !== endTime) {
              await fetch(props.host + "/split/video", {
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
            }
          }}><FontAwesomeIcon icon={faFileUpload} /></div>

        </> : <></>}

      </div>

    </main>

  )
}

export default ContentSelector

export async function getServerSideProps() {
  let documents,images,videos
  try{
    documents = await fetch(process.env.VIDEO_SERVER_HOST + '/documents')
    documents = await documents.json()
    images = await fetch(process.env.VIDEO_SERVER_HOST + '/images')
    images = await images.json()
    videos = await fetch(process.env.VIDEO_SERVER_HOST + '/videos/topics')
    videos = await videos.json()
  }
  catch(e){
    documents = ["test1.pdf"]
    images = ["test1.png"]
    videos = ["test1.mp4"]
  }
  return {
    props: {
      host: process.env.VIDEO_SERVER_HOST,
      media: {
        "Documents": documents,
        "Images": images,
        "Videos": videos
      },
      login: checkCookie("username")
    }
  }
}