const BASE_URL = "http://localhost:3000/places";
import sendRequest from "../util/send-request";

export async function getPlace(place_id, dish_id) {
  return await sendRequest(
    `${BASE_URL}/${place_id}/${dish_id}`,
    "GET",
    null,
    "Invalid place ID",
  );
}
