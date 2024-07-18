import { Box, Icon, Heading, Text, Stack, Radio } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function CuisinePage() {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState(""); // State to track selected cuisine

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    navigate(`/results/${cuisine}`);
  };

  const RadioCard = ({ cuisine, isSelected, onSelect }) => {
    return (
      <Box
        bg={isSelected ? "orange" : "lightorange"}
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
      <Stack spacing={2} width="80%" mt={4}>
        <RadioCard
          cuisine="Local Food"
          isSelected={selectedCuisine === "Local Food"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Korean"
          isSelected={selectedCuisine === "Korean"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Japanese"
          isSelected={selectedCuisine === "Japanese"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Italian"
          isSelected={selectedCuisine === "Italian"}
          onSelect={handleCuisineSelect}
        />
        <RadioCard
          cuisine="Fast Food"
          isSelected={selectedCuisine === "Fast Food"}
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
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100vw",
  },
};
