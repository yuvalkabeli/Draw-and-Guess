import Welcome from "./Components/Welcome.js";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/style.scss"
import Guessing from "./Components/Guessing.js";
import Drawing from "./Components/Drawing.js";
import Waiting from "./Components/Waiting.js";
import WordChoose from "./Components/WordChoose.js";
const server = "http://localhost:5000/";
const socket = io.connect(server);
export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome socket={socket} />} />
          <Route path="/word-choose" element={<WordChoose socket={socket} />} />
          <Route path="/waiting" element={<Waiting socket={socket} />} />
          <Route path="/drawing" element={<Drawing socket={socket} />} />
          <Route path="/guessing" element={<Guessing socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}