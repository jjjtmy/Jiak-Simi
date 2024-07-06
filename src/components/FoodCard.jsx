import { Box, Image, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";

//TODO: replace with api to call place model in database
export default function FoodCard({ image, name, place, price, rating }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      mb={4}
      display="flex"
      flexDirection="column"
    >
      <Image src={image} alt={name} objectFit="cover" h="200px" w="100%" />

      <Box>
        <Box p="6">
          <Box d="flex" alignItems="baseline" fontWeight="bold">
            Food
          </Box>
          <Box d="flex" alignItems="baseline">
            @eatery
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-around" fontWeight="bold">
          <Text>$10</Text>
          <Box display="flex" justifyContent="space-around" fontWeight="bold">
            <Text fontWeight="bold" color="orange">
              4.2
            </Text>
            <Icon as={TiThumbsUp} boxSize={8} color="orange" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
