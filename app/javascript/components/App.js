import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Projects from "./Projects/Projects";
import Project from "./Project/Project";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects/:slug" element={<Project />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App