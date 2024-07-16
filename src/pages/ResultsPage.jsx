import { Box, Icon, Heading, Link } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import { fetchAllDishesIDs } from "../../service/dishes"; 

export default function CuisinePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const allCards = await fetchAllDishesIDs();
        setCards(allCards);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
        // Handle error state or retry mechanism
      }
    }

    fetchCards();
  }, []);

  return (
    <>
      <div style={styles.page}>
        <Box display="flex" flexDirection="column" alignItems="flex-start" p={4}>
          <Link to="/home">
            <Icon as={IoIosArrowBack} boxSize={9} color="orange" />
          </Link>
          <Heading as="h1" size="lg" mt={4}>
            Cuisine
          </Heading>
        </Box>
        <div style={styles.grid}>
          {cards.map((card) => (
            <FoodCard key={card._id} dish_id={card._id} style={styles.card} />
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    padding: "16px",
    width: "90vw",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
