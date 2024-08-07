const conf = {
  apiEndpoint: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_DATABASE_ID),
  blogsCollectionId: String(import.meta.env.VITE_BLOGS_COLLECTION_ID),
  projectsCollectionId: String(import.meta.env.VITE_PROJECTS_COLLECTION_ID),
  blogsBucketId: String(import.meta.env.VITE_BLOGS_BUCKET_ID),
  projectsBucketId: String(import.meta.env.VITE_PROJECTS_BUCKET_ID),
  contactBackendUrl: String(import.meta.env.VITE_CONTACT_BACKEND_URL),
  emailJsServiceId: String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
  emailJsTemplateId: String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
  emailJsPublicKey: String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
};

export default conf;
