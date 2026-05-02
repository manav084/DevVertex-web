import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import userProfile from '../assets/userProfile.png'

const Connections = () => {
    const [errors, setErrors] = useState("")
   const  connectionURL = BASE_URL + "/user/connections"
        const connections = useSelector(store=>store.connections)
   const dispatch = useDispatch()

    const fetchConnections =async() =>{
        try {
            const res = await axios.get(connectionURL,{withCredentials:true})

            dispatch(addConnections(res.data.data))


            
        } catch (error) {
            console.error(error.message)
            setErrors(error.response?.data?.message || "Something went wrong")
        }
       
        
    }

     useEffect(() => {
          fetchConnections()
        }, [])
    if(!connections) return

    // if(connections.length === 0) return <h1>No Connections Found</h1>

         if(connections.length === 0) return (
    <div className='flex flex-col items-center justify-center my-20 gap-3'>
        <p className='text-5xl'>🤝</p>
        <h1 className='text-2xl font-semibold'>No Connections Yet</h1>
        <p className='text-sm text-base-content/50'>Connect with developers and grow your network</p>
    </div>
)
        return (
    <div className='my-10 px-4'>
        <h1 className='text-center font-bold text-3xl mb-8'>Connections</h1>

        <div className='flex flex-col gap-4 max-w-2xl mx-auto'>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, about, experience, skills, role } = connection
                return (
                    <div key={connection._id}
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
        <button className='btn btn-sm btn-outline'>Reject</button>
        <button className='btn btn-sm btn-primary'>Accept</button>
    </div>

                    </div>
                )
            })}
        </div>
    </div>
)

//   return (
//     <div className='text-center my-10'>
//         <h1 className=' text-white font-bold text-3xl'>Connections</h1>

//         {connections.map((connection)=>
        
//         {
//             const {firstName, lastName, photoUrl, age,gender,about,experience,skills,role} = connection
//             return (
        
//             <div  key={connection._id} className=' flex m-4 p-4 mx-auto rounded-lg bg-base-300 gap-3 w-1/2 '>
//                 <div><img className='w-25 h-25 rounded-full'
//              src={connection.photoUrl || userProfile}
//              onError={(e) => {
//                  e.target.src = userProfile;
//                 }}
//                 /></div>
//                 <div className='text-left'>
//                     <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
               
                 
                    

//                 {role && experience &&    
//                   <p>  
//                      {role + "," +experience}
//                      </p>
//                     }
                   
//                 <p>{about}</p></div>
            
                

//                 </div>

     
//         )
// })}
//     </div>

//   )
}

export default Connections