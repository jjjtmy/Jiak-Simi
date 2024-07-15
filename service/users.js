import * as usersAPI from "../api/users";
import { getToken, removeToken } from "../util/security";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

export async function getSaltAndIterations(username) {
  const saltAndIterations = await usersAPI.getSaltAndIterations(username);
  console.log(saltAndIterations);
  return saltAndIterations;
}

export async function loginUser(userData) {
  const res = await usersAPI.loginUser(userData);
  return res;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the userid in the payload, otherwise return null
  console.log(`usertoken`, token);
  console.log(`payload`, JSON.parse(atob(token.split(".")[1])).payload);

  return token ? JSON.parse(atob(token.split(".")[1])).payload.user_id : null;
}

export function getUsername() {
  const token = getToken();
  // If there's a token, return the username in the payload, otherwise return null
  console.log(
    `payload`,
    JSON.parse(atob(token.split(".")[1])).payload.username
  );

  return token ? JSON.parse(atob(token.split(".")[1])).payload.username : null;
}

export async function logOutUser() {
  const token = getToken();
  if (token) {
    const res = await usersAPI.logOutUser(
      token,
      JSON.parse(atob(token.split(".")[1])).payload
    );
    removeToken(); // Remove token from FE
    console.log(`user '${res}' logged out`);
    return res;
  }
  return null;
}
