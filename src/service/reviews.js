import * as reviewsAPI from "../api/reviews";

export async function getReviews() {
  // Delegate the network request code to the reviews-api.js API module
  const reviewDetails = await reviewsAPI.getReview();
  // Baby step by returning whatever is sent back by the server
  console.log(reviewDetails);
  return reviewDetails.data;
}
