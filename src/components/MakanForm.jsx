import {
  Flex,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import StarRating from "./StarRating";
import { useState } from "react";

export default function MakanForm({
  formInput,
  setRating,
  index,
  originalFormState,
}) {
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // set the lifted form state
    formInput.setFormState((prevState) => {
      // Ensure prevState is an array
      const reviewState = Array.isArray(prevState) ? [...prevState] : [];
      console.log("reviewstate", reviewState);
      // target the current makan form using the index
      reviewState[index] = {
        // take the contents of this particular form and copy it
        ...reviewState[index],
        // change any new values
        [name]: value,
      };
      console.log(`reviewState`, reviewState);
      // return the whole array of objects
      return reviewState;
    });
  };

  const handleFormChange = (newFormState) => {
    formInput.setFormState((prevState) => {
      const reviewState = Array.isArray(prevState) ? [...prevState] : [];
      reviewState[index] = {
        ...reviewState[index],
        ...newFormState,
      };
      return reviewState;
    });
  };

  return (
    <>
      <Flex direction="column" mt={3} lineHeight={2}>
        <VStack>
          <FormLabel m="0">Dish name</FormLabel>
          <Input
            name="name"
            placeholder={
              originalFormState ? originalFormState.name : "e.g. spaghetti"
            }
            value={
              originalFormState
                ? originalFormState.name
                : formInput.formState[index]?.name || ""
            }
            onChange={handleChange}
            readOnly={!!originalFormState}
          />

          <HStack align="stretch" width="100%" ml={0} spacing={7}>
            <VStack align="left">
              <FormLabel m="0">Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  $
                </InputLeftElement>
                <Input
                  name="price"
                  type="number"
                  placeholder={
                    originalFormState ? originalFormState.price : "e.g. 5"
                  }
                  onChange={handleChange}
                />
              </InputGroup>
            </VStack>
            <VStack align="stretch">
              <FormLabel mb={1}>Rating</FormLabel>
              <StarRating
                name="rating"
                setRating={(rating) => handleFormChange({ rating })}
              />
            </VStack>
          </HStack>

          <FormLabel m="0">Comment</FormLabel>
          <Textarea
            name="comments"
            placeholder={
              originalFormState
                ? originalFormState.comment
                : "e.g. so delicious"
            }
            onChange={handleChange}
          />
        </VStack>
      </Flex>
    </>
  );
}
