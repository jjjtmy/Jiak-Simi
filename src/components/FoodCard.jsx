import { Box, Image, Text, Icon } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";
import { getReviews } from "../service/reviews";
import { getReviews as getDishes } from "../service/dishes";
import { getReviews as getPlaces } from "../service/places";
import { useEffect, useState } from "react";

//TODO: replace with api to call place model in database
export default function FoodCard({ image, name }) {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // const revData = await getReviews();
        // const dishData = await getDishes();
        // const placeData = await getPlaces();
        // let combinedData = { ...revData, ...dishData, ...placeData };
        // console.log(`FINAL DATA IS ${combinedData}`);
        // setReviewData(combinedData);
        const revData = await getReviews();

        const dishData = await getDishes();

        const placeData = await getPlaces();

        const combinedData = { revData, dishData, placeData };
        console.log(`FINAL DATA IS ${JSON.stringify(combinedData)}`);
        setReviewData(combinedData);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      <Image src={image} alt={name} objectFit="cover" h="120px" w="100%" />

      <Box h="90px">
        <Box p="1">
          <Box d="flex" alignItems="baseline" fontWeight="bold">
            {reviewData ? `Dish ${reviewData.dishData.name}` : "Loading..."}
          </Box>
          <Box d="flex" alignItems="baseline">
            <Text>
              {reviewData ? `$${reviewData.placeData.name}` : "Loading..."}
            </Text>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-around" fontWeight="bold">
          <Text>
            {reviewData ? `$${reviewData.revData.price}` : "Loading..."}
          </Text>
          <Box display="flex" justifyContent="space-around" fontWeight="bold">
            <Text fontWeight="bold" color="orange">
              {reviewData ? reviewData.revData.rating : "Loading..."}
            </Text>
            <Icon as={TiThumbsUp} boxSize={8} color="orange" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
