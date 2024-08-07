import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import projectService from "../services/ProjectService";
import { useUser } from "../contexts/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image_file?: string;
}

const Projects: React.FC = () => {
  const {
    state: { isLoggedIn },
  } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await projectService.getProjects();
        const projectsWithImageUrls = await Promise.all(
          projectData.map(async (project: Project) => {
            const imageUrl = project.image_file
              ? await projectService.getFileURL(project.image_file)
              : "";
            return {
              ...project,
              image_file: imageUrl,
            };
          })
        );
        setProjects(projectsWithImageUrls);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter((project) => project.id !== id));
        alert("Project deleted successfully!");
      } catch (error) {
        alert("Failed to delete project");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <CircularProgress style={{ color: "gray" }} />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 font-mono">
        {isLoggedIn && (
          <button
            onClick={() => navigate("/create-project")}
            className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Add Project
          </button>
        )}
        {!isLoggedIn && (
          <>
            <svg
              className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              No projects found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check back later for new content!
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 font-inconsolata">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Projects
          </h1>
          {isLoggedIn && (
            <button
              onClick={() => navigate("/create-project")}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Add Project
            </button>
          )}
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {project.image_file && (
                <img
                  src={project.image_file}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <NavLink
                    to={`/project/${project.id}`}
                    className="inline-block bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300"
                  >
                    View More
                  </NavLink>

                  {isLoggedIn && (
                    <div className="flex space-x-2">
                      <NavLink
                        to={`/edit-project/${project.id}`}
                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
