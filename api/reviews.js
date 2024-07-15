import sendRequest from "../util/send-request";
const BASE_URL = "http://localhost:3000/reviews";

export async function createReview(formData) {
  return await sendRequest(
    `${BASE_URL}/new`,
    "POST",
    formData,
    "Invalid Form Data",
  );
}
export async function updateReview(formData) {
  return await sendRequest(
    `${BASE_URL}/update`,
    "POST",
    formData,
    "Invalid Form Data",
  );
}

export async function getReview(review_id) {
  return await sendRequest(
    `${BASE_URL}/reviewid/${review_id}`,
    "GET",
    null,
    "No review found",
  );
}

export async function fetchReviewsByUser(user_id) {
  return await sendRequest(
    `${BASE_URL}/userid/${user_id}`,
    "GET",
    null,
    "No review found",
  );
}
