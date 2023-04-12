// Contains all REST api calls 

const BASE_URL = 'https://backend-rnkp.api.codehooks.io/dev';
const API_KEY= '10772928-f01a-46be-b1b6-a67f7d64d93b';

// Get all todo items for a user
export async function getAllTodoItems(){
  const response = await fetch(`${BASE_URL}/todos`, {
    'method': 'GET',
    'headers': {'x-apikey': API_KEY}
  });
  const data = await response.json();
  return data;
}

// Post a new todo item for a user
export async function postNewTodoItem(data){
  const response = fetch(`${BASE_URL}/todos`, {
    'method': 'POST',
    'headers': {
      'x-apikey': API_KEY,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return;
}

// Update a todo item for a user
export async function updateOneTodoItem(data){

}

// Delete a user's todo item
export async function deleteOneTodoItem(id){

}