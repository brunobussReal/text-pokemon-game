import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Version_ii } from './pages/Version_ii';
function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/version-ii" element={<Version_ii />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
