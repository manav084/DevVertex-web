import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)
  const fetchUser = async () => {

    try {


      if (userData) return
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      }
      )
      dispatch(addUser(res.data.data))

    } catch (error) {

      // if (error.status === 401) {
      //   navigate("/login")
      // }
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body