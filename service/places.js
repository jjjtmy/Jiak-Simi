import * as placesAPI from "../api/places";

export async function getPlace(place_id, dish_id) {
  const placeDetails = await placesAPI.getPlace(place_id, dish_id);
  console.log(`placeDetails`, placeDetails);

  return placeDetails.data;
}
