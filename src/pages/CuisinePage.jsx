import {
  Box,
  Button,
  Icon,
  Heading,
  Text,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function CuisinePage() {
  const [selectedCuisine, setSelectedCuisine] = useState(""); // State to track selected cuisine

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
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
      {/* 
      <VStack spacing={4} align="flex-start" p={4} style={styles.list} w="100%"> */}
      {/* <Text
          width="100%"
          border="1px"
          borderRadius="5px"
          borderColor="orange"
          bg="lightyellow"
          p={1}
          textAlign="left"
        > */}
      {/* Local Food
        </Text>
        <Text>Japanese</Text>
        <Text>Korean</Text>
        <Text>Italian</Text>
        <Text>Fast Food</Text>
      </VStack> */}

      <Stack>
        <Text style={styles.listItem}>
          <Radio
            size="md"
            name="1"
            colorScheme="orange"
            isChecked={selectedCuisine === "Local Food"}
            onChange={() => handleCuisineSelect("Local Food")}
          >
            Local Food
          </Radio>
        </Text>
        <Text style={styles.listItem}>
          <Radio
            size="md"
            name="1"
            colorScheme="orange"
            isChecked={selectedCuisine === "Japanese"}
            onChange={() => handleCuisineSelect("Japanese")}
          >
            Japanese
          </Radio>
        </Text>
        <Text style={styles.listItem}>
          <Radio size="md" name="1" colorScheme="orange">
            Korean
          </Radio>
        </Text>
        <Text style={styles.listItem}>
          <Radio size="md" name="1" colorScheme="orange">
            Italian
          </Radio>
        </Text>
        <Text style={styles.listItem}>
          <Radio size="md" name="1" colorScheme="orange">
            Greek
          </Radio>
        </Text>
      </Stack>

      <Button w="full" colorScheme="orange" mt={5}>
        Next
      </Button>
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
  listItem: {
    width: "80vw",
    border: "1px",
    borderRadius: "5px",
    borderColor: "orange",
    background: "lightyellow",
    padding: "1px",
    textAlign: "left",
  },
};

// TODO: handleSelectCuisine = () => {change colour and unclick previous option};
// TODO:handleClickNext = () => {direct to };
