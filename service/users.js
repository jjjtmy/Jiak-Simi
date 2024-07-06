import * as usersAPI from "../api/users";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

export async function getSaltAndIterations(username) {
  const saltAndIterations = await usersAPI.getSaltAndIterations(username);
  console.log(saltAndIterations)
  return saltAndIterations;
}

export async function loginUser(userData) {
  const res = await usersAPI.loginUser(userData);
  return res;
}

