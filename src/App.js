import React from 'react';
import { Routes, Route } from "react-router-dom"
import { AuthorizedContent } from "@frontegg/react";
import Home from './Home';
import SecretPage from './SecretPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* AuthorizedContent will only show the SecretPage component if the user has the required role 
      (can integrate permissions too).
      Otherwise it's null and won't show anything. */}
      <Route path="/secret" element={
        <AuthorizedContent requiredRoles={["CHOREO_USER"]}>
          <SecretPage />
        </AuthorizedContent>
      } />

      {/* Handle not authenticated scenario and show the login page */}
      {/* User has to implement this logic to show the login page */}
      <Route path="/supersecret" element={
        <AuthorizedContent
          requiredRoles={["CHOREO_USER"]}
          render={(loggedIn) => loggedIn ? <SecretPage /> : <Home />}
        />
      } />      
    </Routes>
  );
}

export default App;
