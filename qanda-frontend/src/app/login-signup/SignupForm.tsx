import React, { useState, useRef } from "react";
import { useRouter } from 'next/navigation'


const SignupForm: React.FC = () => {

    const router = useRouter()
    const [state, setState] = React.useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        repass: ""
    });

    const errorRef = useRef<(HTMLDivElement | null)[]>([])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;    
        if (evt.target.name === 'phone') {
            const reg = /^(\s*|\d+)$/
            if (reg.test(value)) {
                setState({...state, phone: value })
                if (!evt.target.nextElementSibling?.classList.contains('hidden')) {
                    evt.target.nextElementSibling?.classList.add('hidden')
                }
            }
        } else {
            setState({
                ...state,
                [evt.target.name]: value
            });
            if (!evt.target.nextElementSibling?.classList.contains('hidden')) {
                evt.target.nextElementSibling?.classList.add('hidden')
            }
            if (evt.target.name == 'repass' && !errorRef.current[5]?.classList.contains('hidden'))  {
                errorRef.current[5]?.classList.add('hidden')
            }
        }
        // console.log(reg.test(value))
    };
    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { name, email, phone, password, repass } = state;
        if (name === "" || email === "" || phone === "" || password === "" || repass === "") {
            if (name === "") {
                errorRef.current[0]?.classList.remove('hidden')
            }
            if (email === "") {
                errorRef.current[1]?.classList.remove('hidden')
            }
            if (phone === "") {
                errorRef.current[2]?.classList.remove('hidden')
            }
            if (password === "") {
                errorRef.current[3]?.classList.remove('hidden')
            }
            if (repass === "") {
                errorRef.current[4]?.classList.remove('hidden')
            }
        } else {
            for (const key in state) {
                setState({
                    ...state,
                    [key]: ""
                });
            }
    
            if (password === repass) {
                fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        password,
                        role: 'customer',
                        gender: '',
                        birth: null
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            router.push("/")
                        }
                    })
            } else {
                errorRef.current[5]?.classList.remove('hidden')
            }
    
        }

    }

    return (
        <div className="signup-form-container form-container w-full mt-4">
            <h1 className="font-bold text-2xl">Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group pt-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input type="text" name="name" value={state.name} onChange={handleChange} className="form-control h-8 w-2/3 bg-grey3" id="name" placeholder="Name" />
                    <div ref={(el) => errorRef.current[0] = el} className="hidden text-[12px] mx-auto text-left w-2/3 mb-[-18px]  italic text-[#ff416c]">Vui lòng điền tên</div>
                </div>
                <div className="form-group pt-6">
                    {/* <label htmlFor="email">Email</label> */}
                    <input type="email" name="email" value={state.email} onChange={handleChange} className="form-control h-8 w-2/3 bg-grey3" id="email" placeholder="Email" />
                    <div ref={(el) => errorRef.current[1] = el} 
                        className="hidden text-[12px] mx-auto text-left w-2/3 mb-[-18px]  italic text-[#ff416c]">
                            Vui lòng điền email
                    </div>
                </div>
                <div className="form-group pt-6">
                    {/* <label htmlFor="email">Email</label> */}
                    <input type="phone" name="phone" value={state.phone} onChange={handleChange} className="form-control h-8 w-2/3 bg-grey3" id="phone" placeholder="Phone number" />
                    <div ref={(el) => errorRef.current[2] = el} 
                        className="hidden text-[12px] mx-auto text-left w-2/3 mb-[-18px]  italic text-[#ff416c]">
                            Vui lòng điền số điện thoại
                    </div>
                </div>
                <div className="form-group pt-6">
                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" name="password" value={state.password} onChange={handleChange} className="form-control h-8 w-2/3 bg-grey3" id="password" placeholder="Password" />
                    <div ref={(el) => errorRef.current[3] = el} 
                        className="hidden text-[12px] mx-auto text-left w-2/3 mb-[-18px]  italic text-[#ff416c]">
                            Vui lòng điền mật khẩu
                    </div>
                </div>
                <div className="form-group pt-6">
                    {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                    <input type="password" name="repass" value={state.repass} className="form-control h-8 w-2/3 bg-grey3" onChange={handleChange} id="confirmPassword" placeholder="Confirm Password" />
                    <div ref={(el) => errorRef.current[4] = el} 
                        className="hidden text-[12px] mx-auto text-left w-2/3 italic text-[#ff416c]">
                            Vui lòng điền lại mật khẩu
                    </div>
                </div>    
                <div className="form-group absolute left-0 right-0 mx-auto bottom-8">
                    <div ref={(el) => errorRef.current[5] = el} 
                        className="hidden text-[12px] mx-auto text-left w-2/3 italic text-[#ff416c]">
                            Nhập lại mật khẩu không đúng
                    </div>
                    <button className="log-button">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;