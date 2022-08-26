import React from 'react'
import { useState,useEffect } from 'react'
import {API_URL} from '../utils/utils';
import Link from 'next/link'
import styles from '../styles/Home.module.css'

type Props = {}

const login = (props: Props) => {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [message, setMessage] = useState("")


    async function loginUser(event:any) {
		event.preventDefault()

		const response = await fetch(`${API_URL}/api/v1/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log(data);
		if (data.data) {
			localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.data.username)
           
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			// alert('Please check your username and password')
            setMessage("Please check your username and password")
		}
	}

    useEffect(() =>{

    }, [message])

  return (
    <div>
        <div className="login-con">
            <form id="loginForm" onSubmit={loginUser}>
                <h1 className="login-head">Login-Form</h1><br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br /><br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br /><br />
                <input type="submit" value="Login" />
                <br/>
                <p className={styles.link} >
                <Link href="/register">New here?</Link>
                </p>
                
            </form>
        </div>
        <div>
            {message}
        </div>
    </div>
  )
}

export default login