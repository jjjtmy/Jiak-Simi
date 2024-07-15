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
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { fetchReviewsByUser } from "../../service/reviews";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { logOutUser } from "../../service/users";

// profilepage - get reviews by userid. onclick - open editreview page
// editreviewpage - map placeholder from db
// TODO: retrieve user_id when logged in

export default function ProfilePage({
  user_id = "668943b3237bdcaa6cf59a62",
  setUser,
}) {
  // TODO: flesh out editReview
  // console.log(`user_id is`, user_id);

  const navigate = useNavigate();
  async function handleLogOut() {
    const user = await logOutUser();
    setUser(user);
    navigate("/");
  }

  const [myReviews, setMyReviews] = useState([]);

  // fetch reviews by user_id
  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const reviews = await fetchReviewsByUser(user_id); // Wait for the promise to resolve
        console.log("reviews", reviews);

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

        console.log(`reviewsWithDetails`, reviewsWithDetails);
        setMyReviews(reviewsWithDetails);
      } catch (error) {
        console.error("Error fetching reviews by user:", error);
      }
    }

    fetchUserReviews(); // Call the async function to fetch data
  }, [user_id]); // Add user_id as a dependency

  return (
    <Box w="80vw" h="100vh">
      <Box mt="3" textAlign="center">
        <Card>
          <CardHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius={20}
          >
            <Icon as={FaUserAlt} boxSize={90} color="lightblue" />
            <Text as="b">@mistertamchiak</Text>
            <Text as="u" onClick={handleLogOut}>
              Log Out
            </Text>
          </CardHeader>
        </Card>
      </Box>

      <Card mt="8" textAlign="left" borderRadius={20} p={3}>
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
            <Box key={review._id} h="40px" bg="yellow.200" p={2}>
              <Link to="/editmakan">
                <Text>
                  {review.dish.name} @ {review.place.name}
                </Text>
              </Link>
            </Box>
          ))}
        </VStack>
      </Card>
      <NavBar />
    </Box>
  );
}
