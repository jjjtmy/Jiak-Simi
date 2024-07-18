import { Box, Image, Text, Icon } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import intToFloat from "../../util/convertDecimal";

export default function FoodCard({ dish_id }) {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  // console.log(`FoodCard dish_id`, dish_id);
  useEffect(() => {
    async function fetchReviews() {
      try {
        const dishData = await getDish(dish_id);
        // console.log(`FoodCard dishData`, dishData)
        const placeData = await getPlace(dishData.place_id, dish_id);
        // console.log( `FoodCard placeData`, placeData)

        const combinedData = { dishData, placeData };
        // console.log(`FINAL DATA IS ${JSON.stringify(combinedData)}`);
        setReviewData(combinedData);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setReviewData(null); // Reset reviewData if an error occurs
      }
    }

    fetchReviews();
  }, [dish_id]); //Ensure useEffect runs when dish_id changes

  function handleClick() {
    navigate(`/dishes/${dish_id}`);
  }

  // Render loading state or placeholder if reviewData is null
  if (!reviewData) {
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p="4"
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box
      onClick={handleClick}
      cursor={"pointer"}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      {/* TODO: pull image from google */}
      <Image objectFit="cover" h="120px" w="100%" />

      <Box h="90px">
        <Box p="1">
          <Box d="flex" alignItems="baseline" fontWeight="bold">
            {reviewData.dishData?.name ?? "??"}
          </Box>
          <Box d="flex" alignItems="baseline">
            <Text>
              {reviewData.placeData?.name
                ? `@${reviewData.placeData.name}`
                : "??"}
            </Text>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-around" fontWeight="bold">
          <Text>
            {reviewData.dishData?.latest_price != null
              ? `$${intToFloat(reviewData.dishData.latest_price, 2)}`
              : "??"}
          </Text>
          <Box display="flex" justifyContent="space-around" fontWeight="bold">
            <Text fontWeight="bold" color="orange">
              {reviewData.dishData?.avg_rating != null
                ? intToFloat(reviewData.dishData.avg_rating, 1)
                : "??"}
            </Text>
            <Icon as={TiThumbsUp} boxSize={8} color="orange" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
