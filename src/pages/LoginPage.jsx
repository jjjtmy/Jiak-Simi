import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Input,
  InputRightElement,
  InputGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import { useState, setShow } from "react";
import { Link } from "react-router-dom";
import myImg from "../assets/jiaksimi1.png";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <main>
      <Box mt="24">
        <Card align="center">
          <CardHeader>
            <Image
              display="absolute"
              justifyContent="center"
              boxSize="100px"
              src={myImg}
            ></Image>
          </CardHeader>

          <CardBody>
            <Input placeholder="Username" />
            <InputGroup size="md" mt="4">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </CardBody>
          <CardFooter>
            {/* TODO: Need to handle submit */}
            <Button w="full" colorScheme="blue">
              Login
            </Button>
          </CardFooter>
          <Text mb="4" alignContent="left">
            Not a member?
            <Link to="/signup" color="blue">
              {" "}
              Sign up
            </Link>
          </Text>
        </Card>
      </Box>
    </main>
  );
}
