"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", public: true },
    { href: "/psychologists", label: "Psychologists", public: true },
    { href: "/favorites", label: "Favorites", public: false },
  ];

  const visibleLinks = navLinks.filter((link) => link.public || user);

  const activeLink = (href: string) => pathname === href;

  return (
    <>
    <header className="w-full bg-white p-[34px] border-b-grey">
      <div className="max-w-[1280px]">
        <Link href="/">
          <span>psychologists.</span>services<span></span>
        </Link>
        <nav>
          {visibleLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          {user ? (
            <div>
                <div>
                    <UserRound/>
                    <span>{user.displayName}</span>
                </div>
              
              <button type="button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={() => setShowLoginModal(true)}>
                Log In
              </button>
              <button type="button" onClick={() => setShowRegisterModal(true)}>
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

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
