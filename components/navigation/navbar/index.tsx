"use client"; // ✅ Ensure this runs on the client side

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import Button from "./Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // ✅ Correct Supabase Client
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import { AnimatePresence, motion } from "framer-motion";


const Navbar = ({ toggle }: { toggle: () => void }) => {
  const supabase = createClientComponentClient();
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedEmail = localStorage.getItem("userEmail");
  
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  
  // Add a separate effect to handle the modal autofocus
  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isModalOpen]);
  // Add a separate effect to handle the modal autofocus
  useEffect(() => {
    if (isSignUpModalOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isSignUpModalOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogin = async () => {
    const { data: user, error } = await supabase
    .from("Users")
    .select("id, password, admin")
    .eq("email", email)
    .single(); // Fetch a single matching user

    if (user) {
      const User_id = user.id;
      localStorage.setItem("user_id", User_id);
    }

    if (error || !user) {
      setErrorMessage("User does not exist.");
      return;
    }
    // Check if the entered password matches the stored password (plain-text match)
    if (user.password == password) {
      localStorage.setItem("isAuthenticated", "true"); // Save login state
      localStorage.setItem("userEmail", email);
      setIsAuthenticated(true); // ✅ Update state
      setIsModalOpen(false);
      setErrorMessage(""); // ✅ Clear error on successful login
      if(user.admin){
        localStorage.setItem("isAdmin", "true"); // Save admin state
        setIsAdmin(true); // ✅ Update state
        router.push("/dashboard"); // Redirect to protected page
      }
      else {
        // 🔄 Notify other components to update
        window.dispatchEvent(new Event("authChanged")); 
      }
      return;
    } else {
      setErrorMessage("Invalid email or password."); // ✅ Set error message
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter an email and password.");
      return;
    }
    // Check if email already exists
    const { data: existingUser, error } = await supabase
      .from("Users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      setErrorMessage("A user with this email already exists.");
      return;
    }

    await supabase.from("Users").insert([{ email, password }]); // Save user in DB
    setIsSignUpModalOpen(false);
    setErrorMessage("");
    alert("Account created successfully! Please log in.");
  };
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsLogoutModalOpen(false);
    setEmail(""); // Clear email state
    
    // 🔄 Notify other components (like the Review Component)
    window.dispatchEvent(new Event("authChanged"));

    // Only redirect if the user is on the dashboard page
    if (pathname === "/dashboard") {
      router.push("/");
    }
  };

  // Handle Enter key press to trigger login
  const handleKeyPresslogin = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  // Handle Enter key press to trigger login
  const handleKeyPresssignup = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };
  

  return (
    <div className="w-full h-auto sticky top-0 shadow-md z-50">
      <div className="dark:bg-green-800 bg-green-500 py-2 sm:py-4">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />

          <div className="items-center md:gap-x-5 gap-x-2 hidden sm:flex">
            <label className="flex-col lg:inline-flex items-center cursor-pointer">
              <span className="ms-3 text-sm pr-4 font-bold dark:text-white text-black">
                {darkMode ? "Lightmode" : "Darkmode"}
              </span>
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleDarkMode} 
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 mx-auto bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:bg-gray-700 dark:peer-focus:bg-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white dark:peer-checked:bg-white"></div>
            </label>

            {isAdmin && (
              <Link href="/dashboard" className="text-white bg-blue-500 font-bold text-center h-12 md:px-5 px-2 rounded-lg flex items-center justify-center hover:bg-blue-600">
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <><Button onClick={() => setIsLogoutModalOpen(true)} text="Sign Out" color="red" />
              <p>Welcome: {email}</p></>
            ) : (
              <><Button onClick={() => setIsModalOpen(true)} text="Sign In" />
              <Button onClick={() => setIsSignUpModalOpen(true)} text="Sign Up" color="blue" /></>
            )}
          </div>
        {/* Mobile Menu Button */}
        
        <button 
              type="button" 
              className="sm:hidden text-white text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-800 dark:text-white dark:border dark:border-zinc-200 p-6 rounded-lg w-96 z-50">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded dark:text-black"
              value={email}
              onKeyDown={handleKeyPresslogin} // Trigger login on Enter key
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded dark:text-black"
              value={password}
              onKeyDown={handleKeyPresslogin} // Trigger login on Enter key
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

            <button onClick={handleLogin} className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-900 text-white p-2 rounded">
              Log In
            </button>
            <button onClick={() => setIsModalOpen(false)} className="w-full mt-2 text-gray-500 dark:text-gray-700 p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500">
              Cancel
            </button>
            <div className="w-full inline-flex felx mt-2">
            <p className="mr-1">Don't have an account yet?</p> <button className="text-blue-600" onClick={() => { setIsSignUpModalOpen(true); setIsModalOpen(false); } }>Sign up</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-800 dark:border dark:border-red-500 p-6 rounded-lg w-96 z-50">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to sign out?</h2>
            <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded">
              Log Out
            </button>
            <button onClick={() => setIsLogoutModalOpen(false)} className="w-full mt-2 text-gray-500 dark:text-gray-700 p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Sign-Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-800 dark:border dark:border-blue-500 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <input 
            ref={emailInputRef}
            type="email" 
            placeholder="Email" 
            className="w-full p-2 mb-2 border rounded" 
            value={email} 
            onKeyDown={handleKeyPresssignup} // Trigger login on Enter key
            onChange={(e) => setEmail(e.target.value)} />
            <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 mb-2 border rounded" 
            value={password}               
            onKeyDown={handleKeyPresssignup}
            onChange={(e) => setPassword(e.target.value)} />
            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

            <button onClick={handleSignUp} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Create Account</button>
            <button onClick={() => setIsSignUpModalOpen(false)} className="w-full mt-2 text-gray-500 dark:text-gray-700 p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>

      <div>
         {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="sm:hidden flex-col bg-green-500 border-l-2 border-b-2 border-green-700 rounded-bl-lg dark:bg-green-800 opacity-95 text-white p-4 w-1/2 absolute right-0 z-50"
          >
          <label className="inline-flex mb-1 items-center cursor-pointer">
            <span className="text-sm pr-4 font-bold dark:text-white text-black">
              {darkMode ? "Lightmode" : "Darkmode"}
            </span>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode}  
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:bg-gray-700 dark:peer-focus:bg-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white dark:peer-checked:bg-white"></div>
          </label>
          <hr />

          {isAuthenticated ? (
            <>
              <p className="text-sm font-normal dark:text-white text-black break-words whitespace-normal">Welcome: 
                <br />
                <span className="font-bold dark:text-white text-black">
                {email}
                </span>
                </p>
                <hr />
              <Button onClick={() => setIsLogoutModalOpen(true)} text="Sign Out" color="none" className="text-sm font-normal dark:text-white text-black"/>              
            </>
          ) : (
            <>
              <Button onClick={() => setIsModalOpen(true)} text="Sign In" color="none" className="text-sm font-normal dark:text-white text-black"/>
                <hr />
              <Button onClick={() => setIsSignUpModalOpen(true)} text="Sign Up" color="none" className="text-sm font-normal dark:text-white text-black"/>
                            </>
          )}

          {isAdmin && (
            <>
            <hr />
            <Link href="/dashboard" className="text-sm font-normal dark:text-white text-black">
              Admin Dashboard
            </Link>
            </>
          )}
        </motion.div>
        )}
      </AnimatePresence>
      </div>
   </div>
  );
};

export default Navbar;
