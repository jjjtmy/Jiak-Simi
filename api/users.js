import sendRequest from "../util/send-request";
const BASE_URL = "http://localhost:3000/users";

export async function signUp(userData) {
  return await sendRequest(`${BASE_URL}/signup`, "POST", userData, 'Invalid Sign Up');
}

export async function getSaltAndIterations(username) {
  const searchParams = new URLSearchParams({"username":username});
  return await sendRequest(`${BASE_URL}/login?${searchParams}`)
  
}

export async function loginUser(userData) {
  return await sendRequest(`${BASE_URL}/login`, "POST", userData, 'Invalid User')
