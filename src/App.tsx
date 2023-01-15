// libraries
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// components
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Version_ii } from './pages/Version_ii';
//----------------------------------------------------------------

// Component
function App() {
  return (
    <BrowserRouter basename="/text-pokemon-game" >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/version-ii" element={<Version_ii />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
