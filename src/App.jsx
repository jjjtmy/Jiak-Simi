import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, Button } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddReviewPage from "./pages/AddReviewPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <main className="App">
        <Button onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? "Logout" : "Login"}
        </Button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/myprofile"
            element={
              loggedIn ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addmakan"
            element={
              loggedIn ? <AddReviewPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </ChakraProvider>
  );
}

export default App;
