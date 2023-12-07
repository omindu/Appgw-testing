import React from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";


function Home() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const [token, setToken] = React.useState(null);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h1>Please sign in to continue</h1>
          {/* Login Button */}
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      ) : (
        <div>
          {/* Get user info */}
          <p>Welcome {user?.name}</p>

          {/* Get user Access token*/}
          <button onClick={() => setToken(user.accessToken)}>Get access token</button>
          <div>
            <pre>{token}</pre>
          </div>
          
          {/* Logout Button */}
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );

}

export default Home;
