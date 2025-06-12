import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UniformOrderForm from "./components/UniformOrderForm";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
     <div className="w-full h-full flex">
  {/* Sidebar - fixed width */}
  <div className="w-[300px] bg-white ">
    <Sidebar />
  </div>

  {/* Main content - takes rest of the width */}
  <div className="flex bg-white ">
    <UniformOrderForm />
  </div>
</div>

    </>
  );
}

export default App;
