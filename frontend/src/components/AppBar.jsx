import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMenu } from "react-icons/hi";

export const AppBar = () => {
  const [ walletAddress, setWalletAddress ] = useState();
  const [ userData, setUserData ] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
      const address = localStorage.getItem('walletAddress');
      if (address) {
        setWalletAddress(address);
      }
      fetchUser();
  });

  const fetchUser = async () => {
    if (walletAddress == null) return;
    // const data = await getUserByAddress(walletAddress);
    // setUserData(data);
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
                  
          <div className="flex h-full">
            <div className="flex h-full sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger><HiMenu size={25} className="text-primaryGreen"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/explore')}>Explore</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/my-requests')}>My Feat Requests</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/founder')}>Founders View</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1 onClick={() => navigate('/')} className="cursor-pointer text-primaryGreen ml-3 font-bold text-xl w-full flex items-center">FeatLink</h1>
            
            <div className="sm:flex h-full hidden ml-10">
              <NavBarItem pathname={location.pathname} link="https://plutofy.live/" title="Demo" />
              <NavBarItem pathname={location.pathname} link="/explore" title="Explore" />
              <NavBarItem pathname={location.pathname} link="/my-requests" title="My Feat Requests" />
              <NavBarItem2 pathname={location.pathname} link="/founder" title="Founder's View" />
            </div>
          </div>
          <div className="h-full flex items-center gap-3">
              {
                walletAddress != null && userData != null && 
                <div className="h-9 gap-1 items-center flex border-2 rounded-full px-5 border-primaryGreen/50">
                  <p className="font-bold text-lg text-black">{userData.featCoinBalance}</p>
                  <img src="/fire.png" alt="Fire" className="h-5 w-5"/>
                </div>
              }
            
            <Button 
            onClick={async () => await navigator.clipboard.writeText(walletAddress ?? '')}
            variant={'outline'} size={'appBar'} className="bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                  { walletAddress == null 
                    ? 'Wallet Not Connected' 
                    : `${walletAddress.slice(0, 10)}..`
                  }
                </Button>
          </div>
            

      </div>
      {/* <div className="bg-primaryGreen py-2 text-sm items-center text-white w-full flex justify-center">
        <a href="https://plutofy.live/" className="text-md text-bold px-2 hover:cursor-pointer">See Demo for full functionality.</a>A few features may not work as FeatLink was built on a local Solana cluster.
      </div> */}
    </div>
  );
}

export const NavBarItem = (args) => {
  return (
      <Link to={args.link} className="h-full flex flex-col justify-between">
          <div></div> <div></div> <div></div>
          
          <Button className={`rounded-lg bg-white hover:bg-gray-100 font-semibold ${args.pathname == args.link ? ' text-black' : 'text-gray-500' } `}>{args.title}</Button>
          
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