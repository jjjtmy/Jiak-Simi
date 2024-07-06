import sendRequest from "../util/send-request";
const BASE_URL = "http://localhost:3000/users";

export async function signUp(userData) {
  sendRequest(`${BASE_URL}/signup`, "POST", userData);
}
