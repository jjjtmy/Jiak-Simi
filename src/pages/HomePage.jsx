import { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import FoodCard from "../components/FoodCard";
import { fetchAllDishesIDs } from "../../service/dishes"

//create resultpage/:cuisine - to filter by cusine below based on dishes 
//cuisinepage - handle onclick to lead to resultpage/:cuisine 


export default function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allCards = await fetchAllDishesIDs(); // Wait for the promise to resolve
        console.log("allCards", allCards);
        setCards(allCards); // Update state with the fetched array of dish IDs
      } catch (error) {
        console.error("Error fetching dish IDs:", error);
        // Handle errors as needed
      }
    }

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this effect runs only once on component mount


  return (
    <>
      <Header />
      <div style={styles.grid}>
        {cards.map((card) => (
          <FoodCard key={card._id} dish_id={card._id} style={styles.card} /> //pass dish_id as prop to each FoodCard
        ))}
      </div>
      <NavBar />
    </>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    padding: "16px",
    width: "90vw",
    height: "100",
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
