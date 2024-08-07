import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../../services/ProjectService';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<{
    title: string;
    description: string;
    link: string;
    image_file?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const fetchedProject = await projectService.getProjectById(id);
          if (fetchedProject.image_file) {
            const imageUrl = await projectService.getFileURL(fetchedProject.image_file);
            setProject({ ...fetchedProject, image_file: imageUrl });
          } else {
            setProject(fetchedProject);
          }
        } catch (error) {
          console.error('Error fetching project:', error);
          alert('Failed to fetch project details');
          navigate('/');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-inconsolata">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8 text-center">
            {project.title}
          </h2>
          {project.image_file && (
            <img src={project.image_file} alt={project.title} className="mb-6 w-full rounded-lg shadow-md" />
          )}
          <p className="text-gray-800 dark:text-gray-200 mb-6">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
