import React from "react";
import {
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";

export default function MakanForm({ dish, updateForm, onDelete, isEdit }) {
  console.log(`dish`, dish);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(evt);
    let UPDATED = updateForm({ [name]: value });
    console.log(`UPDATED IS`, UPDATED);
  };

  const handleRatingChange = (newRating) => {
    updateForm({ rating: newRating });
  };

  return (
    <VStack spacing={3} align="stretch">
      <HStack justify="space-between">
        <FormLabel fontSize="sm" mb={1}>
          Dish name
        </FormLabel>
        {!isEdit && (
          <IconButton
            icon={<DeleteIcon color="red" />}
            size="sm"
            colorScheme="white"
            onClick={onDelete}
            aria-label="Delete Makan Form"
          />
        )}
      </HStack>
      <Input
        name="name"
        placeholder={dish.name || "Enter dish name. (as menu)}"}
        readOnly={isEdit}
        onChange={handleChange}
        size="sm"
      />

      <HStack spacing={4}>
        <InputGroup size="sm">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1em"
            children="$"
          />
          <Input
            name="price"
            type="number"
            placeholder={dish.price || "e.g. 5"}
            onChange={handleChange}
          />
        </InputGroup>
        <HStack>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              color={star <= (dish.rating || 0) ? "yellow.400" : "gray.300"}
              onClick={() => handleRatingChange(star)}
              cursor="pointer"
            />
          ))}
        </HStack>
      </HStack>

      <Textarea
        name="comments"
        placeholder={dish.comments || "Enter comments"}
        onChange={handleChange}
        size="sm"
      />
    </VStack>
  );
}
