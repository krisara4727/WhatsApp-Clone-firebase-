import React from 'react'
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    //dispatch is like a gun shoot at the data inside the store redux;
    // we use redux or store to access the components from every where
    // we cant do using react coz we have to pass information from parent to child to child to last chld 
    const [{ }, dispatch] = useStateValue();


    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message))
    }
    return (
        <div className='login'>
            <div className='login_container'>
                <img src="https://cdn5.vectorstock.com/i/1000x1000/80/59/whatsapp-logo-icon-vector-29228059.jpg" title="Whatsapp logo icon vector image" alt="Whatsapp logo icon"></img>
                <div className="login_text">
                    <h1> Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>Sign In WhatsApp</Button>
            </div>
        </div>
    )
}

export default Login
