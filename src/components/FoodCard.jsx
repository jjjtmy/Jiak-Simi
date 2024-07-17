import { Box, Image, Text, Icon, HStack } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      <Box h="90px"> {/* this is the main box? */}
          <Box display="flex" flexDir="column" justifyContent="flex-start" alignItems="flex-start" fontWeight="bold" fontSize={10} color="grey" marginInline="4" pt="2">
            <HStack>
              <Icon as={TiThumbsUp} boxSize={3} />
              <Text fontWeight="bold">
              {reviewData.dishData?.avg_rating != null
                ? reviewData.dishData.avg_rating
                : "??"} / 5
              </Text>
              </HStack>
          <Box fontWeight="bold" alignSelf="flex-start" fontSize="14px" color="black">
            {reviewData.dishData?.name ?? "??"}
          </Box>
            <Text fontSize="8px" color="grey">
              {reviewData.placeData?.name
                ? `${reviewData.placeData.name}`
                : "??"}
            </Text>
            <Text color="green.400" fontSize="14px">
            {reviewData.dishData?.latest_price != null
              ? `$${reviewData.dishData.latest_price}`
              : "??"}.00
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
