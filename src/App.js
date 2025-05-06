import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Bvrtgeh from "./Pages/Bvrtgeh";
import Nevtreh from "./Pages/Nevtreh";
import Calendar from "./Pages/Calendar";
import AnimalSelector from "./Components/AnimalSelector";
import Note from "./Pages/Note";
import WeeklyPlan from "./Components/WeeklyPlan";
import MonthlyPlan from "./Components/MonthlyPlan";
import PersonalNotes from "./Pages/PersonalNotes";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home хуудсыг үндсэн хуудас болгосон */}
          <Route path="*" element={<NotFound />} />
          <Route path="/bvrtguleh" element={<Bvrtgeh />} />
          <Route path="/nevtreh" element={<Nevtreh />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Nevtreh />} /> {/* Default page */}
          <Route path="/" element={<AnimalSelector/>} />{}
          <Route path="/animalselector" element={<AnimalSelector/>} />{}
          <Route path="/" element={<Note/>} />{}
          <Route path="/weekly-plan" element={<WeeklyPlan />} />
          <Route path="/note" element={<Note />} />
          <Route path="/monthly-plan" element={<MonthlyPlan />} />
          <Route path="/personal-notes" element={<PersonalNotes />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
