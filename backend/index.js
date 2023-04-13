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
