'use client'

import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Header from '../Header';
import {useState, useRef} from 'react';

const LoginAndSignup: React.FC = () => {

    const [type, setType] = useState("signIn");
    const handleOnClick = (text: React.SetStateAction<string>) => {
        if (text !== type) {
            setType(text);
        return;
        }
    };
    const containerClass ="container w-1/2 max-h-full mt-48" + (type === "signUp" ? "right-panel-active" : "");

    const formRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const changeType = (text: string) => {
        if (text !== type) {
            setType(text);
        }
        if (text == 'signUp') {
            // console.log(text)
            
            formRef.current?.classList.add('translate-x-[100%]')
            overlayRef.current?.classList.remove('translate-x-[100%]')
        } else {
            // console.log(text)
            formRef.current?.classList.remove('translate-x-[100%]')
            overlayRef.current?.classList.add('translate-x-[100%]')
        }
    }

    const signupOverlay = <div className='flex flex-col h-full justify-center text-center items-center'>
        <h1 className='text-3xl mb-10'>Welcome Back!</h1>
        <p className='px-8'>To keep connected with us please login with your personal info</p>
        <button className='log-button ghost mt-16' onClick={() => changeType('signUp')}>Signup</button>
    </div>
    const signinOverlay = <div className='flex flex-col h-full justify-center text-center items-center'>
        <h1 className='text-3xl mb-10'>Hello, Friend!</h1>
        <p className='px-8'>Enter your personal details and start journey with us</p>
        <button className='log-button ghost mt-16' onClick={() => changeType('signIn')}>Signin</button>
    </div>

    return (
        <div className="login-and-signup-page text-center ">
            <div className="container w-1/2 max-h-full mt-48 h-[28rem] relative bg-grey1 left-1/2 translate-x-[-50%]">
                <div ref={formRef} className='absolute w-96 h-full ease-in-out duration-700'>
                    {type == "signIn" ? <LoginForm fc={() => changeType('signUp')}/> : <SignupForm/>}
                </div>
                <div ref={overlayRef} className='overlay absolute w-96 h-full translate-x-[100%] ease-in-out duration-700'>
                    {type == "signIn" ? signupOverlay : signinOverlay}
                </div>
            </div>
        </div>
    )
}

export default LoginAndSignup;