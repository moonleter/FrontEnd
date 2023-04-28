import { SubtaskModel } from "./SubtaskModel";
import { CategoryModel } from "./CategoryModel";
import { PriorityModel } from "./PriorityModel";
export interface TaskModel {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  created: Date;
  priority: PriorityModel; //enum
  subtasks: SubtaskModel[];
  category: CategoryModel[]; //categories
}
