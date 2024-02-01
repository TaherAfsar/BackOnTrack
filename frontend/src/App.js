import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Home from "./components/Home";
import MapsContainer from "./components/MapsContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />}>

        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/maps" element={<MapsContainer />} />
      </Routes>
    </BrowserRouter>
  );
}
