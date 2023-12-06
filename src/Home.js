import React from 'react';
import { useRownd } from "@rownd/react";

function Home() {
  const { is_authenticated, user, requestSignIn, getAccessToken, signOut } = useRownd();
  const [token, setToken] = React.useState(null);

  const getToken = async () => {
    const token = await getAccessToken();
    setToken(token);
  }

  return (
    <div>
      {is_authenticated ? (
        <div>
          <h1>Welcome {user.data.full_name}</h1>
          <button onClick={() => signOut()}>Logout</button>
          <button onClick={getToken}>Get access token</button>
          <div>
            <pre>{token}</pre>
          </div>
        </div>
      ) : (
        <div>
          <h1>Please sign in to continue</h1>
          <button onClick={() => requestSignIn()}>Login</button>
        </div>
      )}
    </div>
  );


}

export default Home;
