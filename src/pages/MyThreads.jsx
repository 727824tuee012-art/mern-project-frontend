import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import ThreadCard from '../components/ThreadCard';
import { Link } from 'react-router-dom';

const MyThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyThreads = async () => {
      try {
        const res = await axiosInstance.get('/threads');
        // Filter threads created by current user
        // Note: For a real app with many users, it's better to have a dedicated endpoint like GET /users/me/threads
        const userThreads = res.data.filter(thread => thread.author?._id === user?._id);
        setThreads(userThreads);
      } catch (error) {
        console.error('Error fetching my threads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyThreads();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Threads</h1>
        <Link 
          to="/create-thread" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Create New Thread
        </Link>
      </div>

      {threads.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-medium text-gray-900 mb-2">You haven't created any threads yet</h3>
          <p className="text-gray-500 mb-6">Start a new discussion and share your thoughts.</p>
          <Link 
            to="/create-thread" 
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Create your first thread &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threads.map((thread) => (
            <ThreadCard key={thread._id} thread={thread} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyThreads;
