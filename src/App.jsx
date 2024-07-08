import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <ChakraProvider>
        <main className="App">
          <Routes>
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
