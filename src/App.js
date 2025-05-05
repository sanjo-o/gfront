import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Bvrtgeh from "./Pages/Bvrtgeh";
import Nevtreh from "./Pages/Nevtreh";
//import Calendar from "./Pages/Calendar";
import AnimalSelector from "./Components/AnimalSelector";
import Note from "./Pages/Note";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home хуудсыг үндсэн хуудас болгосон */}
          <Route path="*" element={<NotFound />} />
          <Route path="/bvrtguleh" element={<Bvrtgeh />} />
        <Route path="/nevtreh" element={<Nevtreh />} />
        <Route path="/" element={<Nevtreh />} /> {/* Default page */}
        <Route path="/" element={<AnimalSelector/>} />{}
        <Route path="/animalselector" element={<AnimalSelector/>} />{}
        <Route path="/" element={<Note/>} />{}
        </Routes>
      </Router>
    </div>
  );
}


export default App;
