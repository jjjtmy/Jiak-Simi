import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDish, getReviewsForDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Flex,
  Badge,
  Heading,
  Divider,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import intToFloat from "../../util/convertDecimal";

export default function DishDetailsPage() {
  const navigate = useNavigate();
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
      // TODO: try to map username
      const usernames = dishReviews.map((review) => {
        // send this to the back and get the username from querying user table
        // update the review state to include it so i can use it at the bottom
      })
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


  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!dishData || !placeData) return <Text>No data available</Text>;

  return (
    <Box minHeight="100vh" w='100%' bg={bgColor} px={8}>
      
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flexBasis={{ base: "20%", md: "50%" }} flexShrink={0}>
          <Image
            src={reviews[0].image_url}
            alt={dishData.name}
            objectFit='contain'
            w="100%"
            h={{ base: "30vh", md: "50vh" }}
          />
          <Box bg={cardBgColor} p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="xl" mb={2}>
              {dishData.name}
            </Heading>
            <Text fontSize="lg" color="gray.500" mb={4}>
              {placeData.name}
            </Text>
            <HStack spacing={4} mb={4}>
              <Badge colorScheme="green" fontSize="lg" px={3} py={1} flexGrow={1}>
                ${intToFloat(dishData.latest_price, 2)}
              </Badge>
              <Badge colorScheme="orange" fontSize="lg" px={3} py={1}flexGrow={1}>
                {intToFloat(dishData.avg_rating,1)} ⭐
              </Badge>
            </HStack>
            {/* Look into formatting */}
            <Text color='grey' fontSize='12'>Last updated @ {new Date(dishData.updatedAt).toLocaleDateString()}</Text>
          </Box>
        </Box>
        <VStack
          flexGrow={1}
          spacing={4}
          align="stretch"
          p={4}
          maxHeight={{ base: "60vh", md: "100vh" }}
          overflowY="auto"
        >

          <Divider />

          <Heading as="h2" size="lg" mb={2}>
            Reviews
          </Heading>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Box
                key={review._id}
                bg={cardBgColor}
                p={4}
                borderRadius="md"
                shadow="sm"
              >
                <HStack justify="space-between" mb={2}>
                <Text>{review.comment}</Text>
                  <Badge colorScheme="orange">{review.rating} ⭐</Badge>
                  <Text>{review.comment}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Text textAlign="center" color="gray.500">
              No reviews yet.
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}