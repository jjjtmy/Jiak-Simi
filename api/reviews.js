import sendRequest from "../util/send-request";
const BASE_URL = "http://localhost:3000/reviews";

export async function createReview(formData) {
  return await sendRequest(
    `${BASE_URL}/newmakan`,
    "POST",
    formData,
    "Invalid Form Data"
  );
}