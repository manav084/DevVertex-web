import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserData from './UserData'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector(store=> store.feed)
  const feedUrl = BASE_URL+"/feed"
  const getFeed =async()=>{

    if(feed && feed.length>0) return
    try {
          const res = await axios.get(feedUrl,{withCredentials: true})

      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.error(error)
    }
  

  }

  useEffect(()=>{
    getFeed()
  },[])

  return (
   

      <div className='flex justify-center m-5'> {
         feed && feed.length>0 ?<UserData user ={feed[0]}
         />  : <h1 className='text-center text-2xl'>No More Users!</h1>
      }
        
        
        </div>
    
  )
}

export default Feed