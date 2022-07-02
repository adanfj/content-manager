import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'

const login = ({ host }) => {
  const [pwd, setPwd] = useState("")
  const [username, setUsername] = useState("")
  return (
      <main className="login">
        <div>
          <input type="text" name="username" id="username" value={username} onInput={e => setUsername(e.target.value)} />
          <input type="password" name="pwd" id="pwd" value={pwd} onInput={e => setPwd(e.target.value)} />
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
            console.log(response)
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
