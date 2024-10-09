import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useOkto } from "okto-sdk-react";


const API_URL = 'https://sublinks.onrender.com';

export const Account = () => {
    const [userDetails, setUserDetails] = useState();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [subPrice, setSubPrice] = useState()
    const [subscribers, setSubscribers] = useState()

    const [wallets, setWallets] = useState()
    const [portfolioData, setPortfolioData] = useState();
      const [tokensDev, settokensDev] = useState(0)
      const [tokensMain, settokensMain] = useState(0)
    const { getUserDetails, getPortfolio, createWallet, transferTokens, orderHistory } = useOkto();
    const fetchWallets = async () => {
        try {
        const walletsData = await createWallet();
        setWallets(walletsData);
        } catch (error) {
        console.log(`Failed to fetch wallets: ${error.message}`);
        }
    };
    const fetchPortfolio = async () => {
        try {
        const portfolio = await getPortfolio();
        setPortfolioData(portfolio);
        for(let i=0;i<portfolio.tokens.length;i++){
            if(portfolio.tokens[i].token_name=="SOL_DEVNET")
            settokensDev(portfolio.tokens[i].quantity)
        }
        } catch (error) {
        console.log(`Failed to fetch portfolio: ${error.message}`);
        }
    };
    const fetchUserDetails = async () => {
        try {
        const details = await getUserDetails();
        setUserDetails(details);
        } catch (error) {
            console.log(`Failed to fetch user details: ${error.message}`);
        }
    };
   
    useEffect(()=>{
        fetchUserDetails()
        fetchWallets()
        fetchPortfolio()
        axios.get("https://sublinks.onrender.com/creator/email/harshit.rai.verma@gmail.com").then((data)=>{
          setName(data.data.name)
          setEmail(data.data.email)
          setWalletAddress(data.data.walletAddress)
          setSubPrice(data.data.subscriptionPrice)
          setSubscribers(data.data.subscribers.length)
        })  
    },[])
    
    const [inputDev, setInputDev] = useState()
    const [quantityDev, setQuantityDev] = useState()
    
    
    const [inputMain, setInputMain] = useState()
    
    const [quantityMain, setQuantityMain] = useState()

    

  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar/>
      </div>
      {userDetails==null?
      <div className="w-[900px] h-60 bg-white  mt-12 flex items-center justify-center">
        <div>Not Logged in</div>
      </div>:
      <div className="w-full h-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
        <div className="w-full  bg-white rounded-lg  flex">
            <div className="w-1/2 text-lg flex flex-col p-4 px-9 ">
                <div className="text-xl self-center  mb-6">
                    User Details:
                </div>
                <div className="flex flex-col gap-4">
                    <div>Name: {name}</div>
                    <div>Email: {email}</div>
                    <div>Wallet: {walletAddress.slice(0, 23)} . . .</div>
                    <div>Price: ${subPrice}</div>
                    <div>Subscribers: {subscribers}</div>
                </div>
            </div>
            <div className="w-1/2 text-lg  flex flex-col gap-5 items-left p-4 px-9 border-l-2 border-gray-50">
                <div className="text-xl self-center mb-4">
                    Accounts:
                </div>
                <div>
                    <div className="flex justify-between">
                    <span>SOLANA DEV NET</span>
                    <span>
                    {tokensMain} SOL
                        </span>
                    </div>
                    <input className="border w-full my-2 px-2 py-1 rounded-lg" type="text" placeholder="Enter Address to Send Tokens to..." value={inputMain}  onChange={(e)=>{setInputMain(e.target.value)}}></input>
                    <div className="flex justify-between">
                    <input className="border w-1/2 my-2 px-2 py-1 rounded-lg" type="number" min={0} max={tokensMain} placeholder="Enter Quantity..." value={quantityMain}  onChange={(e)=>{setQuantityMain(e.target.value)}}></input>
                    <button className="bg-black px-5 rounded-lg text-white h-10 mt-2" onClick={()=>{
                        transferTokens({
                            network_name:"SOLANA_DEVNET",
                            token_address:"",
                            recipient_address:inputDev,
                            quantity:quantityDev
                        })
                    }}>Send</button>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                    <span>SOLANA MAIN NET</span>
                    <span>
                    {tokensMain} SOL
                        </span>
                    </div>
                    <input className="border w-full my-2 px-2 py-1 rounded-lg" type="text" placeholder="Enter Address to Send Tokens to..." value={inputDev}  onChange={(e)=>{setInputDev(e.target.value)}}></input>
                    <div className="flex justify-between">
                    <input className="border w-1/2 my-2 px-2 py-1 rounded-lg" type="number" min={0} max={tokensDev} placeholder="Enter Quantity..." value={quantityDev}  onChange={(e)=>{setQuantityDev(e.target.value)}}></input>
                    <button className="bg-black px-5 rounded-lg text-white h-10 mt-2">Send</button>
                    </div>
                </div>
            </div>
            </div>
        <div>
        </div>
     
    </div>
}
    </div>
  );
}
