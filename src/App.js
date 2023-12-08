import React from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
  useUser
} from "@clerk/clerk-react";

function App() {
  const { user } = useUser();
  const {getToken} = useAuth();
  const [token, setToken] = React.useState(null);

  const getAccessToken = async () => {
    const token = await getToken();
    setToken(token);
  }

  return (
    <div className='App'>
        <SignedIn>
          {/* Get user info */}
          <p>Welcome {user?.username}</p>

          {/* Get user Access token*/}
          <button onClick={getAccessToken}>Get access token</button>
          <div>
            <pre>{token}</pre>
          </div>

          {/* Logout Button */}
          <SignOutButton>
            <button>Logout</button>
           </SignOutButton> 
        </SignedIn>

        <SignedOut>
          <div>
            <h1>Please sign in to continue</h1>
            
            {/* Login Button */}
            <SignInButton>
              <button>Login</button>
            </SignInButton>
          </div>
        </SignedOut>
    </div>
  );
}

export default App;