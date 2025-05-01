import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@civic/auth-web3/react";
import { saveUserToMongo } from "@/utils/saveUserToMongo";
import { useEffect } from "react";

export const AppBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      saveUserToMongo(user.name, user.email);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
        <div className="flex h-full items-center">
          <h1 onClick={() => navigate('/')} className="cursor-pointer text-primaryGreen ml-3 font-bold text-xl w-full flex items-center">Sublinks</h1>
          
          <div className="flex h-full ml-10 items-center justify-center">
            {/* <NavBarItem pathname={location.pathname} link="/home" title="Explore" /> */}
            {
              user && (
                <>
                  <NavBarItem pathname={location.pathname} link="/dashboard" title="Dashboard" />
                  <NavBarItem pathname={location.pathname} link="/create" title="Create Blink" />
                  <NavBarItem pathname={location.pathname} link="/account" title="Profile" />
                </>
              )
            }
          </div>
        </div>
        <div className="h-full flex items-center justify-center gap-3">
          <UserButton className="h-10 flex items-center justify-center"/>
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
    <Link to={link} className="h-full flex flex-col  items-center justify-center">
      
      <Button className={`shadow-none rounded-lg bg-white hover:bg-gray-100 font-semibold ${pathname === link ? ' text-black' : 'text-gray-500'}`}>
        {title}
      </Button>
      
      <div className={`h-0.5 ${pathname === link ? 'bg-black' : ''}`}></div>
    </Link>
  )
} 