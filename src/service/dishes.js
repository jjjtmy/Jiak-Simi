import * as dishesAPI from "../api/dishes";

export async function getReviews() {
  const dishDetails = await dishesAPI.getReview();
  // console.log(dishDetails);
  return dishDetails.data;
}
