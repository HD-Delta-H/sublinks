import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo\ black.png"
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMenu } from "react-icons/hi";
import axios from "axios";

export const AppBar = () => {
  const [ walletAddress, setWalletAddress ] = useState();
  const [ userData, setUserData ] = useState(null);
  const navigate = useNavigate();
  const { getUserDetails,createWallet } = useOkto();
  const { authenticate,authenticateWithUserId,getWallets } = useOkto();
  const [authToken, setAuthToken] = useState();
    const fetchWallets = async () => {
        try {
        const walletsData = await createWallet();
        setWalletAddress(walletsData.wallets[0].address);
        localStorage.setItem('walletAddress',walletsData.wallets[0].address);
        
        } catch (error) {
        console.log(`Failed to fetch wallets: ${error.message}`);
        }
    };


  useEffect(() => {
    
    fetchWallets();
  });

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        if (!authToken && authResponse.action === "signup") {
          console.log("User Signup");
        }
        console.log("auth token received", authToken);
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
                  
          <div className="flex h-full items-center">
            {/* <div className="flex h-full sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger><HiMenu size={25} className="text-primaryGreen"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/explore')}>Explore</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/my-requests')}>My Feat Requests</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/founder')}>Founders View</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
            <h1 onClick={() => navigate('/')} className="cursor-pointer text-primaryGreen ml-3 font-bold text-xl w-full flex items-center">Sublinks</h1>
            
            <div className="flex h-full  ml-10 items-center justify-center">
              <NavBarItem pathname={location.pathname} link="/home" title="Explore" />
              <NavBarItem pathname={location.pathname} link="/create" title="Create Blink" />
              <NavBarItem pathname={location.pathname} link="/account" title="Profile" />
            </div>
          </div>
          <div className="h-full flex items-center justify-center gap-3">
            
            
              { walletAddress == null 
                ? <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={(error) => {
                  console.log("Login Failed", error);
                }}
                promptMomentNotification={(notification) =>
                  console.log("Prompt moment notification:", notification)
                }
              />
                : <Button 
                onClick={async () => await navigator.clipboard.writeText(walletAddress ?? '')}
                variant={'outline'} size={'appBar'} className="px-4 py-1 bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                {`${walletAddress.slice(0, 10)}..`}
                </Button>
              }
              
          </div>
            

      </div>
    </div>
  );
}

export const NavBarItem = (args) => {
  return (
      <Link to={args.link} className="h-full flex flex-col justify-between">
          <div></div> <div></div> <div></div>
          
          <Button className={`shadow-none rounded-lg bg-white hover:bg-gray-100 font-semibold ${args.pathname == args.link ? ' text-black' : 'text-gray-500' } `}>{args.title}</Button>
          
          <div className={`h-0.5 ${args.pathname == args.link ? 'bg-black' : ''}`}></div>
      </Link>
  )
}

export const NavBarItem2 = (args) => {
  return (
      <Link to={args.link} className="h-full flex ml-3 flex-col justify-between">
          <div></div> <div></div> <div></div>
          
          <Button className={`rounded-lg bg-white hover:bg-gray-100  border-2 border-primaryGreen/50 font-semibold ${args.pathname == args.link ? ' text-black' : 'text-gray-500' } `}>{args.title}</Button>
          
          <div className={`h-0.5 ${args.pathname == args.link ? 'bg-white' : ''}`}></div>
      </Link>
  )
}