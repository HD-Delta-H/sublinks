import Anakin from '../assets/anakin.png';
import Crate from '../assets/crate.png';
import Friends from '../assets/friends.png';
import Avengers from '../assets/avengers.png';
import Narnia from '../assets/narnia.png';
import Space from '../assets/space.png';
import Hero from '../assets/hero.png';
import Tata from '../assets/Tata.png';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: Anakin,
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: Crate,
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: Friends,
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: Avengers,
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:  Narnia,
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: Space,
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: Tata,
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:  Anakin,
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:  Crate,
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:  Friends,
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:  Avengers,
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:  Narnia,
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:  Space,
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:  Tata,
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:  Anakin,
  },
];

const features = [
  {
    title: "Easy Setup & Integration",
    description: "Designed to be user-friendly, even for creators new to Web3. Monetize your audience without the hassle.",
  },
  {
      title: "Enhanced User Experience",
      description: "An intuitive UI optimized for creators and their followers, ensuring seamless interaction.",
  },
  {
      title: "Secure Token Withdrawals",
      description: "Creators can withdraw earnings to personal wallets or convert them to fiat currency with secure token transfers.",
  },
  {
      title: "We <3 community",
      description: "We aim to deliver the best product for our community and are open to your suggestions.",
  }
]

const webContent = {
  'heading': 'Turn Your Twitter Followers into a Reliable Income Stream',
  'subheading': 'Get paid to share your knowledge with your followers',
}

const LandingPage = () => {
  const { authenticate,authenticateWithUserId,getWallets } = useOkto();
  const navigate = useNavigate();
  const [ walletAddress, setWalletAddress ] = useState();
  const { getUserDetails,createWallet } = useOkto();
  //const [authToken, setAuthToken] = useState();
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
        //setAuthToken(authResponse.auth_token);
        if (authResponse.action === "signup") {
          console.log("User Signup");
        }
        console.log("auth token received", authToken);
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
    navigate("/")
  };

  return (
    <div className='flex flex-col w-full'>

      <div className="w-full h-full bg-[#0F1017] pb-10 flex flex-col items-center text-white">
        <div className='h-20 text-white flex justify-between w-full items-center px-4 sm:px-10'>
          <h3 className='text-xl font-bold'>Sublinks</h3>
          {/* <Button className="bg-[#161B22] py-2 hover:bg-[#161B22]/90 text-sm font-normal px-4">
            See Examples
          </Button> */}
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
                onClick={()=>{navigate("/")}}
                variant={'outline'} size={'appBar'} className="px-4 py-1 bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                Dashboard
                </Button>
              }
        </div>
        <div className='flex flex-col gap-8 max-w-[900px] mt-10 px-4'>
          <h1 className="text-4xl sm:text-7xl font-black  leading-none gap-y-10 ">
            Monetize Your Content Seamlessly
          </h1>
          
          <h3 className='text-gray-500 text-xl sm:text-2xl'>
            Helping creators on Twitter earn from their content without switching platforms.
          </h3>


          <div className='flex gap-2 items-center'>
            <Button className="bg-[#161B22] h-14 hidden sm:flex hover:bg-[#161B22]/90 text-md font-normal px-4">
              See how it works
            </Button>

            <p className='text-gray-400 hidden sm:flex'>or</p>

            {/* <Button className="bg-white h-12 sm:h-14 font-bold text-black hover:bg-white/70 text-lg px-10" >
              Get Started
            </Button> */}
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
                onClick={()=>{navigate("/")}}
                variant={'outline'} size={'appBar'} className="px-4 py-1 bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                Dashboard
                </Button>
              }
            
          </div>
        </div>

      </div>

      <div className='bg-[#161B22] flex flex-col py-6 px-4 sm:p-10 sm:px-40 gap-3 text-white'>
        <img src={Hero} alt="" className='rounded-3xl'/>
      </div>

      {/* <div className='bg-white min-h-[300px] flex flex-col py-10 text-white px-20 gap-5'>
        <h1 className='text-3xl font-black text-gray-900'>GitHub CLI brings GitHub to your terminal</h1>
        
      </div> */}
        <div className="flex flex-col gap-6 sm:gap-12 bg-white px-4 py-10 sm:px-32 sm:py-16">
          <div className='flex flex-col gap-5'>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
              Turn Tweets into Earnings. Fast. Secure. Easy.
            </h1>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-400">
              No Need To Switch Platform
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center md:text-left">
            {
              features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-bold text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-600 font-semibold text-sm'>{feature.description}</p>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>

      <div className="bg-[url('/pattern.svg')] w-full p-10 md:p-20 md:px-40 flex justify-center">
        <div className="bg-white border border-gray-200 p-10 rounded-lg  mx-auto shadow-md">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Try Sublinks for free</h2>
          <p className="text-gray-600 mb-6">
            Turn Your Twitter Followers into a Reliable Income Stream
          </p>
          <div className="flex justify-center items-center gap-4 mb-2">
            {/* <div className="bg-gray-100 text-gray-800 font-mono text-sm px-4 py-2 rounded">
              brew install gh
            </div>

            <p className='text-gray-400'>or</p>  */}

            <button className="bg-gray-900 text-white px-8 py-2 rounded font-medium hover:bg-gray-800">
              Get Started
            </button>
          </div>
          {/* <a href="#" className="text-blue-600 hover:underline text-sm">
            View installation instructions →
          </a> */}
        </div>
      </div>

      <div className='h-64 w-full bg-gray-50'></div>
    </div>
  )
}

export default LandingPage;