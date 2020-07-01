import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import './Login.css';


export default function Login() {

    const [redirect, setRedirect] = useState(false);
    const loginHandler =(event)=>{
        event.preventDefault();
        setRedirect(true);
    }
    return (
        <div className='login-page'>
            <div className='container'>
            <div className='greeting'>
            <h1>Welcome to the online image editing Bootcamp.</h1>
            <h2>I am</h2>
            </div>
            <div className='login'>
                <button>A Student</button>
                <button onClick={loginHandler}>An Instructor</button>
            </div>
            </div>
            {redirect ? <Redirect to={'/Home'} /> : null}
            
        </div>
    )
}
