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

		const response = await fetch('http://localhost:1337/api/v1/signin', {
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

		if (data.user) {
			localStorage.setItem('token', data.user)
            console.log(data);
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}


  return (
    <div></div>
  )
}

export default login