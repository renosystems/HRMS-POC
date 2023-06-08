import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Utils/Auth/PrivateRoute";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
