import { Box, Image, Text, Icon } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";
import { getReviews } from "../service/reviews";
import { useEffect, useState } from "react";

//TODO: replace with api to call place model in database
export default function FoodCard({ image, name }) {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getReviews();
        setReviewData(data);
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
            {reviewData ? `Dish ${reviewData.dish_id}` : "Loading..."}
          </Box>
          <Box d="flex" alignItems="baseline">
            @eatery
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-around" fontWeight="bold">
          <Text>{reviewData ? `$${reviewData.price}` : "Loading..."}</Text>
          <Box display="flex" justifyContent="space-around" fontWeight="bold">
            <Text fontWeight="bold" color="orange">
              {reviewData ? reviewData.rating : "Loading..."}
            </Text>
            <Icon as={TiThumbsUp} boxSize={8} color="orange" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
