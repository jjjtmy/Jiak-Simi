import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getDish, getReviewsForDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { Box, Container, HStack, VStack } from "@chakra-ui/react";

export default function DishDetailsPage() {
  const { dish_id } = useParams();
  const [dishData, setDishData] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dish = await getDish(dish_id);
      setDishData(dish);
      const place = await getPlace(dish.place_id, dish_id);
      setPlaceData(place);
      const dishReviews = await getReviewsForDish(dish_id);
      console.log("dishReviews", dishReviews);
      setReviews(dishReviews);
    } catch (error) {
      console.error("Error fetching dish details:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [dish_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dishData || !placeData) return <div>No data available</div>;

  return (
    <div>
      <Container h="100vh">
        <Box h="50%">IMG HERE</Box>
        <Box h="50%">
          <VStack>
            <Container maxW="md" bg="blue.600" color="white">
              {dishData.name} @ {placeData.name}
            </Container>
            <HStack>
              <Container maxW="550px" bg="purple.600" color="white">
                ${dishData.latest_price}
              </Container>
              <Container maxW="550px" bg="purple.600" color="white">
                {dishData.avg_rating}
              </Container>
            </HStack>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id}>
                  <Container maxW="container.sm" bg="green.400" color="#262626">
                    Rating: {review.rating} Comment: {review.comment}
                  </Container>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </VStack>
        </Box>
      </Container>
    </div>
  );
}