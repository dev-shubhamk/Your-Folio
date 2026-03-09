import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './GlobalLayout';
import Editor from './pages/Editor';
import Assistant from './pages/Assistant';
import Subscription from './pages/Subscription';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/app" element={<GlobalLayout />}>
        <Route index element={<Editor />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
}

export default App;
