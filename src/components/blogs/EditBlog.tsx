import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../../services/BlogService';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const blog = await blogService.getBlogById(id);
          setTitle(blog.title);
          setContent(blog.content);
          if (blog.image_file) {
            const imageUrl = await blogService.getFileURL(blog.image_file);
            setCurrentImageUrl(imageUrl);
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
          alert('Failed to fetch blog');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    setUpdating(true);
    try {
      await blogService.customizeBlog(id, { title, content, imageFile: image });
      alert('Blog updated successfully!');
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-inconsolata ">
      <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8 text-center">Edit Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400
                transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400
                transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
              {currentImageUrl && (
                <img src={currentImageUrl} alt="Current blog image" className="mb-4 max-w-full sm:max-w-xs rounded-lg shadow-md" />
              )}
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-200 file:text-gray-700
                dark:file:bg-gray-700 dark:file:text-gray-300
                hover:file:bg-gray-300 dark:hover:file:bg-gray-600
                transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;