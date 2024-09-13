const todo = require("../models/todoModel");
const getTodos = async (req, res) => {
  const todos = await todo.find();
  if (!todo) {
    return res.status(404).json({
      message: "not found todo",
    });
  }
  res.status(200).json({
    message: "get all todo",
    data: todos,
  });
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  const todoById = await todo.findById(id);
  if (!todoById) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  res.status(200).json({
    message: "get todo by id",
    data: todoById,
  });
};

const createTodo = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) {
    return res.status(404).json({
      message: "all fields are required",
    });
  }
  const newTodo = await todo.create({
    title,
    description,
    status,
  });
  if (!newTodo) {
    return res.status(404).json({
      message: "not found todo",
    });
  }
  res.status(200).json({
    message: "create todo successfully added",
    data: newTodo,
  });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  const deleteTodo = await todo.findByIdAndDelete(id);
  if (!deleteTodo) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  res.status(200).json({
    message: "delete todo",
    data: deleteTodo,
  });
};
const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  const updateTodo = await todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateTodo) {
    return res.status(404).json({
      message: "todo not found",
    });
  }
  res.status(200).json({
    message: "update todo",
    data: updateTodo,
  });
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
};