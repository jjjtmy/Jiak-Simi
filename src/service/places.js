import * as placesAPI from "../api/places";

export async function getReviews() {
  const placeDetails = await placesAPI.getReview();
  // console.log(placeDetails);

  return placeDetails.data;
}
