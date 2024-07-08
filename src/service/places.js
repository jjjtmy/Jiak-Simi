import * as placesAPI from "../api/places";

export async function getReviews() {
  // Delegate the network request code to the reviews-api.js API module
  const placeDetails = await placesAPI.getReview();
  // Baby step by returning whatever is sent back by the server
  // console.log(placeDetails);

  return placeDetails.data;
}
