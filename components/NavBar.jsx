import { faHome, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const NavBar = ({ children,login }) => {
  
  const router = useRouter()
  const [displayChildren, setdisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("fade-out")
  useEffect(() => {
    if(!login)router.push("/login")
    setTransitionStage("fade-in")
  }, [])
  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fade-out")

  }, [children, setdisplayChildren, displayChildren])

  return (<>
    <nav>
      <div>
        <Link href="/viewer"><div className="input-button" ><FontAwesomeIcon icon={faHome} /></div></Link>
      </div>
      <div>
        <Link href="/login"><div className="input-button" ><FontAwesomeIcon icon={faUser} /></div></Link>
      </div>
    </nav>
    <div onTransitionEnd={() => {
      if (transitionStage === "fade-out") {
        setdisplayChildren(children)
        setTransitionStage("fade-in")
      }
    }} className={`nav-content ${transitionStage}`}>
      {displayChildren}
    </div>
  </>
  )
}

export default NavBar

export async function getServerSideProps() {
  return {
    props:{
      login: checkCookie("username")
    }
  }
}