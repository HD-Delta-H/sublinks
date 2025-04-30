import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BiRefresh } from "react-icons/bi";
import { API_URL } from "@/App";
import { useUser } from "@civic/auth-web3/react";
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  walletAddress: string;
  subscriptionPrice: number;
  subscribers: string[];
}

export const Account = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [subPrice, setSubPrice] = useState<string>("");
  const [subscribers, setSubscribers] = useState<number>(0);
  const [tokensDev, setTokensDev] = useState<number>(0);
  const [tokensMain, setTokensMain] = useState<number>(0);
  
  const [inputDev, setInputDev] = useState<string>("");
  const [quantityDev, setQuantityDev] = useState<string>("");
  const [inputMain, setInputMain] = useState<string>("");
  const [quantityMain, setQuantityMain] = useState<string>("");

  useEffect(() => {
    // Get stored wallet and tokens from localStorage
    const storedWalletAddress = localStorage.getItem('walletAddress');
    const storedDevTokens = localStorage.getItem('devTokens');
    const storedMainTokens = localStorage.getItem('mainTokens');
    const storedEmail = localStorage.getItem('email');

    if (storedDevTokens) setTokensDev(Number(storedDevTokens));
    if (storedMainTokens) setTokensMain(Number(storedMainTokens));

    // Generate some mock tokens if none exist
    if (!storedDevTokens) {
      const mockDevTokens = (Math.random() * 10).toFixed(2);
      localStorage.setItem('devTokens', mockDevTokens);
      setTokensDev(Number(mockDevTokens));
    }

    if (!storedMainTokens) {
      const mockMainTokens = (Math.random() * 2).toFixed(2);
      localStorage.setItem('mainTokens', mockMainTokens);
      setTokensMain(Number(mockMainTokens));
    }

    // Set a mock email if none exists
    if (!storedEmail && storedWalletAddress) {
      const mockEmail = `user_${storedWalletAddress.slice(2, 8)}@example.com`;
      localStorage.setItem('email', mockEmail);
    }

    // Fetch user details from API or create a new user
    const fetchOrCreateUser = async () => {
      try {
        if (storedEmail) {
          const response = await axios.get(`${API_URL}/creator/email/${storedEmail}`);
          const userData = response.data;
          localStorage.setItem('id', userData._id);
          setUserDetails(userData);
          setName(userData.name);
          setEmail(userData.email);
          setWalletAddress(userData.walletAddress);
          setSubPrice(String(userData.subscriptionPrice));
          setSubscribers(userData.subscribers.length);
        }
      } catch (error) {
        console.log("Creating new user");
        if (storedEmail && storedWalletAddress) {
          try {
            await axios.post(`${API_URL}/creator/create`, {
              "name": storedEmail.split("@")[0],
              "email": storedEmail,
              "walletAddress": storedWalletAddress
            });
            
            const response = await axios.get(`${API_URL}/creator/email/${storedEmail}`);
            const userData = response.data;
            localStorage.setItem('id', userData._id);
            setUserDetails(userData);
            setName(userData.name);
            setEmail(userData.email);
            setWalletAddress(userData.walletAddress);
            setSubPrice(String(userData.subscriptionPrice));
            setSubscribers(userData.subscribers.length);
          } catch (createError) {
            console.error("Failed to create user:", createError);
          }
        }
      }
    };

    fetchOrCreateUser();
  }, []);

  const handleUpdateDetails = async () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        await axios.put(`${API_URL}/creator/${userId}`, {
          name: name,
          subscriptionPrice: subPrice,
        });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const refreshBalance = () => {
    // In a real app, this would fetch the latest balance from the blockchain
    // For now, we'll simulate it with random values
    const newDevTokens = (Math.random() * 10).toFixed(2);
    const newMainTokens = (Math.random() * 2).toFixed(2);
    
    localStorage.setItem('devTokens', newDevTokens);
    localStorage.setItem('mainTokens', newMainTokens);
    
    setTokensDev(Number(newDevTokens));
    setTokensMain(Number(newMainTokens));
    
    alert("Balance refreshed!");
  };

  const handleTokenTransfer = (network: 'mainnet' | 'devnet') => {
    // In a real app, this would perform a blockchain transaction
    const address = network === 'mainnet' ? inputMain : inputDev;
    const quantity = network === 'mainnet' ? Number(quantityMain) : Number(quantityDev);
    const currentBalance = network === 'mainnet' ? tokensMain : tokensDev;
    
    if (!address) {
      alert("Please enter a valid address!");
      return;
    }
    
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity!");
      return;
    }
    
    if (quantity > currentBalance) {
      alert("Insufficient balance!");
      return;
    }
    
    // Simulate transfer by reducing balance
    if (network === 'mainnet') {
      const newBalance = tokensMain - quantity;
      setTokensMain(newBalance);
      localStorage.setItem('mainTokens', String(newBalance));
      setInputMain("");
      setQuantityMain("");
    } else {
      const newBalance = tokensDev - quantity;
      setTokensDev(newBalance);
      localStorage.setItem('devTokens', String(newBalance));
      setInputDev("");
      setQuantityDev("");
    }
    
    alert(`Successfully transferred ${quantity} SOL to ${address}`);
  };

  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50 w-full">
      <div className="w-full">
        <AppBar/>
      </div>
    
      {!user ? (
        <Card className="mt-12 px-32 py-12">
          Loading...
        </Card>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <Card>
              <CardContent>
                <div className="space-y-4 flex mt-8 gap-10 items-center justify-center">
                  <img src={user?.picture} alt="Profile" className="mt-3 w-32 h-32 rounded-full" />
                  <div className="flex flex-col gap-4 w-full">
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="name">Name</label>
                      <Input
                        id="name"
                        value={user?.name}
                        disabled
                        className="text-black"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="email">Email</label>
                      <Input id="email" value={user?.email} disabled />
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Manage your SOL on Mainnet and Devnet</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mainnet">
                  <TabsList className="w-min">
                    <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
                    <TabsTrigger value="devnet">Devnet</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mainnet">
                    <div className="flex flex-col gap-5 mt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="balance" className="text-sm font-medium text-gray-500">Balance</label>
                          <div className="text-3xl font-bold">{tokensMain} SOL</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          aria-label="Refresh balance"
                          onClick={refreshBalance}
                        >
                          <BiRefresh className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="transfer" className="text-md font-medium text-gray-500">Transfer</label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Enter Address to Send Tokens to..."
                            value={inputMain}
                            onChange={(e) => setInputMain(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Enter Quantity..."
                              value={quantityMain}
                              onChange={(e) => setQuantityMain(e.target.value)}
                              min="0"
                              max={tokensMain.toString()}
                            />
                            <Button onClick={() => handleTokenTransfer('mainnet')}>Send</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="devnet">
                    <div className="flex flex-col gap-5 mt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="balance" className="text-sm font-medium text-gray-500">Balance</label>
                          <div className="text-3xl font-bold">{tokensDev} SOL</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          aria-label="Refresh balance"
                          onClick={refreshBalance}
                        >
                          <BiRefresh className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="transfer" className="text-md font-medium text-gray-500">Transfer</label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Enter Address to Send Tokens to..."
                            value={inputDev}
                            onChange={(e) => setInputDev(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Enter Quantity..."
                              value={quantityDev}
                              onChange={(e) => setQuantityDev(e.target.value)}
                              min="0"
                              max={tokensDev.toString()}
                            />
                            <Button onClick={() => handleTokenTransfer('devnet')}>Send</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}; 