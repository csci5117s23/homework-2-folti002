// Contains all REST api calls 

const BASE_URL = 'https://backend-rnkp.api.codehooks.io/dev';

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
export async function deleteOneTodoItem(todoItemId, authToken){
  const response = fetch(`${BASE_URL}/todos/${todoItemId}`, {
    'method': 'DELETE',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return;
}




// FOR CATEGORIES

// Get single category by id
export async function getOneCategory(categoryId, authToken){
  console.log()
  const response = await fetch(`${BASE_URL}/categories?_id=${categoryId}`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Get all categories for a specified user
export async function getAllCategories(userId, authToken){
  const response = await fetch(`${BASE_URL}/categories?user_id=${userId}&sort=name`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Get all todo items pertaining to a category
export async function getTodoItemsForCategory(userId, categoryId, authToken){
  const response = await fetch(`${BASE_URL}/todos?user_id=${userId}&category=${categoryId}&complete=false&sort=-created_on`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Get all done todo items pertaining to a category
export async function getDoneItemsForCategory(userId, categoryId, authToken){
  const response = await fetch(`${BASE_URL}/todos?user_id=${userId}&category=${categoryId}&complete=true&sort=-created_on`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

// Post new category
export async function postNewCategory(data, authToken){
  const response = fetch(`${BASE_URL}/categories`, {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return await response;
}

// Delete a category
export async function deleteSingleCategory(categoryId, authToken){
  const response = fetch(`${BASE_URL}/deleteCategory?_id=${categoryId}`, {
    'method': 'DELETE',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return await response;
}