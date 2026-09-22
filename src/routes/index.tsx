import { Route, Routes } from "react-router-dom";
import Home from "../screens/home";
import Details from "../screens/details";

const CustomRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
};

export default CustomRoute;
