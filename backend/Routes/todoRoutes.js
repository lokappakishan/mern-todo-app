const express = require('express');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middleware/verifyJWT');
const Joi = require('joi');
const Todo = require('../models/todo');
const User = require('../models/user');
const createValidator = require('../middleware/createValidator');

const todoRouter = express.Router();
const SECRET = process.env.SECRET;
const idSchema = Joi.string().length(24).hex().required();
const validateId = createValidator(idSchema, 'params', 'id');

todoRouter.use(verifyJWT);

// @route POST /api/todo/
// @desc Create a todo
// @access Private
todoRouter.post('/', async (req, res) => {
  const validTodo = validateTodo(req.body);
  if (validTodo.error) {
    return res.status(400).json({
      success: false,
      message: validTodo.error.details,
    });
  }

  const { description, status, tags = [] } = req.body;

  try {
    const newTodo = new Todo({
      userId: req.user.userId,
      description: description,
      status: status,
      tags: tags,
    });
    await newTodo.save();
    res.status(200).json({ success: true, message: 'post todo called' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error while creating todo',
      error: error.message,
    });
  }
});

// @route GET /api/todo/
// @desc get all todo
// @access Private
todoRouter.get('/', async (req, res) => {
  const userId = req.user.userId;

  try {
    const allTodos = await Todo.find({ userId: userId }).select(
      'description status tags'
    );

    res.status(200).json({ success: true, todos: allTodos });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error while fetching all todos',
      error: error.message,
    });
  }
});

// @route PATCH /api/todo/
// @desc Update todo
// @access Private
todoRouter.patch('/:id', validateId, async (req, res) => {
  try {
    const id = req.params.id;
    const allowedFields = ['description', 'status', 'tags'];
    const updateTodoFields = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateTodoFields[key] = req.body[key];
      }
    }

    if (Object.keys(updateTodoFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update',
      });
    }

    const validTodo = validatePartialTodo(updateTodoFields);
    if (validTodo.error) {
      return res.status(400).json({
        success: false,
        message: validTodo.error.details,
      });
    }

    const updateResponse = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { $set: updateTodoFields },
      { new: true }
    );

    if (!updateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or unauthorized',
      });
    }

    res.status(200).json({ success: true, newTodo: updateResponse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error while updating todos',
      error: error.message,
    });
  }
});

// @route DELETE /api/todo/
// @desc DELETE todo
// @access Private
todoRouter.delete('/:id', validateId, async (req, res) => {
  try {
    const response = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: 'The todo does not exist' });
    }
    res
      .status(200)
      .json({ success: true, message: ' Todo deleted successfully ' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error while deleting todo',
      error: error.message,
    });
  }
});

// Joi validators
function validateTodo(todo) {
  const todoSchema = Joi.object({
    description: Joi.string().min(3).max(30).required(),
    status: Joi.string()
      .valid('pending', 'in progress', 'completed')
      .required(),
    tags: Joi.array().items(Joi.string()),
  });

  return todoSchema.validate(todo);
}

function validatePartialTodo(update) {
  const updateSchema = Joi.object({
    description: Joi.string().min(3).max(30),
    status: Joi.string().valid('pending', 'in progress', 'completed'),
    tags: Joi.array().items(Joi.string()),
  });

  return updateSchema.validate(update);
}

module.exports = todoRouter;
