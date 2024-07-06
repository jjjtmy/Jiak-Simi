import { Image, Button } from "@chakra-ui/react";
import myImg from "../assets/jiaksimi1.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <div>
      <Image boxSize="100px" margin="0 auto 10px" src={myImg}></Image>
      <Link to="/cuisine">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          colorScheme="orange"
        >
          Search By Cuisine
        </Button>
      </Link>
    </div>
  );
}
