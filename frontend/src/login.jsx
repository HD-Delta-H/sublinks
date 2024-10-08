import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
 
function LoginPage() {
 
  console.log("LoginPage component rendered");
  const navigate = useNavigate();
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState();

  const BASE_URL = "https://sandbox-api.okto.tech";
  const OKTO_CLIENT_API = import.meta.env.VITE_OKTO_CLIENT_API_KEY;
 
   const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
      "x-api-key": OKTO_CLIENT_API,
      "Content-Type": "application/json",
    },
  });
 
  const setPin = (idToken, token, reloginPin) => {
    return apiService.post("/api/v1/set_pin", {
      id_token: idToken,
      token: token,
      relogin_pin: reloginPin,
      purpose: "set_pin",
    });
  };
   const authenticateUser = (idToken) => {
    return apiService.post("/api/v1/authenticate", { id_token: idToken });
  };


  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;

    console.log("google idtoken: ", idToken);
    authenticateUser(idToken)
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("auth token received", authToken);
        navigate("/home");
        setAuthToken(authResponse.auth_token);
      }
      if (error) {
        console.error("Auth error:", error);
      }
    });
  };
 

  return (
    <div style={containerStyle}>
      <h1>Login</h1>
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => {
            console.log("Login Failed", error);
          }}
          promptMomentNotification={(notification) =>
            console.log("Prompt moment notification:", notification)
          }
        />
      ) : (
        <> Authenticated </>
      )}
    </div>
  );
}
export default LoginPage;
 