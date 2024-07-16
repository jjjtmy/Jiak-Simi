import * as dishesAPI from "../api/dishes";

export async function getDish(dish_id) {
  const dishDetails = await dishesAPI.getDish(dish_id);
  console.log(dishDetails, dishDetails);
  return dishDetails.data;
}

export async function fetchAllDishesIDs() {
  const allDishIDs = await dishesAPI.fetchAllDishesIDs();
  console.log(allDishIDs, allDishIDs);
  return allDishIDs; //returns array of each collection in dishes model including _id
}

export async function getReviewsForDish(dish_id) {
  const reviewDetails = await dishesAPI.getReviewsForDish(dish_id);
  console.log("reviewDetails", reviewDetails);
  return reviewDetails;
}

export async function getDishIDByPlaceID(place_id) {
  const dishID = await dishesAPI.getDishIDByPlaceID(place_id);
  console.log("dishID array in servicedishes", dishID);
  return dishID;
}
