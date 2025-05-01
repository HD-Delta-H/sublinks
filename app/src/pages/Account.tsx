import { AppBar } from "@/components/AppBar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@civic/auth-web3/react";
import { API_URL } from "@/App";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
export const Account = () => {
  const { user } = useUser();
  const { publicKey } = useWallet();
  const [ walletAddress, setWalletAddress] = useState<string | null>(null);

  const getUserDataFromMongo = async () => {
    console.log(user?.email);
    const response = await fetch(`${API_URL}/creator/email/${user?.email}`);
    const data = await response.json();
    console.log(data);
    setWalletAddress(data.walletAddress);
    return data;
  }

  const updateWalletAddress = async () => {
    console.log(user?.email);
    const userData = await fetch(`${API_URL}/creator/email/${user?.email}`);
    const data2 = await userData.json();
    const userId = data2._id;
    
    const response = await axios.put(`${API_URL}/creator/${userId}`, {
      walletAddress: publicKey?.toString()
    });
    const data = await response.data;
    console.log(data);
    setWalletAddress(data.walletAddress);
    return data;
  }

  useEffect(() => {
    if (user) {
      getUserDataFromMongo();
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      updateWalletAddress();
    }
  }, [publicKey]);

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
              <CardContent>
                {
                  walletAddress ?  (
                    <div className="flex flex-col gap-4">
                      <div className="space-y-4 flex mt-8 gap-10 items-center justify-center">
                        <label className="text-sm text-gray-500">Wallet Address</label>
                        <Input value={walletAddress} disabled />
                      </div>
                      <WalletMultiButton/>  
                    </div>
                  ) : (
                    <div className="flex pt-6 justify-center items-center">
                      <WalletMultiButton/>  
                    </div>
                  )
                }
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}; 