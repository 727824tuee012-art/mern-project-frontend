import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const categories = ['Technology', 'Science', 'Entertainment', 'Sports', 'Other'];

const CreateThread = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, description, category } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post('/threads', formData);
      toast.success('Thread created successfully!');
      navigate(`/thread/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create thread');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a New Thread</h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={onChange}
              className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="What do you want to discuss?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={category}
              onChange={onChange}
              className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows="6"
              value={description}
              onChange={onChange}
              className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide more details about your topic..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
