import { Link, useLocation } from "react-router-dom";
import { Heading, Flex, Icon, Image } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import myImg from "../assets/jiaksimi1.png";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getPageName = (path) => {
    switch (path) {
      case "/cuisine":
        return "Select Cuisine";
      case "/results/:cuisine":
        return "Results";
      case "/dishes/:dish_id":
        return "Dish Details";
      case "/myprofile":
        return "My Profile";
      case "/addmakan":
        return "Add Review";
      case "/editmakan/:review_id":
        return "Edit Review";
      default:
        return "";
    }
  };

  return (
    <>
      <Flex
        as="nav"
        dir="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        p="2"
        h={{ base: "80px", sm: "88px" }}
        pt={4}
      >
        {isHomePage ? (
          <Image boxSize="56px" margin="2px" src={myImg} ml={3}></Image>
        ) : (
          <>
            <Link to="/">
              <Icon as={IoIosArrowBack} boxSize={9} color="orange" />
            </Link>
            <Heading as="h1" size="lg">
              {getPageName(location.pathname)}
            </Heading>
          </>
        )}
        <Flex gap={{ base: "8px", md: "10px" }} mr="2" alignItems={"center"}>
          <Link to="/addmakan">
            <Icon as={MdAddBox} boxSize={8} color="#9c3434" />
          </Link>
          <Link to="/myprofile">
            <Icon as={FaUserCircle} boxSize={7} color="#9c3434" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
