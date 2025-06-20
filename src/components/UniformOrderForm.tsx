"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, X, ImageIcon,ArrowLeft  } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CoatDesigner from "./Coat";
import MaleScrub from "./MaleScrub";
import { ColorPicker } from "./ColorPicker";
import FemaleScrub from "./FemaleScrub";
import AddressMapForm from "./AddressForm";
import Basicinformationform from "./Basicinformationform";

const uniformTypes = ["Scrub", "Lab Coat"];
const genders = ["Male", "Female"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
const selectOptions = ["T-Shirt", "Pant"];

export default function UniformOrderForm() {
  const [isOpen, setIsOpen] = useState(true);
  const [orderTitle, setOrderTitle] = useState("Uniform Cloth");
  const [uniformType, setUniformType] = useState("Lab Coat");
  const [gender, setGender] = useState("Male");
  const [size, setSize] = useState("L");
  const [color, setColor] = useState<any>("#DDDDDD");
 const [secondColor, setSecondColor] = useState("#DDDDDD");
  const [showSecondColor, setShowSecondColor] = useState(false);
  const [selectValue, setSelectValue] = useState("T-Shirt");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [logos, setLogos] = useState<(string | null)[]>([null, null, null]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 3);

    console.log("Files dropped:", files.length); // Debug log

    files.forEach((file, i) => {
      console.log(`Processing file ${i}:`, file.name); // Debug log
      handleFileUpload(i, file);
    });
  };

  const handleFileUpload = (index: number, fileEvent: File) => {
    const file = fileEvent;
    console.log(
      `handleFileUpload called with index: ${index}, file: ${file.name}`
    ); // Debug log

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(`File loaded at index ${index}`); // Debug log

        setLogos((prevLogos) => {
          const newLogos = [...prevLogos];
          newLogos[index] = e.target?.result as string;
          console.log(
            "Updated logos array:",
            newLogos.map((logo, i) =>
              logo ? `Index ${i}: loaded` : `Index ${i}: empty`
            )
          );
          return newLogos;
        });

        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = { x: 0, y: 0 };
          return newPositions;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3);
    files.forEach((file, i) => {
      handleFileUpload(i, file);
    });
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 3));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    const newLogos = [...logos];
    newLogos[index] = null;
    setLogos(newLogos);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
       <p className="flex items-center text-gray-700 cursor-pointer mb-4">
  <ArrowLeft className="w-5 h-5 mr-2" />
  back to dashboard
</p>
<Basicinformationform/>
<AddressMapForm/>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
        
          <div className="flex items-center justify-between p-4 bg-[#dedede]  rounded-lg shadow-sm border mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Order Information
            </h2>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="orderTitle"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Order Title
                  </Label>
                  <Input
                    id="orderTitle"
                    value={orderTitle}
                    onChange={(e) => setOrderTitle(e.target.value)}
                    className="w-full h-12 border-2 border-black rounded-md"
                    placeholder="Uniform Cloth"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="uniformType"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Uniform Type
                  </Label>
                  <Select
                    value={uniformType}
                    onValueChange={(e) => {
                      if (e === "Lab Coat") {
                        setColor("#DDDDDD");
                      }
                      setUniformType(e);
                    }}
                  >
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniformTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="size"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Size
                  </Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {uniformType != "Lab Coat" && (
                  <>
                    <div>
                      <Label
                        htmlFor="color"
                        className="text-sm font-medium text-gray-700 mb-2 block"
                      >
                        Color
                      </Label>
                      <ColorPicker color={color} setColor={setColor} />
                    </div>

                    {/* {!showSecondColor && (
                      <Button
                        type="button"
                        onClick={() => setShowSecondColor(true)}
                        className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-md"
                      >
                        + Add Second color
                      </Button>
                    )}

                    {showSecondColor && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="select"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Select
                          </Label>
                          <Select
                            value={selectValue}
                            onValueChange={setSelectValue}
                          >
                            <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                              <SelectValue placeholder="t-shirt" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label
                            htmlFor="secondColor"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Color
                          </Label>
                          <ColorPicker color={color} setColor={setColor} />
                        </div>
                      </div>
                    )} */}
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Uniform Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 pb-2">
              {uniformType === "Lab Coat" ? (
                <CoatDesigner
                  color1={color?.value || "#ffffff"}
                  logos={logos}
                  positions={positions}
                  setPositions={setPositions}
                />
              ) : gender === "Male" ? (
                <MaleScrub
                  color1={color?.value || "#ffffff"}
                  showSecondColor={showSecondColor}
                  secondColor={secondColor}
                  selectValue={selectValue}
                  logos={logos}
                />
              ) : (
                <FemaleScrub
                 color1={color?.value || "#ffffff"}
                  showSecondColor={showSecondColor}
                  secondColor={secondColor}
                  selectValue={selectValue}
                  logos={logos}
                />
              )}
            </div>
          </div>

          {uniformType != "Lab Coat" && (
            <div className="flex  items-end gap-8 mb-6">
              <Button
                type="button"
                onClick={() => setShowSecondColor(true)}
                className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-md w-1/2"
              >
                + Add Second color
              </Button>
              {showSecondColor && (
                <div className="w-1/2 grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="select"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Select
                    </Label>
                    <Select value={selectValue} onValueChange={setSelectValue}>
                      <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                        <SelectValue placeholder="t-shirt" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="color"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Color
                    </Label>
                    <ColorPicker 
                      color={secondColor}
                      setColor={setSecondColor}
                      />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional Details */}
          <div className="mb-6">
            <Textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full h-20 border-2 border-black rounded-md resize-none"
              placeholder="Please specify other details if there is needed."
            />
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    accept="image/*"
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

              {uploadedFiles.map((file, index) => (
                <div key={index} className="md:col-span-1">
                  <div className="border-2 border-dashed border-black rounded-lg p-4 h-full relative">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-contain rounded"
                    />
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
                I Confirmed as a Facility Owner that I placed the order, I will
                be obligated to pay commission charges to Salwa.
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
