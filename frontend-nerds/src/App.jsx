import "./App.css";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className="text-4xl bg-blue-800">Hello</div>
    </>
  );
}

export default App;
