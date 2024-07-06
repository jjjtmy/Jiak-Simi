import { Box, Image, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TiThumbsUp } from "react-icons/ti";

//TODO: replace with api to call place model in database
export default function FoodCard({ image, name }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      <Image src={image} alt={name} objectFit="cover" h="120px" w="100%" />

      <Box h="90px">
        <Box p="1">
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
