import React, { useState } from 'react'
import "./Signup.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signupImg from '../../assests/signup-page.jpg';
import { signupApiCall } from '../../utils/Api';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();

    
    const handleSignup=() =>{
        let valid = true;

        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!firstName.trim()) {
            setFirstNameError("First Name is required");
            valid = false;
        }

        if (!lastName.trim()) {
            setLastNameError("Last Name is required");
            valid = false;
        }

        if (!email.length) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Enter a valid email address");
            valid = false;
        }

        if (!password.length) {
            setPasswordError("Password is required");
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter, one number, and one special character");
            valid = false;
        }

        if (!confirmPassword.length) {
            setConfirmPasswordError("Confirm Password is required");
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            valid = false;
        }

        
        if (valid) {
            signupApiCall({ firstName, lastName, email, password, service: "advance" })
                .then(res => {
                    if (res) {
                        console.log("User signed up successfully:", res);
                        toast.success("Signup Successful");
                        navigate('/');  
                    } else {
                        setEmailError("Email already exists. Try a different email.");
                    }
                })
                .catch(err => {
                    console.error("Signup failed:", err);
                });
        }
    };
    const handleSigninInstead = ()=>{
        navigate('/');
    }
  return (
    <div>
    <div className='fundoo-signup'>
      
      <div className='fundoo-signup-box'>

        <div className='fundoo-signup-box-line1'>
            <span>Fundo</span>
        </div>

        <div className='fundoo-signup-box-line2'>
            <span>Create your fundo Account</span>
        </div>

        <div className='fundoo-signup-box-line3-img'>
            <img src={signupImg} alt='signup-img' id='signup-img'/>
        </div>



        <div className='fundoo-signup-box-line3-box'>
        <div className='fundoo-signup-box-line3'>
            <TextField id="firstName" label="First Name*" variant="outlined" 
             onChange={(e) => setFirstName(e.target.value)} error={!!firstNameError} helperText={firstNameError} />
        </div>

        <div className='fundoo-signup-box-line3'>
            <TextField id="lastName" label="Last Name*" variant="outlined" 
             onChange={(e) => setLastName(e.target.value)} error={!!lastNameError} helperText={lastNameError} />
        </div>
        </div>

        <div className='fundoo-signup-box-line4'>
            <TextField id="email" label="Email*" variant="outlined" 
             onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
        </div>

        <div className='fundoo-signup-box-line5'>
            <p>You can use letters,numbers & periods</p>
        </div>

        <div className='fundo-signup-box-line6-box'>
        <div className='fundoo-signup-box-line6'>
            <TextField id="password" label="Password*" variant="outlined" type='password' 
             onChange={(e) => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} />
        </div>

        <div className='fundoo-signup-box-line6'>
            <TextField id="confirm" label="Confirm*" variant="outlined" type='password' 
            onChange={(e) => setConfirmPassword(e.target.value)} error={!!confirmPasswordError} helperText={confirmPasswordError} />
        </div>
        </div>

        <div className='fundoo-signup-box-line7'>
            <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
        </div>

        <div className='fundoo-signup-box-line8'>
            <Button variant="text" className='signin-btn' onClick={()=>handleSigninInstead()}>Sign in instead</Button>
        </div>

        <div className='fundoo-signup-box-line6'>
            <Button variant="contained" className='register-btn' onClick={()=>handleSignup()}>Register</Button>
        </div>

      </div>
      </div>

      {/* box2 part  */}
      <div className='fundo-signup-box2'>

      <div className='fundoo-signup-box2-1'>
            <span>English (United States) v</span>
        </div>

        <div className='fundoo-signup-box2-2'>
            <span>Help</span>
        </div>

        <div className='fundoo-signup-box2-3'>
            <span>Privacy</span>
        </div>
        <div className='fundoo-signup-box2-4'>
            <span>Terms</span>
        </div>

      </div>


    </div>
  )
}
