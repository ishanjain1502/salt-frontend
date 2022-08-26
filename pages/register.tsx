import React , {useState, useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_URL} from '../utils/utils'

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
            
            // window.location.href = '/login'

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
            <input
                value={username}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Think of a unique userName"
            />
            <br /><br />
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
            <input
                value={comfirm}
                onChange={(e) => setComfirm(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <br /><br />
            <input type="submit" value="Register" />
        </form>
        </div>
        <div>
            {message}
        </div>
    </div>
  )
}

export default register