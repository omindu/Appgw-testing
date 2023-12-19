import React, { useEffect, useState, useCallback } from 'react';
import { StytchLogin, useStytchUser, useStytch } from "@stytch/react";
import { Products } from "@stytch/vanilla-js";

function Home() {
  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: process.env.REACT_APP_STYTCH_LOGIN_REDIRECT_URL,
      loginExpirationMinutes: 60,
      signupRedirectURL: process.env.REACT_APP_STYTCH_SIGNUP_REDIRECT_URL,
      signupExpirationMinutes: 60,
    }
  };
  const stytch = useStytch();
  const { user } = useStytchUser();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Validate code
    if (stytch && !user) {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      const tokenType = queryParams.get("stytch_token_type");

      // If a token is found, authenticate it with the appropriate method
      if (token && tokenType) {
        if (tokenType === "magic_links") {
          stytch.magicLinks.authenticate(token, {
            session_duration_minutes: 60,
          });
        } else if (tokenType === "oauth") {
          stytch.oauth.authenticate(token, {
            session_duration_minutes: 60,
          });
        }
      }
    }
  }, [stytch, user]);

  const getAccessToken = async () => {
    const sessionCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("stytch_session_jwt"));
    setAccessToken(sessionCookie.split("=")[1]);
  }

  const logout = useCallback(() => {
    stytch.session.revoke();
  }, [stytch]);

  return (
    <div>
      {
        user ? 
          <div>
            {/* Get user info */}
            <h1>Welcome {user.name.first_name}</h1>

            {/* Get user Access token*/}
            <button onClick={getAccessToken}>Get access token</button>
            <div>
              <pre>{accessToken}</pre>
            </div>

            {/* Logout Button */}
            <button onClick={() => logout()}>Logout</button>
          </div> :

          <div>
          {/* Login Page */}
            <StytchLogin config={config} />
          </div>
      }
    </div>
  );
}

export default Home;