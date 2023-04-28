import { CategoryModel } from "../model/CategoryModel";

export class CategoryApiClient {
  public static async createCategory(
    category: CategoryModel
  ): Promise<CategoryModel> {
    const response = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    return await response.json();
  }

  public static async updateCategory(
    category: CategoryModel
  ): Promise<CategoryModel> {
    const response = await fetch("http://localhost:8080/categories/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    return await response.json();
  }

  public static async getCategories(): Promise<CategoryModel[]> {
    const response = await fetch("http://localhost:8080/categories");
    return await response.json();
  }

  public static async getCategoryById(id: number): Promise<CategoryModel> {
    const response = await fetch(`http://localhost:8080/categories/${id}`);
    return await response.json();
  }

  public static async searchCategoriesByName(
    name: string
  ): Promise<CategoryModel[]> {
    const response = await fetch(
      `http://localhost:8080/categories/search/${name}`
    );
    return await response.json();
  }

  public static async deleteCategoryById(id: number): Promise<void> {
    await fetch(`http://localhost:8080/categories/delete/${id}`, {
      method: "DELETE",
    });
  }
}
