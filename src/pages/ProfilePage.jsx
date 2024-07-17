import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Text,
  Icon,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchReviewsByUser } from "../../service/reviews";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { logOutUser, getUser, getUsername } from "../../service/users";

export default function ProfilePage({ setUser }) {
  const [userID, setUserID] = useState(getUser);
  const [username, setUsername] = useState(getUsername);

  const navigate = useNavigate();
  async function handleLogOut() {
    const user = await logOutUser(); //returns username
    setUser(user);
    navigate("/");
  }

  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        // console.log(`userID`, userID);
        const reviews = await fetchReviewsByUser(userID);
        // console.log("reviews", reviews);

        // Fetch dish and place data for each review
        const reviewsWithDetails = await Promise.all(
          reviews.map(async (review) => {
            // console.log(`review.dish_id`, review.dish_id);
            const dishData = await getDish(review.dish_id);
            // console.log(`dishData`, dishData);
            const placeData = await getPlace(dishData.place_id, review.dish_id);
            // console.log(`placeData`, placeData);
            return { ...review, dish: dishData, place: placeData };
          })
        );

        // console.log(`reviewsWithDetails`, reviewsWithDetails);
        setMyReviews(reviewsWithDetails);
      } catch (error) {
        console.error("Error fetching reviews by user:", error);
      }
    }

    fetchUserReviews();
  }, []);

  return (
    <Box w="100vw" h="100vh">
      <Box mt="3" textAlign="center">
        <Card>
          <CardHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius={20}
          >
            <Icon as={FaUserAlt} boxSize={90} color="lightblue" />
            <Text as="b">{username}</Text>
            <Text as="u" onClick={handleLogOut}>
              Log Out
            </Text>
          </CardHeader>
        </Card>
      </Box>

      <Card mt="8" textAlign="left" mx="auto" borderRadius={20} p={3} w="80vw">
        <Text as="b" fontSize="2xl" align="left">
          My Makan
        </Text>
        <VStack
          mt={3}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
          textAlign="left"
        >
          {myReviews.map((review) => (
            <Box
              key={review._id}
              h="40px"
              bg="yellow.200"
              p={2}
              onClick={() => navigate(`/editmakan/${review._id}`)}
            >
              <Text>
                {review.dish.name} @ {review.place.name}
              </Text>
            </Box>
          ))}
        </VStack>
      </Card>
    </Box>
  );
}
