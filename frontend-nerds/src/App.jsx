import "./App.css";
import axios from "axios";
import Services from "./pages/Services";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Services />
    </>
  );
}

export default App;
