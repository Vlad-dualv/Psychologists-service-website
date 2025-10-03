"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserRound } from "lucide-react"
import { useAuth } from "@/context/AuthContext";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import Modal from "./ui/Modal";

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home", public: true },
    { href: "/psychologists", label: "Psychologists", public: true },
    { href: "/favorites", label: "Favorites", public: false },
  ];

  const visibleLinks = navLinks.filter((link) => link.public || user);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header className="w-full py-2 md:py-6 border-b border-b-[#cccccc] sticky top-0 z-50">
      <div className="max-w-[1280px] w-full px-4 md:px-6 mx-auto">
        <div className="flex justify-between items-center">
          <nav className="flex items-center">
            <Link href="/" className="mr-6 md:mr-10 xl:mr-[130px] flex items-center text-lg md:text-[20px] font-bold">
              <span className="text-brand-green">psychologists.</span><span>services</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {visibleLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="py-2 hover:text-brand-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            className="md:hidden p-2 relative z-50" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserRound size={20}/>
                  <span>{user.displayName}</span>
                </div>
                <button 
                  type="button" 
                  onClick={logout}
                  className="border border-gray-300 px-4 py-2 rounded-[30px] hover:bg-slate-100 transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center font-[500]">
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(true)} 
                  className="border border-gray-300 px-4 md:px-6 py-2 md:py-3 rounded-[30px] hover:bg-slate-100 transition duration-300 ease-in-out"
                >
                  Log In
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowRegisterModal(true)} 
                  className="border text-brand-white bg-brand-green px-4 md:px-6 py-2 md:py-3 rounded-[30px] hover:bg-brand-green-hover transition duration-300 ease-in-out whitespace-nowrap"
                >
                  Registration
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Full-screen mobile menu overlay */}
    {isMobileMenuOpen && (
      <div className="md:hidden fixed inset-0 z-40 bg-white">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          <nav className="flex flex-col items-center gap-6 mb-8">
            {visibleLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-2xl font-medium hover:text-brand-green transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-4 mt-8 pt-8 w-full max-w-sm">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-lg">
                  <UserRound size={24}/>
                  <span>{user.displayName}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border border-gray-300 px-6 py-3 rounded-[30px] hover:bg-slate-100 transition text-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border border-gray-300 px-6 py-3 rounded-[30px] hover:bg-slate-100 transition text-lg font-medium"
                >
                  Log In
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowRegisterModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border text-brand-white bg-brand-green px-6 py-3 rounded-[30px] hover:bg-brand-green-hover transition text-lg font-medium"
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )}

    {/* MODALS */}
    <Modal 
      isOpen={showLoginModal} 
      onClose={() => setShowLoginModal(false)}
      title="Log In"
    >
      <LoginForm onSuccess={() => setShowLoginModal(false)} />
    </Modal>

    <Modal 
      isOpen={showRegisterModal} 
      onClose={() => setShowRegisterModal(false)}
      title="Registration"
    >
      <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
    </Modal>
    </>
  );
}