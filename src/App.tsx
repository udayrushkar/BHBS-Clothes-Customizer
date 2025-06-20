import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import UniformOrderForm from "./components/UniformOrderForm";
import ArchitectureLayout from "./components/ArchitectureLayout ";
import WherhouseForm1 from "./components/WherhouseForm1";

function App() {
  return (
    <Router>
      <div className="w-full h-full flex">
        {/* Sidebar - fixed width */}
        <div className="w-[300px] bg-white">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/uniform" />} />
            <Route path="/uniform" element={<UniformOrderForm />} />
            <Route path="/wherhouse1" element={<WherhouseForm1/>}/>
           
            <Route path="/layout" element={<ArchitectureLayout/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
