import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const encodedUserInfo = Cookies.get('userinfo');
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
    if (!encodedUserInfo) return
    const userInfo = JSON.parse(atob(encodedUserInfo))
    if (userInfo) {
      const info = JSON.stringify(userInfo);
      localStorage.setItem('userinfo', info);
      setUserInfo(info);
      Cookies.remove('userinfo', { path: '/' })
    }
  }, [encodedUserInfo]);

  const handleLogout = async () => {
    localStorage.clear();
    Cookies.remove('userinfo', { path: '/' })
    window.location.href = `/auth/logout?session_hint=${Cookies.get('session_hint')}`;
  }

  return (
    <div className="App">
      {
        userInfo ? (
          <div>
            {/* Get user info */}
            <p>Welcome {userInfo.first_name}</p>

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>
          </div> ): (
          <div>
           <h1>Please sign in to continue</h1> 
           {/* Login Button */}
          <button onClick={() => { window.location.href = "/auth/login" }}>Login</button>
          </div>
        )}   
    </div>
  );
}

export default App;
