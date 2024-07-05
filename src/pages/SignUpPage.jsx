import { useState } from "react";
import myImg from "../assets/jiaksimi1.png";
import { hashData } from "../../util/security";
import { signUp } from "../../service/users";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Image,
  Container,
  FormControl,
} from "@chakra-ui/react";

export default function SignUpPage() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [formState, setFormState] = useState({});
  const [disable, setDisable] = useState(true);

  function handleChange(evt) {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    setDisable(checkPassword());
  }

  function checkPassword() {
    var currForm = formState;
    if (!currForm.password) {
      return true;
    }
    if (!currForm.confirm) {
      return true;
    }
    if (currForm.password !== currForm.confirm) {
      return true;
    }
    if (currForm.password.length < 8) {
      return true;
    }
    return false;
  }

  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      console.log(currForm.password);
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();

      hashPassword();
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;

      console.log(formData);
      const user = await signUp(formData);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <Container centerContent={true}>
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
            <FormControl as="form" onSubmit={handleSubmit}>
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
              <Button
                mt="8"
                w="full"
                colorScheme="blue"
                disabled={disable}
                type="submit"
              >
                Create Account
              </Button>
            </FormControl>
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}
