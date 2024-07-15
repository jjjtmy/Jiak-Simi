import { useState } from "react";
import MakanForm from "../components/MakanForm";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { createReview } from "../../service/reviews";
import { getToken } from "../../util/security";
import { useNavigate } from "react-router-dom";

export default function AddReviewPage() {
  const navigate = useNavigate();
  const [formCount, setFormCount] = useState(1);
  const [placeState, setPlaceState] = useState({});
  const [formState, setFormState] = useState([{}]);

  function handleChange(evt) {
    setPlaceState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    console.log(formState);
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();

      // pass user token to back
      const token = getToken();
      // todo: IF TOKEN IS NULL, redirect user to login (if not there will be a null userID review entry)
      console.log("token", token);
      console.log(placeState);
      // define the structure of the data to be passed
      const newReview = {
        token: token,
        place: placeState.place,
        cuisine: placeState.cuisine,
        dishes: [...formState],
      };

      console.log(newReview);
      // send it to service/api
      const res = await createReview(newReview);
      console.log(res);
      navigate(`/myprofile`);
    } catch (e) {
      console.log(e);
    }
  }

  function addMakanForm() {
    setFormCount((prevFormCount) => prevFormCount + 1);
    setFormState((prevState) => [...prevState, {}]);
  }

  function setRating(rating, index) {
    setFormState((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        rating: rating,
      };
      return newState;
    });
  }

  return (
    <>
      <FormControl as="form" onSubmit={handleSubmit}>
        <HStack>
          <VStack w="50%">
            <FormLabel>Place</FormLabel>
            <Input
              name="place"
              placeholder="Place Name"
              onChange={handleChange}
            />
          </VStack>
          <VStack>
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
          </VStack>
        </HStack>

        {Array.from({ length: formCount }).map((_, index) => (
          <MakanForm
            key={index}
            index={index}
            formInput={{ formState, setFormState }}
            setRating={(rating) => setRating(rating, index)}
          />
        ))}
        <Button type="submit">Submit</Button>
      </FormControl>

      <footer>
        <Button onClick={addMakanForm}>Add Form</Button>
      </footer>
    </>
  );
}
