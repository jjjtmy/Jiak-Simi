import * as reviewsAPI from "../api/reviews";

export async function createReview(formData) {
  const review = await reviewsAPI.createReview(formData);
  return review;
}

export async function updateReview(formData) {
  const updatedReview = await reviewsAPI.updateReview(formData);
  console.log("updatedReview", updatedReview);
  return updatedReview.data;
}

export async function getReview(review_id) {
  const reviewByID = await reviewsAPI.getReview(review_id);
  // console.log('reviewByID', reviewByID);
  return reviewByID.data;
}

export async function fetchReviewsByUser(user_id) {
  const reviewsByUser = await reviewsAPI.fetchReviewsByUser(user_id);
  console.log(`reviewsByUser `, reviewsByUser);
  return reviewsByUser.data;
}
