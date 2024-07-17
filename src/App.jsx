import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, Button } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CuisinePage from "./pages/CuisinePage";
import AddReviewPage from "./pages/AddReviewPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import EditReviewPage from "./pages/EditReviewPage";
import { getUser } from "../service/users";
import DishDetailsPage from "./pages/DishDetailsPage";
import ResultsPage from "./pages/ResultsPage";
import NavBar from "./components/NavBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    if (user) {
      setUser(getUser());
      setLoggedIn(true);
    }
  }, [user]);

  return (
    <ChakraProvider>
      <main className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cuisine" element={<CuisinePage />}></Route>
          <Route path="/results/:cuisine" element={<ResultsPage />} />
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
            path="/editmakan/:review_id"
            element={loggedIn ? <EditReviewPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </ChakraProvider>
  );
}

export default App;
