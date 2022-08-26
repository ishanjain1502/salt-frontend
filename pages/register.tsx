import React , {useState, useEffect} from 'react'

type Props = {}

const register = (props: Props) => {

    const [username, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [comfirm, setComfirm] = useState("")

	async function registerUser(event:any) {
		event.preventDefault()

        if(password != comfirm){
            console.log("FAILED");
            return;
        }

		const response = await fetch(`http://localhost:1337/api/v1/signup`, {
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

		if (data.message ===  "user created successfully") {
            window.location.href = '/login'
		}else{
            console.log("BS");
            
        }
	}



  return (
    <div>

        <div className="reg-con">


        <form id="reg-form" onSubmit={registerUser}>
            <h1>Register</h1>
            <input
                value={username}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
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

    </div>
  )
}

export default register