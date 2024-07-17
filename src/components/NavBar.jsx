import { Link, useLocation } from "react-router-dom";
import { Heading, Box, Text, Flex, Icon, Image } from "@chakra-ui/react";
import { BiCommentAdd } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import myImg from "../assets/jiaksimi1.png";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getPageName = (path) => {
    switch (path) {
      case "/cuisine":
        return "Cuisine";
      case "/results/:cuisine":
        return "Results";
      case "/dishes/:dish_id":
        return "Dish Details";
      case "/login":
        return "Login";
      case "/signup":
        return "Sign Up";
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
    <Flex
      borderBottom="1px solid #eee"
      width="100%"
      height={isHomePage ? "105px" : "70px"}
    >
      <Flex as="nav" style={styles.navbar}>
        <Box style={styles.pageInfo}>
          {isHomePage ? (
            <Image boxSize="70px" margin="12px" src={myImg}></Image>
          ) : (
            <Flex style={styles.title}>
              <Link to="/">
                <Icon as={IoIosArrowBack} boxSize={9} color="orange" />
              </Link>
              <Heading size="lg" mt={1}>
                {getPageName(location.pathname)}
              </Heading>
            </Flex>
          )}
        </Box>

        <Flex style={styles.links}>
          <Link to="/addmakan">
            <Icon as={BiCommentAdd} boxSize={8} color="grey" />
          </Link>
          <Link to="/myprofile">
            <Icon as={FaUserAlt} boxSize={7} color="grey" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

const styles = {
  navbar: {
    justifyContent: "space-between",
    top: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
    padding: "10px",
  },
  pageInfo: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: "10px",
    flex: 1,
    textAlign: "left",
  },
  title: {
    position: "absolute",
    padding: "5px",
    whiteSpace: "nowrap",
  },
  links: {
    position: "absolute",
    padding: "5px",
    right: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default NavBar;
