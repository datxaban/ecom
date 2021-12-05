import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login=() =>{
    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const onChangeInput = event =>{
        setUser({...user,[event.target.name]:event.target.value})
    }

    const loginSubmit = async event =>{
        event.preventDefault();
        try{
            await axios.post('/user/login',{...user})
            localStorage.setItem('firstLogin',true)

            window.location.href = "/"
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }


    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" 
                    name="email" required 
                    placeholder="Email"
                    value={user.email}
                    onChange = {onChangeInput}
                />
                <input type="password" 
                    name="password"
                    required autoComplete="on" 
                    placeholder="Password" 
                    value={user.password}
                    onChange = {onChangeInput}
                />
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}
export default Login