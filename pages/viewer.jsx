import React, { useState } from 'react'
import Content from '../components/Content'
import FileTree from '../components/FileTree'
/*
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
*/
const ContentViewer = (props) => {
  const [currentContent, setCurrentContent] = useState(["","documents"])
  
  return (
    <main className='viewer'>
      <FileTree setCurrentContent={setCurrentContent} documents={props.documents} images={props.images} videos={props.videos}></FileTree>
      <Content currentContent={currentContent} host={props.host}></Content>
    </main>
  )
}

export default ContentViewer

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
