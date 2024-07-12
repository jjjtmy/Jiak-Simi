import * as reviewsAPI from "../api/reviews";

export async function createReview(formData) {
  const review = await reviewsAPI.createReview(formData);
  return review;
}

export async function getReview() {
  const reviewDetails = await reviewsAPI.getReview();
  // console.log(reviewDetails);

  return reviewDetails.data;
}
