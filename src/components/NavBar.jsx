import { Link } from "react-router-dom";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { FaHome, FaUserAlt } from "react-icons/fa";

const NavBar = () => {
  return (
    <Flex as="nav" style={styles.navbar}>
      <Link to="/home" style={styles.link}>
        <Flex direction="column" align="center">
          <Icon as={FaHome} boxSize={9} color="black" />
          <Text>Home</Text>
        </Flex>
      </Link>

      <Link to="/addmakan" style={styles.link}>
        <Flex direction="column" align="center">
          <PlusSquareIcon boxSize={9} color="grey" />
          <Text>Add Makan</Text>
        </Flex>
      </Link>
      <Link to="/myprofile" style={styles.link}>
        <Flex direction="column" align="center">
          <Icon as={FaUserAlt} boxSize={9} color="grey" />
          <Text>My Profile</Text>
        </Flex>
      </Link>
    </Flex>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
    padding: "10px 0",
  },
};

export default NavBar;
