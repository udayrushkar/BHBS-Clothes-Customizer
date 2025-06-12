import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UniformOrderForm from "./components/UniformOrderForm";

function App() {
  return (
    <>
      <div className="w-full h-full grid grid-cols-12 ">
        <div className="col-span-12 bg-white px-4 py-4">
          <UniformOrderForm />
        </div>
      </div>
    </>
  );
}

export default App;
