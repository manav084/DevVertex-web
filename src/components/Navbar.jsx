import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userProfile from '../assets/userProfile.png'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store)=> store.user)
const logoutUrl = BASE_URL+"/logout"
  const handleLogout = async() =>{
    try {

       await axios.post(logoutUrl, {}, {withCredentials: true})

        dispatch(removeUser())
        navigate('/login')
      
    } catch (error) {
      console.error(error)
      
    }

  }
  
  
  return (
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">DevVertex</Link>
  </div>
  <div className="flex gap-2">
  {user && (
    <div className="dropdown dropdown-end mx-5  flex items-center gap-3">


      <p className="text-sm font-medium">Welcome, {user.firstName}</p>

   
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          
          {/* <img alt="User Photo" src={user.photoUrl || userProfile} /> */}

          <img
  src={user.photoUrl || userProfile}
  onError={(e) => {
    e.target.src = userProfile;
  }}
/>
        </div>
      </div>

      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-50 w-52 p-2 shadow">
        <li><Link to='/profile' className="justify-between">Profile<span className="badge">New</span></Link></li>
        <li><Link to='/connections'>Connections</Link></li>
        <li><Link to='/requests'>Requests</Link></li>
        <li><button onClick={handleLogout}>LogOut</button></li>
      </ul>

    </div>
  )}
</div>
</div>
  )
}

export default Navbar