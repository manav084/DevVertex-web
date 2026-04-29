import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserData from './UserData'

const Feed = () => {
  const dipsatch = useDispatch()
  const feed = useSelector(store=> store.feed)
  const feedUrl = BASE_URL+"/feed"
  const getFeed =async()=>{

    if(feed) return
    try {
          const res = await axios.get(feedUrl,{withCredentials: true})

      dipsatch(addFeed(res?.data?.data))
    } catch (error) {
      console.error(error)
    }
  

  }

  useEffect(()=>{
    getFeed()
  })

  return (
    feed &&(

      <div className='flex justify-center m-5'><UserData user ={feed[0]} /></div>
    )
  )
}

export default Feed