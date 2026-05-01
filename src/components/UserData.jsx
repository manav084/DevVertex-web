import React from 'react'
import userProfile from '../assets/userProfile.png'

const UserData = ({ user }) => {
  const { firstName, lastName, photoUrl, skills, about,gender,age, role, experience } = user

  return (
    <div className="w-88 rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-md">

      {/* Photo */}

      
      <div className="relative h-78">
        <img
          src={photoUrl || userProfile}
          onError={(e) => { e.target.src = userProfile }}
          alt="User Photo"
          className="w-full h-full object-cover"
        />
        {/* Name + Role overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-1"
          style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
           <h2 className="text-xl font-semibold text-white drop-shadow">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-white/80">
            {role || "Developer"} &bull; {experience ? `${experience}+ yrs exp` : "Fresher"}
          </p>
        </div>
      </div>

      
  {/* <img alt="User Photo" src={user.photoUrl || userProfile} />}
      {/* Details */}
      <div className="p-5 flex flex-col gap-3">

        {/* About */}
        {about && (
          <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2">
            {about}
          </p>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index}
                className="text-xs px-3 py-1 rounded-full bg-base-200 text-base-content/70 border border-base-300 capitalize">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button className="btn btn-outline flex-1">Ignore</button>
          <button className="btn btn-primary flex-1">Interested</button>
        </div>

      </div>
    </div>
  )
}

export default UserData
