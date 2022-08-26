import React , {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken'
import styles from '../styles/Home.module.css'

type Props = {}

const dashboard = (props: Props) => {
    // const name = window.localStorage.getItem('username')
    const [name, setName] = useState("")


    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				window.location.href = '/login'
			} else {
                populateName();
			}
		}
	}, [])

    async function populateName() {
		let username:any = localStorage.getItem('username')
        setName(username);
	}

  return (
    <div>Welcome <p className={styles.title} >{name}</p> </div>
  )
}

export default dashboard