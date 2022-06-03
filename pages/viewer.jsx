import React from 'react'

const ContentViewer = () => {
  return (
    <main>
        <div></div>
        <div className="content"></div>
    </main>
  )
}

export default ContentViewer

export async function getStaticProps() {
  return {
    props: {
      title: 'Content Viewer',
      description: 'Content Viewer',
      keywords: 'Content Viewer',
    },
  }
}

export async function getServerSideProps() {
  return {
    props: {
      title: 'Content Viewer',
      description: 'Content Viewer',
      keywords: 'Content Viewer',
    },
  }
}