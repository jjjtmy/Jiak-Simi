import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heading, Box, Flex, Icon, Image, IconButton } from "@chakra-ui/react";
import { BiCommentAdd } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";
import myImg from "../assets/jiaksimi1.png";

const NavBar = () => {
  const navigate = useNavigate();
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
              <IconButton
                icon={<ArrowBackIcon boxSize={7} />}
                onClick={() => navigate(-1)}
              />
              <Heading size="lg" mt={1} ml={3}>
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
    width: "100vw",
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
