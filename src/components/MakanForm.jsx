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

export default function MakanForm({ dish, updateForm, onDelete }) {
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    updateForm({ [name]: value });
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
        <IconButton
          icon={<DeleteIcon color="red"/>}
          size="sm"
          colorScheme="white"
          onClick={onDelete}
          aria-label="Delete Makan Form"
        />
      </HStack>
      <Input
        name="name"
        placeholder="Enter dish name (as menu)"
        value={dish.name || ""}
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
            placeholder="0.00"
            value={dish.price || ""}
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
        placeholder="Enter comments"
        value={dish.comments || ""}
        onChange={handleChange}
        size="sm"
      />
    </VStack>
  );
}