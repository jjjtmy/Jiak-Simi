import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, Button } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddReviewPage from "./pages/AddReviewPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import EditReviewPage from "./pages/EditReviewPage";

import { getUser } from "../service/users";
import DishDetailsPage from "./pages/DishDetailsPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    if (user) {
      setUser(getUser());
    }
  }, [user]);

  return (
    <ChakraProvider>
      <main className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dishes/:dish_id" element={<DishDetailsPage />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginPage setUser={setUser} user={user} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignUpPage setUser={setUser} user={user} />
              )
            }
          />
          <Route
            path="/myprofile"
            element={
              user ? (
                <ProfilePage setUser={setUser} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/addmakan"
            element={
              user ? <AddReviewPage /> : <Navigate to="/login" replace={true} />
            }
          />
          <Route
            path="/editmakan"
            element={loggedIn ? <EditReviewPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </ChakraProvider>
  );
}

export default App;
