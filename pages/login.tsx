import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

const login = (props: Props) => {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



    async function loginUser(event:any) {
		event.preventDefault()

		const response = await fetch(`http://localhost:1337/api/v1/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
			alert('Please check your username and password')
		}
	}


  return (
    <div>
        <div className="login-con">
            <form id="loginForm" onSubmit={loginUser}>
                <h1 className="login-head">Login-Form</h1><br /><br />
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
            </form>
        </div>
    </div>
  )
}

export default login