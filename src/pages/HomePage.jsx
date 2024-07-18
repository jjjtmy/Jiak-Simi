import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { fetchAllDishesIDs } from "../../service/dishes";
import { Container, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allCards = await fetchAllDishesIDs(); // Wait for the promise to resolve
        // console.log("allCards", allCards);
        setCards(allCards); // Update state with the fetched array of dish IDs
      } catch (error) {
        console.error("Error fetching dish IDs:", error);
        // Handle errors as needed
      }
    }

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <Container w="100vw" d="flex" justifyContent="space-evenly" mt="0">
      <Link to="/cuisine" >
        <Button h="2rem" size="sm" bgColor="#346434" color="white" my='2' w='100%'>
          Search By Cuisine
        </Button>
      </Link>
      <div style={styles.grid}>
        {cards.map((card) => (
          <FoodCard key={card._id} dish_id={card._id} style={styles.card} /> //pass dish_id as prop to each FoodCard
        ))}
      </div>
    </Container>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    padding: "5px",
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "yellow.400",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
