import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/profile";
import NotFound from "./components/NotFound/NotFound";
import RetailerHomepage from "./pages/RetailerHomepage/RetailerHomepage";
import LandingPage from "./components/LandingPage/LandingPage";
import Sample from "./components/SampleComp/Sample";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Homepage} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/retailer" element={<RetailerHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/testing" element={<Sample />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
