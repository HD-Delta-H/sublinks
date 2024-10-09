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
    const [userDetails, setUserDetails] = useState(null);
    const [wallets, setWallets] = useState(null)
    const [history, setHistory] = useState(null)
    const [portfolioData, setPortfolioData] = useState(null);
    const { getUserDetails, getPortfolio, createWallet, transferTokens, orderHistory } = useOkto();
    const fetchWallets = async () => {
        try {
        const walletsData = await createWallet();
        console.log(walletsData)
        setWallets(walletsData);
        } catch (error) {
        console.log(`Failed to fetch wallets: ${error.message}`);
        }
    };
    const fetchPortfolio = async () => {
        try {
        const portfolio = await getPortfolio();
        setPortfolioData(portfolio);
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
    const fetchHistory = async () => {
        try {
        const details = await getUserDetails();
        orderHistory().then((e)=>{
            setHistory(e)
        })
        setUserDetails(details);
        } catch (error) {
            console.log(`Failed to fetch user details: ${error.message}`);
        }
    };
    useEffect(()=>{
        fetchUserDetails()
    })
    
  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar/>
      </div>

      <div className="w-full h-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
      {userDetails && (
          <div>
            <h2>User Details:</h2>
            <pre>{JSON.stringify(userDetails, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchWallets}>View Wallets</button>
        {userDetails && (
          <div>
            <h2>User Wallets:</h2>
            <pre>{JSON.stringify(wallets, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchPortfolio}>View Portfolio</button>
        {userDetails && (
          <div>
            <h2>Portfolio:</h2>
            <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchHistory}>View History</button>
        {userDetails && (
          <div>
            <h2>History:</h2>
            <pre>{JSON.stringify(history, null, 2)}</pre>
          </div>
        )}
    
    </div>
    </div>
  );
}
