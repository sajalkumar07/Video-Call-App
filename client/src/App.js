import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/lobby";

function App() {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<LobbyScreen />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
