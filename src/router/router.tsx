import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Login from "../auth/Login";
import Blogs from "../pages/Blogs";
import UserPage from "../auth/UserPage";
import BlogDetail from "../components/blogs/BlogDetails";
import AddBlog from "../components/blogs/AddBlog";
import EditBlog from "../components/blogs/EditBlog";
import AddProject from "../components/projects/AddProject";
import EditProject from "../components/projects/EditProject";
import ProjectDetail from "../components/projects/ProjectDetails";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/blogs" element={<Blogs />} />

          <Route path="/blog/:id" element={<BlogDetail />} />

          <Route path="/create-blog" element={<AddBlog />} />

          <Route path="/edit-blog/:id" element={<EditBlog />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/edit-project/:id" element={<EditProject />} />

          <Route path="/project/:id" element={<ProjectDetail />} />

          <Route path="/create-project" element={<AddProject />} />


          <Route path="/login" element={<Login />} />

          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
