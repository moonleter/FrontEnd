import { TaskModel } from "../model/TaskModel";

export class TodoApiClient {
  public static async createTask(task: TaskModel): Promise<TaskModel> {
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await response.json();
  }

  public static async updateTask(task: TaskModel): Promise<TaskModel> {
    const response = await fetch("http://localhost:8080/tasks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await response.json();
  }

  public static async getTasks(): Promise<TaskModel[]> {
    const response = await fetch("http://localhost:8080/tasks");
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }

  public static async getTaskById(id: number): Promise<TaskModel> {
    const response = await fetch(`http://localhost:8080/tasks/${id}`);
    const resJson = await response.json();
    const dateArr = resJson.created;
    const data = {
      ...resJson,
      created: new Date(
        Date.UTC(
          dateArr[0],
          dateArr[1] - 1,
          dateArr[2],
          dateArr[3],
          dateArr[4],
          dateArr[5],
          dateArr[6]
        )
      ),
    };

    return data;
  }

  public static async searchTasksByPriority(
    priority: string
  ): Promise<TaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/tasks/search/priority/${priority}`
    );
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }

  public static async searchTasksByName(name: string): Promise<TaskModel[]> {
    const response = await fetch(`http://localhost:8080/tasks/search/${name}`);
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }
  public static async getAllTasksSortedByPriority(
    ascending: boolean
  ): Promise<TaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/tasks/sorted/priority?ascending=${ascending}`
    );
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }

  public static async getAllTasksSortedByCategory(
    ascending: boolean
  ): Promise<TaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/tasks/sorted/category?ascending=${ascending}`
    );
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }

  public static async getAllTasksSortedByName(
    ascending: boolean
  ): Promise<TaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/tasks/sorted/name?ascending=${ascending}`
    );
    const resArr = await response.json();
    const data = resArr.map((resJson: any) => {
      const dateArr = resJson.created;
      return {
        ...resJson,
        created: new Date(
          Date.UTC(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5],
            dateArr[6]
          )
        ),
      };
    });

    return data;
  }

  public static async searchTasksAndSubtasksAndCategoryByName(
    name: string
  ): Promise<TaskModel[]> {
    const response = await fetch(
      `http://localhost:8080/tasks/search/combined/${name}`
    );
    const resJson = await response.json();
    const dateArr = resJson.created;
    const data = {
      ...resJson,
      created: new Date(
        Date.UTC(
          dateArr[0],
          dateArr[1] - 1,
          dateArr[2],
          dateArr[3],
          dateArr[4],
          dateArr[5],
          dateArr[6]
        )
      ),
    };

    return data;
  }

  public static async deleteTaskById(id: number): Promise<void> {
    await fetch(`http://localhost:8080/tasks/delete/${id}`, {
      method: "DELETE",
    });
  }
}
