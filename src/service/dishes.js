import * as dishesAPI from "../api/dishes";

export async function getReviews() {
  // Delegate the network request code to the reviews-api.js API module

  const dishDetails = await dishesAPI.getReview();
  // console.log(dishDetails);
  return dishDetails.data;
}
