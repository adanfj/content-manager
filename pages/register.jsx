import { faRegistered } from '@fortawesome/free-regular-svg-icons'
import { faDoorOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bcryptjs from 'bcryptjs'
import React, { useState } from 'react'
import useCookie from 'react-use-cookie'

const register = ({ host }) => {
    const [pwd, setPwd] = useState("")
    const [rptpwd, setRptPwd] = useState("")
    const [username, setUsername] = useState("")
    const [loggedIn, setLoggedIn] = useCookie('username', "")
    return (
        <main className="login">
            <div>
                <h2>Register</h2>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={username} onInput={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="pwd">Password: </label>
                    <input type="password" name="pwd" id="pwd" value={pwd} onInput={e => setPwd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="rptpwd">Repeat password: </label>
                    <input type="password" name="rptpwd" id="rptpwd" value={rptpwd} onInput={e => setRptPwd(e.target.value)} />
                </div>
                {
                    pwd == rptpwd && pwd.length > 0 && username.length > 0 ? <div className="input-button" onClick={async e => {
                        var salt = bcryptjs.genSaltSync(10);
                        var hash = bcryptjs.hashSync(pwd, salt);
                        const response = await fetch(host + "/register", {
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
                        if (response.login) {
                            setLoggedIn(username,{
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                              })
                        }
                    }}><FontAwesomeIcon icon={faUserPlus} /></div> : <></>
                }
            </div>
        </main>
    )
}

export default register

export async function getServerSideProps() {
    return {
        props: {
            host: process.env.VIDEO_SERVER_HOST
        }
    }
}