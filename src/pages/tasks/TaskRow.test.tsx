import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskModel } from "../../model/TaskModel";
import TaskRow from "./TaskRow";
import { PriorityModel } from "../../model/PriorityModel";
import Tasks from "./Tasks";

const mockTask: TaskModel = {
  id: 1,
  name: "Test Task",
  description: "Test Task Description",
  completed: false,
  created: new Date(),
  priority: PriorityModel.MEDIUM,
  subtasks: [],
  category: [],
};

const onEditTask = jest.fn();
const onEditSubtask = jest.fn();
const onEditCategory = jest.fn();
const onDeleteTask = jest.fn();
const onDeleteSubtask = jest.fn();
const onDeleteCategory = jest.fn();
const onCreateSubtask = jest.fn();
const onCreateCategory = jest.fn();

const defaultProps = {
  task: mockTask,
  onEditTask,
  onEditSubtask,

  onEditCategory,
  onDeleteTask,
  onDeleteSubtask,
  onDeleteCategory,
  onCreateSubtask,
  onCreateCategory,
  tasks: [mockTask], //mock objekt Tasku
};
// Test 1: Ověřuje, zda komponenta TaskRow správně zobrazuje název úkolu, popis úkolu a stav dokončení úkolu
describe("TaskRow", () => {
  it("renders the task name, description, and completion status", () => {
    render(<TaskRow {...defaultProps} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Task Description")).toBeInTheDocument();
    expect(screen.getByText("Not completed")).toBeInTheDocument();
  });
});
