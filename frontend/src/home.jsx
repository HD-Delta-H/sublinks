import LoginPage from "./login";


import { useOkto } from "okto-sdk-react";
import  { useState } from 'react';
 
function Home() {
    
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { getUserDetails, getPortfolio, createWallet, transferTokens, orderHistory } = useOkto();
 
  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
    } catch (error) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };
 
  return (
    <div >
        <LoginPage/>
      <h1>Home Page</h1>
      <button onClick={fetchUserDetails}>View User Details</button>
      {userDetails && (
        <div>
          <h2>User Details:</h2>
          <pre>{JSON.stringify(userDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
export default Home;