import { ArrowLeft } from "lucide-react";
import Form1 from "./Form1";
import LeftSide from "./leftside";
import RightSide from "./rightside";



const ArchitectureLayout = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen" style={{width:"1300px"}}>
      <p className="flex items-center text-gray-700 cursor-pointer mb-4">
  <ArrowLeft className="w-5 h-5 mr-2" />
  back to dashboard
</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
      <LeftSide >
        <Form1 />
      </LeftSide>
      <RightSide ></RightSide>
    </div>
    </div>
  );
};

export default ArchitectureLayout;
