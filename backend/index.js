import {app} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import { date, object, string, bool } from 'yup';

const todoItemYup = object({
  user_id: string().required(),
  content: string().required(),
  complete: bool().default(false),
  category: string(),
  created_on: date().default(() => new Date()),
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

// const usersYup = object({
//   username: string().required(),
//   _id: string().required(),
//   display_name: string().required(),
//   email: string().required(),
//   created_on: date().default(() => new Date()),
// });

// Test endpoint
// app.get("/test", (req, res) => {
//   res.json({result: "you did it!"});
// });

// Create REST API for todo items collection
crudlify(app, {todos: todoItemYup});
// crudlify(app, {users: usersYup});

// bind to serverless runtime
export default app.init();
