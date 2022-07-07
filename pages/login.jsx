import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const login = ({ host }) => {
  const [pwd, setPwd] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const router = useRouter()
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
          <input  type="password" name="pwd" id="pwd" value={pwd} onInput={e => setPwd(e.target.value)} />
        </div>
        {
          error?<div>
            <p>Username or password incorrect, try again!</p>
          </div>:<></>
        }
        <div>
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
            if (response.login==true) {
              setCookie("username", username, {
                days: 1,
                SameSite: 'Strict',
                Secure: true,
              })
              router.push("/")
            }
            else{
              setError(true)
            }
          }}><FontAwesomeIcon icon={faDoorOpen} /></div>
        </div>
        <div style={{
          width: "100%",
          justifyContent: "left"
        }}>
          <Link style={{ alignSelf: "end" }} href="/register">Don't have an account?</Link>
        </div>
      </div>
    </main>
  )
}

export default login


export async function getStaticProps() {
  return {
    props: {
      host: process.env.VIDEO_SERVER_HOST,
    }
  }
}
