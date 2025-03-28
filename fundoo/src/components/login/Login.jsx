import React, { useState } from 'react';
import "./Login.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginApiCall } from '../../utils/Api';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    

    const handleLogin=()=>{
        {
            let valid = true;
            setEmailError("");
            setPasswordError("");
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            const phoneRegex = /^[0-9]{10}$/;  
    
            if (!email.length) {
                setEmailError("Email is required");
                valid = false;
            }else if (!emailRegex.test(email) && !phoneRegex.test(email)) {
                setEmailError("Enter a valid Email or 10-digit Phone Number");
                valid = false;
            }
    
            if (!password.length) {
                setPasswordError("Password is required");
                valid = false;
            } else if (!passwordRegex.test(password)) {
                setPasswordError("Password must contain at least one uppercase letter, one number, and one special character");
                valid = false;
            }
    
            if (valid) {
                loginApiCall({ email, password })
                    .then(res => {
                        if (res) {
                            console.log("User logged in successfully:", res);
                            localStorage.setItem("token", res.id); 
                            toast.success("Logged In Successful");
                            navigate('/dashboard/notes'); 
                        } else {
                            setEmailError("Invalid email or password. Please try again.");
                        }
                    })
                    .catch(err => {
                        console.error("Login failed:", err);
                    });
            }
        };
    }
    const handleCreateAccount = ()=>{
        navigate('/signup');
    }
  return (
    <div>
    <div className='fundoo-login'>
      <div className='fundoo-login-box'>
        
        <div className='fundoo-login-box-line1'>
            <span>Fundo</span>
        </div>
        <div className='fundoo-login-box-line2'>
            <span>Sign in</span>
        </div>

        <div className='fundoo-login-box-line3'>
            <span>Use your Fundo Account</span>
        </div>

        <div className='fundoo-login-box-line4'>
            <TextField id="email-or-phone" label="Email or Phone *" variant="outlined"
            onChange={(e)=>setEmail(e.target.value)} error={!!emailError} helperText={emailError}/>


        </div>

        <div className='fundoo-login-box-line5'>
            <TextField id="password" label="Password *" variant="outlined" 
            onChange={(e)=>setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} />
        </div>

        <div className='fundoo-login-box-line6'>
            <Button variant="text"><h5>Forget Password</h5></Button>
        </div>

        <div className='fundoo-login-box-line7'>
            <Button variant="text" onClick={()=>handleCreateAccount()}><h5>Create Account</h5></Button>
        </div>

        <div className='fundoo-login-box-login-button'>
            <Button variant="contained" className='login-btn' onClick={()=>handleLogin()}>Login</Button>
        </div>

      </div>
      </div>

{/* box2 part  */}
      <div className='fundo-box2'>

      <div className='fundoo-login-box2-1'>
            <span>English (United States) v</span>
        </div>

        <div className='fundoo-login-box2-2'>
            <span>Help</span>
        </div>

        <div className='fundoo-login-box2-3'>
            <span>Privacy</span>
        </div>
        <div className='fundoo-login-box2-4'>
            <span>Terms</span>
        </div>

      </div>

    </div>
  )
}
