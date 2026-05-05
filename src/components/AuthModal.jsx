import React from 'react'
import { Link } from 'react-router'

const AuthModal = ({ onClose }) => {
    return (
        <dialog className="modal modal-open">
            <div className="modal-box text-center">
                <h3 className="font-bold text-xl mb-2">Join DevVertex</h3>
                <p className="text-base-content/70 mb-6">
                    Login or signup to connect with developers
                </p>
                <div className="flex gap-3 justify-center">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <button onClick={onClose} className="btn btn-outline">Cancel</button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    )
}

export default AuthModal