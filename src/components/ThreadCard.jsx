import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, User } from 'lucide-react';

const ThreadCard = ({ thread }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {thread.category}
        </span>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
        </span>
      </div>
      
      <Link to={`/thread/${thread._id}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          {thread.title}
        </h3>
      </Link>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {thread.description}
      </p>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <User className="h-4 w-4 mr-1" />
          {thread.author?.name || 'Unknown'}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MessageCircle className="h-4 w-4 mr-1" />
          Discuss
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
