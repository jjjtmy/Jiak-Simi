import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MakanForm from "../components/MakanForm";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  FormErrorMessage,
  useColorModeValue,
  Box,
  IconButton,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { updateReview, getReview } from "../../service/reviews";
import { getToken } from "../../util/security";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function EditReviewPage() {
  const { review_id } = useParams();
  const navigate = useNavigate();

  const [makanToEdit, setMakanToEdit] = useState(null);
  const [formState, setFormState] = useState({});
  const [originalPlaceState, setOriginalPlaceState] = useState({});
  const [originalFormState, setOriginalFormState] = useState({});
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  //retrieve review by review_id and compile into makanToEdit
  useEffect(() => {
    async function fetchReviewByID() {
      try {
        console.log(review_id);
        const reviewToEdit = await getReview(review_id);
        // console.log("reviewToEdit", reviewToEdit);
        const dishToEdit = await getDish(reviewToEdit.dish_id);
        // console.log('dishToEdit', dishToEdit);
        const placeToEdit = await getPlace(
          dishToEdit.place_id,
          reviewToEdit.dish_id
        );
        // console.log('placeToEdit', placeToEdit);

        const makanToEdit = {
          review: reviewToEdit,
          dish: dishToEdit,
          place: placeToEdit,
        };
        console.log("makanToEdit", makanToEdit);
        setMakanToEdit(makanToEdit); // Return the fetched data

        const originalFormState = {
          comments: makanToEdit.review?.comment || "",
          name: makanToEdit.dish?.name || "",
          price: makanToEdit.review?.price || "",
          rating: makanToEdit.review?.rating || "",
        };
        // console.log("originalFormState", originalFormState);
        const originalPlaceState = {
          place: makanToEdit.place?.name || "",
          cuisine: makanToEdit.place?.cuisine || "",
        };
        // console.log('originalPlaceState',originalPlaceState)

        setOriginalPlaceState(originalPlaceState);
        setOriginalFormState(originalFormState);
        setFormState(originalFormState);
      } catch (error) {
        console.error("Error fetching review by ID:", error);
      }
    }

    fetchReviewByID();
  }, []);

  async function handleUpdate(evt) {
    try {
      evt.preventDefault();
      // pass user token to back
      const token = getToken();
      if (!token) {
        navigate("/login"); // Redirect to login if token is null
        return;
      }
      console.log("token", token);
      //make form State and array
      console.log(`formState`, formState);
      const updatedReview = {
        token: token,
        place: originalPlaceState.place,
        cuisine: originalPlaceState.cuisine,
        dishes: {
          comment: formState.comments,
          name: originalFormState.name,
          price: formState.price,
          rating: formState.rating,
        },
      };

      console.log(`updatedReview`, updatedReview);
      // send it to service/api
      const res = await updateReview(updatedReview);
      console.log(res);
      navigate(`/myprofile`);
    } catch (error) {
      console.error("Edit Makan error:", error);
      setError("Sorry cannot edit your makan. Please try again.");
    }
  }

  function updateMakanForm(newdata) {
    setFormState((prevState) => ({
      ...prevState, // Spread previous state
      ...newdata,
    }));
  }

  return (
      <Container maxW="container.md" minHeight="100vh" bg={bgColor} pt={4}>
        <FormControl as="form" onSubmit={handleUpdate} isInvalid={error}>
          <Flex justifyContent="center" gap="8"  mb={6}>
            <Box>
              <FormLabel>Place</FormLabel>
              <Input
                name="place"
                placeholder={originalPlaceState.place}
                readOnly
              />
            </Box>
            <Box>
              <FormLabel>Cuisine</FormLabel>
              <Select
                name="cuisine"
                placeholder={originalPlaceState.cuisine}
                disabled
              >
                <option value="Local Food">Local Food</option>
                <option value="Korean">Korean</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="Fast Food">Fast Food</option>
              </Select>
            </Box>
            </Flex>
          <Box bg={cardBgColor} p={4} borderRadius="md" shadow="md">
            <MakanForm
              dish={originalFormState}
              updateForm={(newData) => updateMakanForm(newData)}
              isEdit={true}
            />
          </Box>
          {error && (
            <FormErrorMessage mt={2} color="red.500">
              {error}
            </FormErrorMessage>
          )}
          <Button type="submit" colorScheme="orange" width="full" mb={4}>
            Update Review
          </Button>
        </FormControl>
      </Container>
  );
}
