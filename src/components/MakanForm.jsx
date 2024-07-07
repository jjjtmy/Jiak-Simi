import {
    Button,
  Flex,
  FormControl,
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

export default function MakanForm() {
  const [rating, setRating] = useState(null);
  const [formState, setFormState] = useState(null);

  const handleChange = (evt) => {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    console.log(formState);
  };

  async function handleSubmit(evt) {
    try { 
        evt.preventDefault();
        setFormState((prevState) => ({
            ...prevState,
            "rating": rating,
          }));
        console.log(rating, formState);
      
      } catch(e) {
        console.log(e);
      }
}

  return (
    <>
      <Flex direction="column">
        <FormControl as="form" onSubmit={handleSubmit}>
          <VStack>
            <FormLabel m="0">Dish name</FormLabel>
            <Input name="dish" onChange={handleChange} />

            <HStack>
              <VStack>
                <HStack>
                  {/* {Price Label} */}
                  <VStack align="stretch">
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
                    <FormLabel m="0">Rating</FormLabel>
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
            <Button type='submit'>Submit</Button>
          </VStack>
        </FormControl>
      </Flex>
    </>
  );
}
