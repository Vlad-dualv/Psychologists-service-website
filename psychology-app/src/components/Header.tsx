"use client"

import { useState } from "react"
import LoginModal from "./modals/LoginModal"
import RegisterModal from "./modals/RegisterModal"
import { useAuth } from "@/context/AuthContext"

export default function Header({}) {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const {user, logout} = useAuth()


    return (
        <header>
            {user ? (
                <div>
                    <span>Welcome, {user.displayName}</span>
                    <button type="button" onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button type="button" onClick={() => setShowLoginModal(true)}>Sing In</button>
            <button type="button" onClick={() => setShowRegisterModal(true)}>Registration</button>
                </div>
            )}
            
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
            <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
        </header>
    )

}