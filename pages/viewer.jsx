import React, { useEffect, useState } from 'react'
import Content from '../components/Content'
import FileTree from '../components/FileTree'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrop } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head';
/*
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
*/
const ContentViewer = ({media,host}) => {
  const [currentContent, setCurrentContent] = useState(["", "documents"])
  /*useEffect(() => {
    const router = useRouter()
    if (!login||login==false) router.push("/login")
  }, [])*/
  return (
    <main className='viewer'>
      <Head>
        <title>A Personal Viewer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FileTree
        BackComponent={<Link href="/selector"><div className='link' ><FontAwesomeIcon icon={faCrop} /></div></Link>}
        setCurrentContent={setCurrentContent} media={media}></FileTree>
      <Content currentContent={currentContent} host={host}></Content>
    </main>
  )
}

export default ContentViewer

export async function getServerSideProps({req,res}) {
  let documents, images, videos,username=req.cookies.username
  try {
    documents = await fetch(process.env.VIDEO_SERVER_HOST + '/documents', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })
    documents = await documents.json()

    videos = await fetch(process.env.VIDEO_SERVER_HOST + '/videos', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })
    videos = await videos.json()

    images = await fetch(process.env.VIDEO_SERVER_HOST + '/images', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })
    images = await images.json()
    
  }
  catch (e) {
    documents = []
    images = []
    videos = []
  }

  return {
    props: {
      host: process.env.VIDEO_SERVER_HOST,
      media: {
        "Documents": documents,
        "Images": images,
        "Videos": videos
      }
    },
    //revalidate: 60
  }
}
