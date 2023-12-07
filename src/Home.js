import React from 'react';
import { useDescope, useSession, useUser } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import { getSessionToken } from '@descope/react-sdk';

function Home() {
  const { isAuthenticated, isSessionLoading } = useSession()
  const { user, isUserLoading } = useUser()
  const { logout } = useDescope()
  const [accessToken, setAccessToken] = React.useState(null);

  const getAccessToken = async () => {
    const accessToken = await getSessionToken();
    setAccessToken(accessToken);
  }

  return (
    <div>
      {!isAuthenticated &&
        (
          <Descope
            flowId="sign-up-or-in"
            onSuccess={(e) => console.log(e.detail.user)}
            onError={(e) => console.log('Could not log in!')}
          />
        )
      }

      {
        (isSessionLoading || isUserLoading) && <p>Loading...</p>
      }

      {!isUserLoading && isAuthenticated &&
        (
          <>
            {/* Get user info */}
            <h1>Welcome {user.name}</h1>
            
            {/* Get user Access token*/}
            <button onClick={() => getAccessToken()}>Get Access Token</button>
            <pre>{accessToken}</pre>
              
            {/* Logout */}
            <button onClick={() => logout()}>Logout</button>
          </>
        )
      }
    </div>
  );

}

export default Home;
