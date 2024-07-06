import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import FoodCard from "../components/FoodCard";

// Dummy data for demonstration - TODO: replace with card content
const fetchData = (page) => {
  return new Array(10).fill(null).map((_, index) => ({
    id: page * 10 + index + 1,
    title: `Card ${page * 10 + index + 1}`,
  }));
};

export default function LazyLoadGrid() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  //when inView or pages changes, update cards and page
  useEffect(() => {
    if (inView) {
      const newCards = fetchData(page);
      setCards((prevCards) => [...prevCards, ...newCards]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, page]);

  return (
    <>
      <Header />
      <div style={styles.grid}>
        {cards.map((card) => (
          <FoodCard key={card.id} title={card.title} style={styles.card} />
        ))}
        <div ref={ref} style={styles.loader}>
          Loading more cards...
        </div>
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
  loader: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "20px",
  },
};
