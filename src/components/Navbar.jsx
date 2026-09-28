import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MessageSquare, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 font-bold text-xl gap-2">
              <MessageSquare className="h-6 w-6" />
              ThreadSpace
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/create-thread" className="text-gray-600 hover:text-blue-600 font-medium hidden sm:block">
                  Create Thread
                </Link>
                <Link to="/my-threads" className="text-gray-600 hover:text-blue-600 font-medium hidden sm:block">
                  My Threads
                </Link>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
