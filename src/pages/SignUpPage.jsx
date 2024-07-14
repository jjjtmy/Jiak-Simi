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
    var formData = {...formState};
    if (!formData.password) {
      return true;
    }
    if (!formData.confirm) {
      return true;
    }
    if (formData.password !== formData.confirm) {
      return true;
    }
    if (formData.password.length < 8) {
      return true;
    }
    return false;
  }

  function hashPassword() {
    var formData = {...formState};
    console.log('hashpassword form data', formData)
    if (formData.password) {
      console.log(formData.password);
      var hash = hashData(formData.password);
      formData.password = hash.hash;
      formData.salt = hash.salt;
      formData.iterations = hash.iterations;
      return formData
    }
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();

      hashPassword();
      
      const formData = { ...formState };
      console.log('handlesubmit formData', formData);
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
