import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'
import useCookie from 'react-use-cookie'

const login = ({ host }) => {
  const [pwd, setPwd] = useState("")
  const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useCookie('username', "")
  return (
    <main className="login">
      <div>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={username} onInput={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="pwd">Password: </label>
          <input type="password" name="pwd" id="pwd" value={pwd} onInput={e => setPwd(e.target.value)} />
        </div>
        <div className="input-button" onClick={async e => {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(pwd, salt);
          console.log(host + "/login")
          const response = await fetch(host + "/login", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: pwd
            })
          })
          response = await response.json()
          if(response.login){
            setLoggedIn(username,{
              days: 1,
              SameSite: 'Strict',
              Secure: true,
            })
          }
        }}><FontAwesomeIcon icon={faDoorOpen} /></div>
      </div>
    </main>
  )
}

export default login


export async function getStaticProps() {
  return {
    props: {
      host: process.env.VIDEO_SERVER_HOST,
    },
    revalidate: 60
  }
}
