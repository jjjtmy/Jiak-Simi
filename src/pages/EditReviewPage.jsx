import { useState, useEffect } from "react";
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
import { updateReview, getReview } from "../../service/reviews";
import { getToken } from "../../util/security";
import { getDish } from "../../service/dishes";
import { getPlace } from "../../service/places";

//TODO: pass review_id as ?prop from profile page/ render as url params
export default function EditReviewPage({ _id = "66910e21706323a791caf41e" }) {
  //retrieve review by review_id and compile into makanToEdit
  const [makanToEdit, setMakanToEdit] = useState({});
  useEffect(() => {
    async function fetchReviewByID() {
      try {
        const reviewToEdit = await getReview(_id);
        // console.log('reviewToEdit', reviewToEdit);
        const dishToEdit = await getDish(reviewToEdit.dish_id);
        // console.log('dishToEdit', dishToEdit);
        const placeToEdit = await getPlace(
          dishToEdit.place_id,
          reviewToEdit.dish_id,
        );
        // console.log('placeToEdit', placeToEdit);

        const makanToEdit = {
          review: reviewToEdit,
          dish: dishToEdit,
          place: placeToEdit,
        };
        // console.log('makanToEdit', makanToEdit);
        setMakanToEdit(makanToEdit); // Return the fetched data
      } catch (error) {
        console.error("Error fetching review by ID:", error);
        throw error; // Throw the error to be caught by the caller
      }
    }

    //ensure this useffect runs first
    const executeFetch = async () => {
      try {
        await fetchReviewByID();
        // Any subsequent code that should run after the fetchReviewByID completes can go here
      } catch (error) {
        console.error("Error in executeFetch:", error);
        // Handle error, e.g., show error message to user
      }
    };

    executeFetch();
  }, []);

  // update originalPlaceState and originalFormState
  const originalPlaceState = {
    place: makanToEdit.place?.name || "",
    cuisine: makanToEdit.place?.cuisine || "",
  };
  const originalFormState = {
    comments: makanToEdit.review?.comment || "",
    name: makanToEdit.dish?.name || "",
    price: makanToEdit.review?.price || "",
    rating: makanToEdit.review?.rating || "",
  };
  // console.log('originalPlaceState',originalPlaceState)
  // console.log('originalFormState', originalFormState)

  const [formCount, setFormCount] = useState(1);
  const [placeState, setPlaceState] = useState({ originalPlaceState });
  const [formState, setFormState] = useState([originalFormState]);

  function handleChange(evt) {
    setPlaceState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    console.log(formState);
  }

  async function handleUpdate(evt) {
    try {
      evt.preventDefault();
      // pass user token to back
      const token = getToken();
      // todo: IF TOKEN IS NULL, redirect user to login (if not there will be a null userID review entry)
      console.log("token", token);
      //make form State and array
      console.log(`formState`, formState);
      let updatedFormData = [];
      updatedFormData.push(formState);
      console.log(`updatedFormData`, updatedFormData);
      console.log(`updated form state`, formState);
      // define the structure of the data to be passed
      const updatedReview = {
        token: token,
        place: originalPlaceState.place,
        cuisine: originalPlaceState.cuisine,
        dishes: {
          comments: formState[0].comments,
          name: originalFormState.name,
          price: formState[0].price,
          rating: formState.rating,
        },
      };

      console.log(`updatedReview`, updatedReview);
      // send it to service/api
      const res = await updateReview(updatedReview);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  // function addMakanForm() {
  //   setFormCount((prevFormCount) => prevFormCount + 1);
  //   setFormState((prevState) => [...prevState,{}]);
  // }

  function setRating(rating) {
    setFormState((prevState) => {
      const newState = { ...prevState, rating: rating };
      return newState;
    });
  }

  return (
    <>
      <FormControl as="form" onSubmit={handleUpdate}>
        <HStack>
          <VStack w="50%">
            <FormLabel>Place</FormLabel>
            <Input
              name="place"
              placeholder={originalPlaceState.place}
              onChange={handleChange}
              readOnly
            />
          </VStack>
          <VStack>
            <FormLabel>Cuisine</FormLabel>
            <Select
              name="cuisine"
              placeholder={originalPlaceState.cuisine}
              onChange={handleChange}
              disabled
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
            setRating={(rating) => setRating(rating)}
            originalFormState={{ originalFormState }}
          />
        ))}
        <Button type="submit">Update</Button>
      </FormControl>

      <footer>
        {/* <Button onClick={addMakanForm}>Add Form</Button>
         */}
      </footer>
    </>
  );
}
