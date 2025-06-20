import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@radix-ui/react-collapsible";
  import { ChevronDown, ChevronUp, X } from "lucide-react";
  import React, { useState } from "react";
  
  export default function MediaandTerms() {
    const [isOpen, setIsOpen] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
    // 🟢 Handle drag over
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent default to allow drop
    };
  
    // 🟢 Handle drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type)
      );
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    };
  
    // 🟢 Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      setUploadedFiles((prev) => [...prev, ...selectedFiles]);
    };
  
    // 🟢 Remove file
    const removeFile = (index: number) => {
      const updated = [...uploadedFiles];
      updated.splice(index, 1);
      setUploadedFiles(updated);
    };
  
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4  bg-[#dedede] rounded-lg shadow-sm border mb-6">
            <h2 className="text-lg font-medium text-gray-900">Media</h2>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>
  
        <CollapsibleContent className="px-4 pb-4">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Upload Area */}
              <div
                className={`${
                  uploadedFiles.length === 0
                    ? "md:col-span-4"
                    : uploadedFiles.length === 1
                    ? "md:col-span-3"
                    : uploadedFiles.length === 2
                    ? "md:col-span-2"
                    : "md:col-span-1"
                }`}
              >
                <div
                  className="border-2 border-dashed border-black rounded-lg p-8 text-center bg-white hover:border-gray-600 transition-colors h-full flex items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drag file here
                        </p>
                        <p className="text-sm text-gray-500">
                          Allowed file types : JPG, PNG, PDF
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
  
              {/* Render Uploaded Files */}
              {uploadedFiles.map((file, index) => (
                <div key={index} className="md:col-span-1">
                  <div className="border-2 border-dashed border-black rounded-lg p-4 h-full relative">
                    {file.type.includes("image") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-contain rounded"
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-sm text-gray-500">
                        {file.name}
                      </div>
                    )}
  
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Terms and Conditions */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms1"
                className="mt-1 w-4 h-4 border-2 border-black rounded"
              />
              <label
                htmlFor="terms1"
                className="text-sm text-gray-900 leading-relaxed"
              >
                I Confirmed as a Facility Owner that all the information I
                provided is correct and I am obligated for it.
              </label>
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms2"
                className="mt-1 w-4 h-4 border-2 border-black rounded"
              />
              <label
                htmlFor="terms2"
                className="text-sm text-gray-900 leading-relaxed"
              >
                if the place is rented,you are obligated to pay commission charges to salwa.
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  