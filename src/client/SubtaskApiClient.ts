import { SubtaskModel } from "../model/SubtaskModel";

export class SubtaskApiClient {
  static async createSubtask(
    subtask: Omit<SubtaskModel, "id">
  ): Promise<SubtaskModel> {
    const response = await fetch("http://localhost:8080/subtasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subtask),
    });

    if (!response.ok) {
      throw new Error("Failed to create subtask");
    }

    const createdSubtask: SubtaskModel = await response.json();
    return createdSubtask;
  }
  public static async updateSubtask(
    subtask: SubtaskModel
  ): Promise<SubtaskModel> {
    const response = await fetch("http://localhost:8080/subtasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subtask),
    });

    return await response.json();
  }

  public static async getSubtasks(): Promise<SubtaskModel[]> {
    const response = await fetch("http://localhost:8080/subtasks");
    return await response.json();
  }

  public static async getSubtaskById(id: number): Promise<SubtaskModel> {
    const response = await fetch(`http://localhost:8080/subtasks/${id}`);
    return await response.json();
  }

  public static async searchSubtasksByName(
    name: string
  ): Promise<SubtaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/subtasks/search/${name}`
    );
    return await response.json();
  }

  public static async deleteSubtaskById(id: number): Promise<void> {
    await fetch(`http://localhost:8080/subtasks/delete/${id}`, {
      method: "DELETE",
    });
  }
}
