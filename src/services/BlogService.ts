import { Client, ID, Databases, Models, Storage } from "appwrite";
import conf from "../config/Conf";

class BlogService {
  client: Client;
  databases: Databases;
  storage: Storage;
  databaseId: string;
  blogsCollectionId: string;
  blogsBucketId: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.apiEndpoint)
      .setProject(conf.projectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.databaseId = conf.databaseId;
    this.blogsCollectionId = conf.blogsCollectionId;
    this.blogsBucketId = conf.blogsBucketId;
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const response = await this.storage.createFile(
        this.blogsBucketId,
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
      const url = this.storage.getFileView(this.blogsBucketId, fileId);
      return url.toString();
    } catch (error) {
      throw error;
    }
  }

  async createBlog(title: string, content: string, imageFile?: File) {
    const date_of_added = new Date().toISOString();

    let image_file: string | undefined;

    if (imageFile) {
      const imageFileId = await this.uploadImage(imageFile);
      image_file = imageFileId;
    }

    const data = { title, content, date_of_added, image_file };
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.blogsCollectionId,
        ID.unique(),
        data
      );
      if (response) {
        return response;
      } else {
        throw new Error("Blog creation failed");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  }

  async customizeBlog(
    blogId: string,
    updatedData: {
      title?: string;
      content?: string;
      imageFile?: File;
      image_file?: string;
    }
  ) {
    if (updatedData.imageFile) {
      const imageFileId = await this.uploadImage(updatedData.imageFile);
      const image_file = imageFileId;
      updatedData.image_file = image_file;
      delete updatedData.imageFile;
    }

    try {
      const response = await this.databases.updateDocument(
        this.databaseId,
        this.blogsCollectionId,
        blogId,
        updatedData
      );
      if (response) {
        return response;
      } else {
        throw new Error("Blog customization failed");
      }
    } catch (error) {
      console.error("Error customizing blog:", error);
      throw error;
    }
  }

  async getBlogs() {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.blogsCollectionId
      );
      return response.documents.map((doc: Models.Document) => ({
        id: doc.$id,
        title: doc.title || "",
        image_file: doc.image_file || "",
        content: doc.content || "",
        date_of_added: doc.date_of_added || "",
      }));
    } catch (error) {
      console.error("Error retrieving blogs:", error);
      throw error;
    }
  }

  async getBlogById(blogId: string) {
    try {
      const response = await this.databases.getDocument(
        this.databaseId,
        this.blogsCollectionId,
        blogId
      );
      return {
        id: response.$id,
        title: response.title || "",
        image_file: response.image_file || "",
        content: response.content || "",
        date_of_added: response.date_of_added || "",
      };
    } catch (error) {
      console.error("Error retrieving blog by ID:", error);
      throw error;
    }
  }

  async deleteBlog(blogId: string) {
    try {
      await this.databases.deleteDocument(
        this.databaseId,
        this.blogsCollectionId,
        blogId
      );
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  }

}

const blogService = new BlogService();

export default blogService;
