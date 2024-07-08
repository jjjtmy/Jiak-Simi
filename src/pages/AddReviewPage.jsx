import { useState } from "react";
import MakanForm from "../components/MakanForm";
import { Button, FormControl } from "@chakra-ui/react";

export default function AddReviewPage() {
  const [formCount, setFormCount] = useState(1);
  const [formState, setFormState] = useState([{}]);

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      console.log(formState);
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
        {Array.from({ length: formCount }).map((_, index) => (
          <MakanForm
            key={index}
            index={index}
            formInput={{ formState, setFormState }}
            setRating={(rating) => setRating(rating, index)}
          />
        ))}
      </FormControl>

      <footer>
        <Button onClick={addMakanForm}>Add Form</Button>
        <Button type="submit">Submit</Button>
      </footer>
    </>
  );
}