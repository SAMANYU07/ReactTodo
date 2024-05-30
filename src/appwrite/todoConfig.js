import { Client, Account, ID, Databases } from "appwrite";

export class TodoService
{
  client = new Client();
  database;

  constructor() {
    this.client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async getAllTodos()
  {
    try {
      return await this.database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID);
    } catch (error) {
      console.log("Fetching todo error: ", error);
    }
  }

  async addTodo(todo) {
    try {
      return await this.database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID, todo.uid, todo);
    } catch (error) {
      console.log("Todo Add error: ", error);
    }
  }
  async deleteTodo(todoid) {
    try {
      return await this.database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID, todoid);
    } catch (error) {
      console.log("Todo deletion error: ", error);
    }
  }


}
const todoService = new TodoService();
export default todoService;