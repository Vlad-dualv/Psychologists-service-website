"use client"
import { useEffect } from "react";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

export default function AuthModal({isOpen, onClose, children, title}: ModalProps) {
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }
        if (isOpen) {
        document.addEventListener("keydown", handleEscKey)
        document.body.style.overflow = "hidden"
    }
        return () => {
            document.removeEventListener("keydown", handleEscKey)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null;

    return (
        <div onClick={handleBackdropClick}>
            <h2>{title}</h2>
            <button type="button" onClick={onClose} aria-label="close modal">X</button>
            <div>
                {children}
            </div>
        </div>
    )
}