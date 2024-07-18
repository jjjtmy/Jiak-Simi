import sendRequest from "../util/send-request";
const BASE_URL = "http://localhost:3000/users";

export async function signUp(userData) {
  return await sendRequest(
    `${BASE_URL}/signup`,
    "POST",
    userData,
    "Invalid Sign Up"
  );
}

export async function getSaltAndIterations(username) {
  const searchParams = new URLSearchParams({ username: username });
  return await sendRequest(`${BASE_URL}/login?${searchParams}`);
}

export async function loginUser(userData) {
  return await sendRequest(
    `${BASE_URL}/login`,
    "POST",
    userData,
    "Invalid User"
  );
}

export async function logOutUser(token, userData) {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}

export async function getUsername(user_id) {
  console.log(`api userid`, user_id);
  return await sendRequest(
    `${BASE_URL}/user/${user_id}`,
    "GET",
    null,
    "Error fetching user"
  );
}
