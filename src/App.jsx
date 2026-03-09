import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './GlobalLayout';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Assistant from './pages/Assistant';
import Subscription from './pages/Subscription';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import Brand from './pages/Brand';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/editor" element={<Editor />} />
      <Route path="/app" element={<GlobalLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="templates" element={<Templates />} />
        <Route path="brand" element={<Brand />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
}

export default App;
