import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [user, setUser] = useState(0);

  return (
    <>
      <ChakraProvider>
        <main className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
          </Routes>
        </main>
      </ChakraProvider>
    </>
  );
}

export default App;
