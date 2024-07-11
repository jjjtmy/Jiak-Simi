import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddReviewPage from "./pages/AddReviewPage";
  
import ProfilePage from "./pages/ProfilePage";

import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
      <ChakraProvider>
        <main className="App">
          <Routes>
            <Route path="/newmakan" element={<AddReviewPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Routes>
        </main>
      </ChakraProvider>
    </>
  );
}

export default App;
