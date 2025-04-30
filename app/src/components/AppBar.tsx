import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export const AppBar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get wallet address from localStorage if available
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    console.log("Google login response:", credentialResponse);
    
    try {
      // Implement your authentication logic here
      // This is a simplified version without Okto
      const randomWalletAddress = `0x${Math.random().toString(16).slice(2, 10)}`;
      localStorage.setItem('walletAddress', randomWalletAddress);
      setWalletAddress(randomWalletAddress);
      
      navigate("/account");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
        <div className="flex h-full items-center">
          <h1 onClick={() => navigate('/')} className="cursor-pointer text-primaryGreen ml-3 font-bold text-xl w-full flex items-center">Sublinks</h1>
          
          <div className="flex h-full ml-10 items-center justify-center">
            <NavBarItem pathname={location.pathname} link="/home" title="Explore" />
            <NavBarItem pathname={location.pathname} link="/dashboard" title="Dashboard" />
            <NavBarItem pathname={location.pathname} link="/create" title="Create Blink" />
            <NavBarItem pathname={location.pathname} link="/account" title="Profile" />
          </div>
        </div>
        <div className="h-full flex items-center justify-center gap-3">
          {walletAddress == null 
            ? <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            : <Button 
                onClick={async () => await navigator.clipboard.writeText(walletAddress)}
                variant={'outline'} size={'appBar'} className="px-4 py-1 bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                {`${walletAddress.slice(0, 10)}..`}
              </Button>
          }
        </div>
      </div>
    </div>
  );
}

interface NavBarItemProps {
  pathname: string;
  link: string;
  title: string;
}

export const NavBarItem = ({ pathname, link, title }: NavBarItemProps) => {
  return (
    <Link to={link} className="h-full flex flex-col justify-between">
      <div></div>
      <div></div>
      <div></div>
      
      <Button className={`shadow-none rounded-lg bg-white hover:bg-gray-100 font-semibold ${pathname === link ? ' text-black' : 'text-gray-500'}`}>
        {title}
      </Button>
      
      <div className={`h-0.5 ${pathname === link ? 'bg-black' : ''}`}></div>
    </Link>
  )
} 