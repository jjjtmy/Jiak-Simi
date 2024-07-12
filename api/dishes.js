const BASE_URL = "http://localhost:3000/dishes";
import sendRequest from "../util/send-request";


export async function getDish(dish_id) {
  return await sendRequest(
    `${BASE_URL}/${dish_id}`,
    "GET",
    null,
    "Invalid dish ID"
  );
}

export async function fetchAllDishesIDs() {
  return await sendRequest(
    `${BASE_URL}`,
    "GET",
    null,
    "Error fetching all dishes IDs"
  );
}