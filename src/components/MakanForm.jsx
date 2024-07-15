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

export default function MakanForm({ formInput, setRating, index }) {
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // set the lifted form state
    formInput.setFormState((prevState) => {
      // spread the current array of objects into the variable
      const reviewState = [...prevState];
      // target the current makan form using the index
      reviewState[index] = {
        // take the contents of this particular form and copy it
        ...reviewState[index],
        // change any new values
        [name]: value,
      };
      console.log(reviewState);
      // return the whole array of objects
      return reviewState;
    });
  };

  return (
    <>
      <Flex direction="column">
        <VStack>
          <FormLabel m="0">Dish name</FormLabel>
          <Input name="name" onChange={handleChange} />

          <HStack>
            <VStack>
              <HStack>
                <VStack align="stretch" mr="4">
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
                      placeholder="Enter amount"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </VStack>
                <VStack align="stretch">
                  <FormLabel mb="0">Rating</FormLabel>
                  <StarRating name="rating" setRating={setRating} />
                </VStack>
              </HStack>
            </VStack>
          </HStack>
          <FormLabel m="0">Comment</FormLabel>
          <Textarea
            name="comments"
            placeholder="Comments here"
            onChange={handleChange}
          />
        </VStack>
      </Flex>
    </>
  );
}
