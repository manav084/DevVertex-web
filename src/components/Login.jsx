import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")

    const [isLogin, setIsLogin] = useState(false)
    const [errors, setErrors] = useState("")
    const dispatch = useDispatch()

     const loginUrl = BASE_URL + "/login"
     const signUpUrl = BASE_URL + "/signup"

    const handleLogin = async () => {

        setErrors("")
        try {
            const res = await axios.post(loginUrl, {
                emailId, password
            }, { withCredentials: true })
            console.log(res.data);

            dispatch(addUser(res.data))
            navigate("/")
        } catch (error) {
            console.log(error.response)
            setErrors(error.response?.data.message || "Something went wrong")
            console.error(error)
        }

    }

    const handleSignUp = async() =>{
        setErrors("")

            try {
            
                const res = await axios.post(signUpUrl  , {firstName, lastName ,emailId, password},{withCredentials:true})
                console.log(res.data.data)
                dispatch(addUser(res.data.data))
                navigate("/profile")
                
            } catch (error) {
                 console.log(error.response)
            setErrors(error.response?.data.message || "Something went wrong")
            console.error(error)
            }
        
    }
    return (
        <div className='flex justify-center items-start py-8'>
            <div className="card bg-base-200 w-96 shadow-md">
                <div className="card-body gap-4">
                    <h2 className="card-title justify-center text-2xl mb-2"> {isLogin ? 'Welcome back' : 'Welcome to Dev Vertex'}</h2>
                    {!isLogin && (
                        <>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter First Name "
                                    className="input input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Last Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter Last Name"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </>
                    )}

                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">Email address</span>
                        </div>
                        <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">Password</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </label>
                    <p className='text-red-600'>{errors}</p>
                    <div className="card-actions justify-center mt-2">
                        <button onClick={()=>isLogin ? handleLogin() : handleSignUp()} className="btn btn-primary w-full">{isLogin ? "Login" : "Sign up"}</button>
                    </div>
                    <p className="text-center text-sm mt-2 cursor-pointer text-primary hover:underline transition" onClick={()=>setIsLogin(value=> !value)}>{isLogin ? "Don't have an account? Sign up"
                        : "Already have an account? Log in"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login