import React , {useState, useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_URL} from '../utils/utils'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


type Props = {}

const register = (props: Props) => {


    const [username, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [comfirm, setComfirm] = useState("")
    const [message, setMessage] = useState("");

	async function registerUser(event:any) {
		event.preventDefault()

        if(password != comfirm){
            console.log("FAILED");
            return;
        }

		const response = await fetch(`${API_URL}/api/v1/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log(data);
        
		if (data.message ===  "user created successfully") {
            setMessage("User Created SUccessfully");
            
            window.location.href = '/login'

		}else if(data.message === "Username already exists"){
            setMessage("username already exists");
        
        }else if(data.message === "Email already exists"){
            setMessage("Email already exists");
            
        }   
	}

    useEffect(() =>{

    }, [message])


  return (
    <div>

        <div className="reg-con">


        <form id="reg-form" onSubmit={registerUser}>
            <h1>Register</h1>
            <p>Username</p>
            <input
                value={username}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="unique userName"
            />
            <br /><br />
            <p>Email</p>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <br /><br />
            <p>Password</p>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <br /><br />
            <p>Comfirm-Password</p>
            <input
                value={comfirm}
                onChange={(e) => setComfirm(e.target.value)}
                type="password"
                placeholder="Comfirm-Password"
            />
            <br /><br />
            <input type="submit" value="Register" />
            <br/>
            <p className={styles.link} >
            <Link href="/login">Already a user?</Link>
            </p>
        </form>
        </div>
        <div>
            {message}
        </div>
    </div>
  )
}

export default register