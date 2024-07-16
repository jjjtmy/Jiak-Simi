import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditReviewPage() {
  const { review_id } = useParams();
  const navigate = useNavigate();

  const [makanToEdit, setMakanToEdit] = useState(null);
  const [formState, setFormState] = useState({});
  const [originalPlaceState, setOriginalPlaceState] = useState({});
  const [originalFormState, setOriginalFormState] = useState({});

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
          comment: makanToEdit.review?.comment || "",
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
      // let updatedFormData = [];
      // updatedFormData.push(formState);
      // console.log(`updatedFormData`, updatedFormData);
      // console.log(`updated form state`, formState);
      // define the structure of the data to be passed
      const updatedReview = {
        token: token,
        place: originalPlaceState.place,
        cuisine: originalPlaceState.cuisine,
        dishes: {
          comment: formState[0].comments,
          name: originalFormState.name,
          price: formState[0].price,
          rating: formState[0].rating,
        },
      };

      console.log(`updatedReview`, updatedReview);
      // send it to service/api
      const res = await updateReview(updatedReview);
      console.log(res);
      navigate(`/myprofile`);
    } catch (e) {
      console.log(e);
    }
  }

  function setRating(rating) {
    setFormState((prevState) => ({
      ...prevState,
      rating: rating,
    }));
  }

  if (!formState || !originalPlaceState) {
    return <p>Loading...</p>;
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
              readOnly
            />
          </VStack>
          <VStack>
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
          </VStack>
        </HStack>
        <MakanForm
          key={0}
          index={0}
          formInput={{ formState, setFormState }}
          setRating={(rating) => setRating(rating)}
          originalFormState={originalFormState}
        />
        <Button type="submit">Update</Button>
      </FormControl>
    </>
  );
}
