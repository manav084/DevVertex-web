import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'

const Login = () => {
 const navigate = useNavigate()
    const[emailId, setEmailId] = useState("")
    const[password, setPassword] = useState("")
    const[errors,setErrors] = useState("")
    const dispatch = useDispatch()
    const handleLogin = async() =>{

        setErrors("")
        try {

             const loginUrl = BASE_URL+"/login"
             const res = await axios.post(loginUrl,{
                emailId, password
             },{withCredentials: true})
             console.log(res.data);
             

             dispatch(addUser(res.data))
             navigate("/")
            
        } catch (error) {
            console.log(error.response) 
            setErrors(error.response?.data.message || "Something went wrong")
            console.error(error)
            
        }
       

            

    }
    return (
        <div className='flex justify-center my-16'>
            <div className="card bg-base-200 w-96 shadow-md">
                <div className="card-body gap-4">
                    <h2 className="card-title justify-center text-2xl mb-2">Welcome back</h2>

                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">Email address</span>
                        </div>
                        <input
                            type="email"
                            value={emailId}
                            onChange={(e)=>setEmailId(e.target.value)}
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
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </label>
                    <p className='text-red-600'>{errors}</p>
                    <div className="card-actions justify-center mt-2">
                        <button onClick={handleLogin} className="btn btn-primary w-full">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login