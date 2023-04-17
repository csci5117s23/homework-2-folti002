import {app} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import { date, object, string, bool } from 'yup';

// Data model for a todo item
const todoItemYup = object({
  user_id: string().required(),
  content: string().required(),
  complete: bool().default(false),
  category: string().required(),
  created_on: date().default(() => new Date()),
});

// Data model for a category
const categoryYup = object({
  user_id: string().required(),
  name: string().required(),
});

// Endpoint and function for updating a todo item.
// This can happen either if the user updates the content, or if they 
// mark a todo item as complete.
app.put('/updateTodoItem', updateATodoItem)
async function updateATodoItem(req, res) {
  const db = await Datastore.open();
  const data = await db.updateOne('todos', req.query._id, req.body);
  res.json(data);
}

// Endpoint for deleting a category
app.delete('/deleteCategory', deleteACategory)
async function deleteACategory(req, res) {
  const db = await Datastore.open();
  const data = await db.removeOne('categories', req.query._id);
  res.json(data);
}

// Create REST API for todo items collection
crudlify(app, {todos: todoItemYup, categories: categoryYup});

// bind to serverless runtime
export default app.init();
