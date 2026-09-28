import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { User, Calendar, Edit, Trash2, ArrowLeft } from 'lucide-react';

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await axiosInstance.get(`/threads/${id}`);
      setThread(res.data);
    } catch (error) {
      toast.error('Failed to load thread');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/threads/${id}`);
      toast.success('Thread deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete thread');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!thread) return null;

  const isAuthor = user && thread.author && user._id === thread.author._id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Discussions
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {thread.category}
            </span>
            
            {isAuthor && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/edit-thread/${thread._id}`}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Edit Thread"
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Thread"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{thread.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1.5" />
              <span className="font-medium text-gray-900">{thread.author?.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {thread.description}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Thread</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this thread? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;
