import { Box, Icon, Heading, Text, Stack, Radio } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function CuisinePage() {
  const [selectedCuisine, setSelectedCuisine] = useState(""); // State to track selected cuisine

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const RadioCard = ({ cuisine, isSelected, onSelect }) => {
    return (
      <Box
        bg={isSelected ? "orange" : "lightyellow"}
        p={2}
        borderRadius="md"
        border="1px"
        borderColor="orange"
        textAlign="left"
        onClick={() => onSelect(cuisine)}
      >
        <Radio size="md" colorScheme="orange" isChecked={isSelected}>
          {cuisine}
        </Radio>
      </Box>
    );
  };

  return (
    <div style={styles.page}>
      <Box display="flex" flexDirection="column" alignItems="flex-start" p={4}>
        <Link to="/home">
          <Icon as={IoIosArrowBack} boxSize={9} color="orange" />
        </Link>
        <Heading as="h1" size="lg" mt={4}>
          Cuisine
        </Heading>
        <Text as="h3" fontSize="lg">
          One only pls
        </Text>
      </Box>

      <Stack spacing={2} width="90%" ml="5%" mt={4}>
        <RadioCard
          cuisine="Local Food"
          isSelected={selectedCuisine === "Local Food"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Japanese"
          isSelected={selectedCuisine === "Japanese"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Korean"
          isSelected={selectedCuisine === "Korean"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Italian"
          isSelected={selectedCuisine === "Italian"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Greek"
          isSelected={selectedCuisine === "Greek"}
          onSelect={handleCuisineSelect}
        />
      </Stack>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "80vw",
  },
};
