import * as reviewsAPI from "../api/reviews";

export async function createReview(formData) {
  const review = await reviewsAPI.createReview(formData);
  return review;
}

