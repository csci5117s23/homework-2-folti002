// Contains all REST api calls 

const BASE_URL = 'https://backend-rnkp.api.codehooks.io/dev';
// const API_KEY= '10772928-f01a-46be-b1b6-a67f7d64d93b';

// Get all todo items for a user
export async function getAllTodoItems(userId, authToken){
  const response = await fetch(`${BASE_URL}/todos?user_id=${userId}&complete=false&sort=-createdOn`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Get all done todo items for a user
export async function getAllDoneTodoItems(userId, authToken){
  const response = await fetch(`${BASE_URL}/todos?user_id=${userId}&complete=true&sort=-createdOn`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Get a todo item by id
export async function getTodoItemById(itemId, authToken){
  const response = await fetch(`${BASE_URL}/todos?_id=${itemId}`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Post a new todo item for a user
export async function postNewTodoItem(data, authToken){
  const response = fetch(`${BASE_URL}/todos`, {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return;
}

// Update a todo item for a user
export async function updateOneTodoItem(data, itemId, authToken){
  const response = fetch(`${BASE_URL}/updateTodoItem?_id=${itemId}`, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return;
}

// Delete a user's todo item
export async function deleteOneTodoItem(todoItemId, userId, authToken){
  const response = fetch(`${BASE_URL}/todos/${todoItemId}`, {
    'method': 'DELETE',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return;
}