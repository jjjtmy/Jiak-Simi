import { Image, Button } from "@chakra-ui/react";
import myImg from "../assets/jiaksimi1.png";
import { useState } from "react";

export default function Header() {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <div>
      <Image boxSize="100px" margin="10px auto" src={myImg}></Image>
      <Button h="1.75rem" size="sm" onClick={handleClick}>
        {show ? "Hide" : "Search By Cuisine"}
      </Button>
    </div>
  );
}
