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

  return (
    <>
      <Flex direction="column">
        <VStack>
          <FormLabel m="0">Dish name</FormLabel>
          <Input
            name="name"
            placeholder={
              originalFormState
                ? originalFormState.originalFormState.name
                : "e.g. spaghetti"
            }
            value={
              originalFormState
                ? originalFormState.name
                : formInput.formState[index]?.name || ""
            }
            onChange={handleChange}
            readOnly={!!originalFormState}
          />

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
                      placeholder={
                        originalFormState
                          ? originalFormState.originalFormState.price
                          : "e.g. 5"
                      }
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
            placeholder={
              originalFormState
                ? originalFormState.originalFormState.comments
                : "e.g. so delicious"
            }
            onChange={handleChange}
          />
        </VStack>
      </Flex>
    </>
  );
}
