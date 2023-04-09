import {app} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import { date, object, string, bool } from 'yup';

const todoItemYup = object({
  content: string().required(),
  complete: bool().default(false),
  category: string(),
  createdOn: date().default(() => new Date()),
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

// Endpoint for adding a new todo item
// app.post("/todos", (req, res) => {

// });

// Endpoint for getting a





// Create REST API for todo items collection
crudlify(app, {todos: todoItemYup});

// bind to serverless runtime
export default app.init();
