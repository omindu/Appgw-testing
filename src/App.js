import React from 'react';
import { Routes, Route } from "react-router-dom"
import { RequireSignIn } from "@rownd/react";

import Home from './Home';
import SecretPage from './SecretPage.js';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/secret" element={
        <RequireSignIn>
          <SecretPage />
        </RequireSignIn>
      } />    
    </Routes>
  );
}

export default App;
