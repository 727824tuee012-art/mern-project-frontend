import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreadDetail from './pages/ThreadDetail';
import CreateThread from './pages/CreateThread';
import EditThread from './pages/EditThread';
import MyThreads from './pages/MyThreads';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thread/:id" element={<ThreadDetail />} />
          
          <Route path="/create-thread" element={
            <PrivateRoute>
              <CreateThread />
            </PrivateRoute>
          } />
          <Route path="/edit-thread/:id" element={
            <PrivateRoute>
              <EditThread />
            </PrivateRoute>
          } />
          <Route path="/my-threads" element={
            <PrivateRoute>
              <MyThreads />
            </PrivateRoute>
          } />
          
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="text-blue-600 hover:underline">Go back home</a>
            </div>
          } />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
