import React, { useState } from 'react'
import UserData from './UserData'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [about, setAbout] = useState(user.about)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [skills, setSkills] = useState(user.skills)
    const [experience, setExperience] = useState(user.experience)
    const [role, setRole] = useState(user.role)
    const [gender, setGender] = useState(user.gender)

    const [errors, setErrors] = useState("")

    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()

    const saveProfile = async () => {
        setErrors("")
        try {
            const editUrl = BASE_URL + "/profile/edit"

            const res = await axios.patch(editUrl, { firstName, lastName, age, about, photoUrl, skills, experience, role, gender }, { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setShowToast(true)

            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (error) {
            console.error(error.message)
            setErrors(error.response?.data?.message || "Something went wrong")
        }

    }


    return (
        <>
            <div className='flex justify-center items-start gap-10 my-16 px-10'>
                <div className='flex justify-center my-16'>
                    <div className="card bg-base-200 w-96 shadow-md">
                        <div className="card-body gap-4">
                            <h2 className="card-title justify-center text-2xl mb-2">Edit Profile</h2>

                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter First Name"
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

                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Age</span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Enter Age"
                                    className="input input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Gender</span>
                                </div>
                                <select

                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Photo Url</span>
                                </div>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    placeholder="Set Photo Url"
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Skills</span>
                                </div>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="Enter Skills"
                                    className="input input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Experience</span>
                                </div>
                                <input
                                    type="text"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="Enter Experience"
                                    className="input input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">Role</span>
                                </div>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Enter Role"
                                    className="input input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label pb-1">
                                    <span className="label-text font-medium">About</span>
                                </div>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Tell others about yourself..."
                                    className="textarea textarea-bordered w-full h-24 resize-none"
                                />
                            </label>
                            <p className='text-red-600'>{errors}</p>
                            <div className="card-actions justify-center mt-2">
                                <button onClick={saveProfile} className="btn btn-primary w-full">Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sticky top-10'>
                    <p className='text-center text-sm text-base-content/50 mb-3'>Live Preview</p>

                    <UserData user={{ firstName, lastName, photoUrl, skills, about, role, experience }} />
                </div>
            </div>
            {showToast && (
                <div className="fixed top-6 right-6 z-50 animate-fade-in">
                    <div className="alert alert-success shadow-lg w-80">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Profile saved successfully!</span>
                    </div>
                </div>
            )}




        </>
    )
}

export default EditProfile