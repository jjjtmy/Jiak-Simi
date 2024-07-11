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

export default function AddReviewPage() {
  const [formCount, setFormCount] = useState(1);
  const [reviewState, setReviewState] = useState({});
  const [formState, setFormState] = useState([{}]);

  function handleChange(evt) {
    setReviewState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    console.log(formState)
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // add in places and cuisine to the final state
      setFormState((prevState) => ({
        ...prevState,
        ...reviewState,
      }));
      // make a copy of the state
      const review = {...formState}
      // send it to service/api
      console.log(review)
      const res = await createReview(review)
      console.log(res)
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
