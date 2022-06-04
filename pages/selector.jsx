import React, { useState } from 'react'
import Content from '../components/Content'

const ContentSelector = (props) => {
  const [currentContent, setCurrentContent] = useState(["","documents"])
  return (
    <main className='selector'>
      <div>
      {["🎥","🖼","PDF"].map(s=><label className='input-button' key={s}><input type="file" onChange={e=>{
        let formData = new FormData()
        e.target.files.map(f=>formData.append(f.name,f))
        fetch(process.env.VIDEO_SERVER_HOST+'/documents')
      }}  accept={(s=="🎥")?"video/*":(s=="🖼")?"image/*":".pdf"}/>{s}</label>)}
      </div>
      <Content currentContent={currentContent} host={props.host}></Content>
    </main>
  )
}

export default ContentSelector

export async function getStaticProps() {
  let documents = await fetch(process.env.VIDEO_SERVER_HOST+'/documents')
  documents = await documents.json()
  let images = await fetch(process.env.VIDEO_SERVER_HOST+'/images')
  images = await images.json()
  let videos = await fetch(process.env.VIDEO_SERVER_HOST+'/videos')
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