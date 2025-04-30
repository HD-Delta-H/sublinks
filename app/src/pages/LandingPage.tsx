import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Sample product data - replace with actual images or import real assets
const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://picsum.photos/200?1",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://picsum.photos/200?2",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://picsum.photos/200?3",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://picsum.photos/200?4",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://picsum.photos/200?5",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://picsum.photos/200?6",
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
];

const webContent = {
  'heading': 'Turn Your Twitter Followers into a Reliable Income Stream',
  'subheading': 'Get paid to share your knowledge with your followers',
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

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
      // Simplified auth without Okto
      const randomWalletAddress = `0x${Math.random().toString(16).slice(2, 10)}`;
      localStorage.setItem('walletAddress', randomWalletAddress);
      setWalletAddress(randomWalletAddress);
      
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className="w-full h-full bg-[#0F1017] pb-10 flex flex-col items-center text-white">
        <div className='h-20 text-white flex justify-between w-full items-center px-4 sm:px-10'>
          <h3 className='text-xl font-bold'>Sublinks</h3>
          {walletAddress == null 
            ? <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            : <Button 
                onClick={() => navigate("/")}
                variant={'outline'} size={'appBar'} className="px-4 py-1 bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                Dashboard
              </Button>
          }
        </div>
        <div className='flex flex-col gap-8 max-w-[900px] mt-10 px-4'>
          <h1 className="text-4xl sm:text-7xl font-black leading-none gap-y-10">
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

            {walletAddress == null 
              ? <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              : <Button 
                  onClick={() => navigate("/")} 
                  className="bg-[#161B22] h-14 hidden sm:flex hover:bg-[#161B22]/90 text-md font-normal px-4">
                  Dashboard
                </Button>
            }
          </div>
        </div>
      </div>

      <div className='bg-[#161B22] flex flex-col py-6 px-4 sm:p-10 sm:px-40 gap-3 text-white'>
        <img src="https://picsum.photos/1200/600" alt="Hero" className='rounded-3xl'/>
      </div>

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
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border shadow-none flex flex-col">
              <CardHeader className="text-black">
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 font-light">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#161B22] py-12 px-4 sm:px-32 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center sm:text-left">Featured Examples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product, index) => (
              <a href={product.link} key={index} className="group block">
                <div className="bg-[#1F2937] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400">{product.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-20 px-4 sm:px-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-10">Join thousands of creators already using Sublinks to monetize their content</p>
          {walletAddress == null 
            ? <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            : <Button 
                onClick={() => navigate("/")}
                className="bg-black text-white px-8 py-6 text-lg rounded-md hover:bg-gray-800">
                Go to Dashboard
              </Button>
          }
        </div>
      </div>

      <footer className="bg-[#0F1017] text-white py-10 px-4 sm:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sublinks</h3>
            <p className="text-gray-400">Monetize your Twitter content without switching platforms.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Use Cases</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Documentation</li>
              <li>Tutorials</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 Sublinks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 