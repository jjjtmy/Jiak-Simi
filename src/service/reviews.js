import * as reviewsAPI from "../api/reviews";

export async function getReviews() {
  const reviewDetails = await reviewsAPI.getReview();
  // console.log(reviewDetails);

  return reviewDetails.data;
}
