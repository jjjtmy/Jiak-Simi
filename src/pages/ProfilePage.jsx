import {
  Box,
  Card,
  CardHeader,
  Text,
  Icon,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";

export default function ProfilePage() {
  // TODO: flesh out handleLogOut and editReview
  const handleLogOut = () => {};
  const editReview = () => {};

  return (
    <Box w="80vw" h="100vh">
      <Box mt="3" textAlign="center">
        <Card>
          <CardHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius={20}
          >
            <Icon as={FaUserAlt} boxSize={90} color="lightblue" />
            <Text as="b">@mistertamchiak</Text>
            <Text as="u" onClick={handleLogOut}>
              Log Out
            </Text>
          </CardHeader>
        </Card>
      </Box>
      <Card mt="8" textAlign="left" borderRadius={20} p={3}>
        <Text as="b" fontSize="2xl" align="left">
          My Makan
        </Text>
        <VStack
          mt={3}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
          textAlign="left"
        >
          <Box h="40px" bg="yellow.200" p={2} onClick={editReview}>
            My Review 1
          </Box>
          <Box h="40px" bg="yellow.200" p={2} onClick={editReview}>
            My Review 2
          </Box>
          <Box h="40px" bg="yellow.200" p={2} onClick={editReview}>
            My Review 3
          </Box>
        </VStack>
      </Card>
    </Box>
    // TODO: add navbar
  );
}
