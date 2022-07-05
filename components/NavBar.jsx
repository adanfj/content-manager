import { faArrowDown, faArrowDown19, faArrowDownShortWide, faArrowDownUpAcrossLine, faArrowDownUpLock, faDoorOpen, faHome, faSignIn, faTriangleCircleSquare, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const NavBar = ({ children }) => {
  //const [loggedIn, setLoggedIn] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const router = useRouter()
  const [displayChildren, setdisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("fade-out")
  const [userDropDownVisible, setUserDropDownVisible] = useState(false)
  const [currentUsername, setCurrentUsername] = useState("")
  useLayoutEffect(() => {
    if ((typeof cookies.username==undefined||cookies.username==null||cookies.username=="")&&router.asPath != "/register" && router.asPath != "/login") router.push("/login")
    setTransitionStage("fade-in")
    setCurrentUsername(cookies.username)
    if(typeof cookies.username==undefined||cookies.username==null)setCurrentUsername("")
  }, [])
  useEffect(() => {
    if ((typeof cookies.username==undefined||cookies.username==null||cookies.username=="")&&router.asPath != "/register" && router.asPath != "/login") router.push("/login")
    if (children !== displayChildren) setTransitionStage("fade-out")
  }, [children, setdisplayChildren, displayChildren])
  useEffect(()=>{
    setCurrentUsername(cookies.username)
    if(typeof cookies.username==undefined||cookies.username==null)setCurrentUsername("")
    setUserDropDownVisible(false)
    if ((typeof cookies.username==undefined || cookies.username==null||cookies.username=="")&&router.asPath != "/register" && router.asPath != "/login") router.push("/login")
  },[cookies.username])
  return (<>
    <nav>
      <div>
        <Link href="/viewer"><div className="input-button" ><FontAwesomeIcon icon={faHome} /></div></Link>
      </div>
      <div>
        {
          currentUsername === "" ?
            <Link href="/login">
              <div className="input-button" >
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Link> :
            <div className="drop-down" onMouseEnter={e => { setUserDropDownVisible(true) }} onMouseLeave={e => { setUserDropDownVisible(false) }} onTouchEnd={e => { setUserDropDownVisible(!userDropDownVisible) }}>
              <div className='"user-info'>
                <FontAwesomeIcon icon={faUserAlt}/>
                {currentUsername}
                <FontAwesomeIcon icon={faArrowDown}/>
              </div>
              {userDropDownVisible ? <>
              <div className="hl"></div>
              <div>
                <div className="drop-down-option" onClick={e=>{
                  removeCookie("username")
                  setCurrentUsername("")
                }}>Log Out <FontAwesomeIcon icon={faDoorOpen} /></div>
              </div> </>: <></>}
            </div>
        }
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
