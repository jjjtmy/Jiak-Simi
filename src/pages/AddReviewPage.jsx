import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MakanForm from "../components/MakanForm";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  FormErrorMessage,
  Box,
  Container,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { createReview } from "../../service/reviews";
import { getToken } from "../../util/security";

export default function AddReviewPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState([{}]);
  const [placeState, setPlaceState] = useState({});
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const addDishColor = useColorModeValue("blue.500", "blue.300");

  function handleChange(evt) {
    setPlaceState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const newReview = {
        token: token,
        place: placeState.place,
        cuisine: placeState.cuisine,
        dishes: formState,
      };
      const res = await createReview(newReview);
      navigate(`/myprofile`);
    } catch (error) {
      console.error("Add Makan error:", error);
      setError("Sorry, cannot submit your makan. Please try again.");
    }
  }
  console.log(formState);

  function addMakanForm() {
    setFormState((prevState) => [{}, ...prevState]);
  }

  function deleteMakanForm(index) {
    setFormState((prevState) => prevState.filter((_, i) => i !== index));
  }

  function updateMakanForm(index, newData) {
    setFormState((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ...newData };
      return newState;
    });
  }

  return (
      <Container maxW="container.md" minHeight="100vh" bg={bgColor} pt={4}>
        <FormControl as="form" onSubmit={handleSubmit} isInvalid={error}>
          <VStack spacing={4} align="stretch" mb={6}>
            <FormLabel>Place</FormLabel>
            <Input
              name="place"
              placeholder="Place Name"
              onChange={handleChange}
            />
            <FormLabel>Cuisine</FormLabel>
            <Select
              name="cuisine"
              placeholder="Cuisine"
              onChange={handleChange}
            >
              <option value="Local Food">Local Food</option>
              <option value="Korean">Korean</option>
              <option value="Japanese">Japanese</option>
              <option value="Italian">Italian</option>
              <option value="Fast Food">Fast Food</option>
            </Select>

            <Text
              as="button"
              type="button"
              onClick={addMakanForm}
              color={addDishColor}
              fontWeight="medium"
              textDecoration="underline"
              _hover={{ textDecoration: "none" }}
              alignSelf="flex-start"
              mt={2}
            >
              + Add Dish
            </Text>
          </VStack>

          <VStack spacing={6} align="stretch" mb={6}>
            {formState.map((dish, index) => (
              <Box
                key={index}
                bg={cardBgColor}
                p={4}
                borderRadius="md"
                shadow="md"
              >
                <MakanForm
                  dish={dish}
                  updateForm={(newData) => updateMakanForm(index, newData)}
                  onDelete={() => deleteMakanForm(index)}
                />
              </Box>
            ))}
          </VStack>

          {error && (
            <FormErrorMessage mt={2} color="red.500">
              {error}
            </FormErrorMessage>
          )}
          <Button type="submit" bgColor="#9c3434" color="white" width="full" mb={4}>
            Submit Review
          </Button>
        </FormControl>
      </Container>
  );
}
