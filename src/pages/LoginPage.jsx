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
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImg from "../assets/jiaksimi1.png";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { getSaltAndIterations, loginUser } from "../../service/users";

export default function LoginPage({ setUser, user }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [formState, setFormState] = useState({});

  function handleChange(evt) {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleLogin(evt) {
    try {
      evt.preventDefault();

      // Create a copy of formState
      const formData = { ...formState };
      console.log(formData);
      // get user salt and iterations from database
      const saltAndIterations = await getSaltAndIterations(formData.username);
      const { salt, iterations } = saltAndIterations.data;
      console.log(saltAndIterations);
      console.log(saltAndIterations.data);
      console.log(salt, iterations);
      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        salt,
        iterations,
      );
      formData.password = hashedPassword;
      console.log(formData);
      const token = await loginUser(formData);
      // Store token in localStorage
      storeToken(token);
      setUser(token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

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
            <FormControl as="form" onSubmit={handleLogin}>
              <Input
                name="username"
                id="username"
                placeholder="Username"
                type="text"
                onChange={handleChange}
              />
              <InputGroup size="md" mt="4">
                <Input
                  name="password"
                  id="password"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShow}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button mt="12" w="full" colorScheme="blue" type="submit">
                Login
              </Button>
            </FormControl>
          </CardBody>
          <CardFooter>
            <Text mb="4" alignContent="left">
              Not a member?
              <Link to="/signup" color="blue">
                {" "}
                Sign up
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </Box>
    </main>
  );
}
