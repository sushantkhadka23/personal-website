import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../../services/BlogService';
import CircularProgress from '@mui/material/CircularProgress';

interface Blog {
  id: string;
  title: string;
  image_file: string;
  content: string;
  date_of_added: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        console.error('Blog ID is missing');
        setLoading(false);
        return;
      }

      try {
        const blogData = await blogService.getBlogById(id);

        // If image_file is not a direct URL, get the URL
        const imageUrl = blogData.image_file ? await blogService.getFileURL(blogData.image_file) : '';
        
        setBlog({ ...blogData, image_file: imageUrl });
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <CircularProgress style={{ color: 'gray' }} />
      </div>
    );
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {blog.image_file && (
            <img
              src={blog.image_file}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">
              {blog.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {new Date(blog.date_of_added).toLocaleDateString()} 
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {blog.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
