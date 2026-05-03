import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'
import userProfile from '../assets/userProfile.png'

const Requests = () => {


  const [errors, setErrors] = useState("")
  const dispatch = useDispatch()
     const requests = useSelector(state=> state.requests)

  const fetchRequestUrl = BASE_URL + "/user/requests/received"
  
  
  const reviewRequest = async (status,_id) =>{
      try {
        const reviewRequestUrl = BASE_URL + "/request/review/" + status + "/" + _id

        const res = await axios.post(reviewRequestUrl,{},{withCredentials:true})
        dispatch(removeRequests(_id))
          console.error(error)
    } catch (error) {
        console.error(error)
    }

  }

    const fetchRequests = async () =>{

        try {

              const res = await axios.get(fetchRequestUrl, {withCredentials:true})
              dispatch(addRequests(res.data.data))
            
        } catch (error) {
            console.error(error.message)
            setErrors(error.response?.data?.message || "Something went wrong")
            
        }

    }
    useEffect(() => {
     fetchRequests()
    }, [])
    
// if(!requests) return

    // if(requests.length === 0) return <h1 className='text-center'>No Requests Found</h1>

    if(!requests) return null

if(requests.length === 0) return (
    <div className='flex flex-col items-center justify-center my-20 gap-3'>
        <p className='text-5xl'>🤝</p>
        <h1 className='text-2xl font-semibold'>No Requests Yet</h1>
        <p className='text-sm text-base-content/50'>When someone sends you a request, it'll show up here</p>
    </div>
)

        return (
    <div className='my-10 px-4'>
        <h1 className='text-center font-bold text-3xl mb-8'> Connection Requests</h1>

        <div className='flex flex-col gap-4 max-w-2xl mx-auto'>
            {requests.map((request) => {
                const { firstName, lastName, photoUrl, about, experience, skills, role } = request.fromUserId
                return (
                    <div key={request._id}
                        className='flex items-center gap-5 p-5 rounded-2xl bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-shadow'>

                        {/* Photo */}
                        <img
                            className='w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-base-300'
                            src={photoUrl || userProfile}
                            onError={(e) => { e.target.src = userProfile }}
                        />

                        {/* Details */}
                        <div className='flex-1 text-left'>
                            <h2 className='font-semibold text-lg'>{firstName} {lastName}</h2>

                            {(role || experience !== undefined) && (
                                <p className='text-sm text-base-content/60 mt-0.5'>
                                    {role || "Developer"}
                                    {experience ? ` • ${experience}+ yrs exp` : " • Fresher"}
                                </p>
                            )}

                            {about && (
                                <p className='text-sm text-base-content/70 mt-1 line-clamp-1'>{about}</p>
                            )}

                            {/* {skills?.length > 0 && (
                                <div className='flex flex-wrap gap-1.5 mt-2'>
                                    {skills.slice(0, 4).map((skill, i) => (
                                        <span key={i}
                                            className='text-xs px-2.5 py-0.5 rounded-full bg-base-300 text-base-content/70 capitalize'>
                                            {skill}
                                        </span>
                                    ))}
                                    {skills.length > 4 && (
                                        <span className='text-xs text-base-content/40'>+{skills.length - 4} more</span>
                                    )}
                                </div>
                            )} */}
                        </div>
                        <div className='flex gap-2'>
        <button onClick={()=>reviewRequest('rejected',request._id)} className='btn btn-sm btn-outline'>Reject</button>
        <button onClick={()=>reviewRequest('accepted',request._id)} className='btn btn-sm btn-primary'>Accept</button>
    </div>

                    </div>
                )
            })}
        </div>
    </div>
)

}

export default Requests