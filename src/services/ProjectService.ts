import { Client, ID, Databases, Models, Storage } from "appwrite";
import conf from "../config/Conf";

class ProjectService {
  client: Client;
  databases: Databases;
  storage: Storage;
  databaseId: string;
  projectCollectionId: string;
  projectBucketId: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.apiEndpoint)
      .setProject(conf.projectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.databaseId = conf.databaseId;
    this.projectCollectionId = conf.projectsCollectionId;
    this.projectBucketId = conf.projectsBucketId;
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const response = await this.storage.createFile(
        this.projectBucketId,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      throw error;
    }
  }

  async getFileURL(fileId: string): Promise<string> {
    try {
      const url = this.storage.getFileView(this.projectBucketId, fileId);
      return url.toString();
    } catch (error) {
      throw error;
    }
  }

  async addProject(
    title: string,
    description: string,
    link: string,
    imageFile?: File
  ) {
    let image_file: string | undefined;

    if (imageFile) {
      const imageFileId = await this.uploadImage(imageFile);
      image_file = imageFileId;
    }

    const data = { title, description, link, image_file };
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.projectCollectionId,
        ID.unique(),
        data
      );
      if (response) {
        return response;
      } else {
        throw new Error("Project creation failed");
      }
    } catch (error) {
      throw error;
    }
  }

  async getProjects() {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.projectCollectionId
      );
      return response.documents.map((doc: Models.Document) => ({
        id: doc.$id,
        title: doc.title || "",
        description: doc.description || "",
        link: doc.link || "",
        image_file: doc.image_file || "",
      }));
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(blogId: string) {
    try {
      const response = await this.databases.getDocument(
        this.databaseId,
        this.projectCollectionId,
        blogId
      );
      return {
        id: response.$id,
        title: response.title || "",
        description: response.description || "",
        link: response.link || "",
        image_file: response.image_file || "",
      };
    } catch (error) {
      throw error;
    }
  }



  async customizeProject(
    projectId: string,
    updatedData: {
      title?: string;
      description?: string;
      link?: string;
      imageFile?: File;
      image_file?: string;
    }
  ) {
    if (updatedData.imageFile) {
      const imageFileId = await this.uploadImage(updatedData.imageFile);
      updatedData.image_file = imageFileId;
      delete updatedData.imageFile;
    }
  
    try {
      const response = await this.databases.updateDocument(
        this.databaseId,
        this.projectCollectionId,
        projectId,
        updatedData
      );
      if (response) {
        return response;
      } else {
        throw new Error("Project customization failed");
      }
    } catch (error) {
      console.error("Error customizing project:", error);
      throw error;
    }
  }
  
  async deleteProject(blogId: string) {
    try {
      await this.databases.deleteDocument(
        this.databaseId,
        this.projectCollectionId,
        blogId
      );
      console.log("Blog deleted successfully");
    } catch (error) {
      throw error;
    }
  }
}

const projectService = new ProjectService();

export default projectService;
