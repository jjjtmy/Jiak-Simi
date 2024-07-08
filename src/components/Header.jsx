import { Image, Button } from "@chakra-ui/react";
import myImg from "../assets/jiaksimi1.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Image boxSize="100px" margin="0 auto 10px" src={myImg}></Image>
      <Link to="/cuisine">
        <Button h="1.75rem" size="sm" colorScheme="orange">
          Search By Cuisine
        </Button>
      </Link>
    </div>
  );
}
