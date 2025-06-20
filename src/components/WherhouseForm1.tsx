import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Basicinformationform from "./Basicinformationform";
import AddressMapForm from "./AddressForm";
import MediaandTerms from "./MediaandTerms";
import { Textarea } from "./ui/textarea";

import warehouseImg from "../assets/Warehouse Shelf.png";
import palletImg from "../assets/Pallet.png";
import specificSpaceImg from "../assets/Specific Space.png";

export default function WherhouseForm1() {
  const [isOpen, setIsOpen] = useState(true);

  const [orderType, setOrderType] = useState("warehouse");

  const getImageForType = () => {
    switch (orderType) {
      case "pallet":
        return palletImg;
      case "specific":
        return specificSpaceImg;
      case "warehouse":
      default:
        return warehouseImg;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <p className="flex items-center text-gray-700 cursor-pointer mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to dashboard
      </p>

      <Basicinformationform />
      <AddressMapForm />

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4  bg-[#dedede] rounded-lg shadow-sm border mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Other Information
            </h2>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Do you have a Fridge or Not? (Yes/No)"
              className="h-12 border border-black"
            />
            <Input
              placeholder="FDA Approved? (Yes/No)"
              className="h-12 border border-black"
            />
            <Input
              placeholder="Fire Department License"
              className="h-12 border border-black"
            />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Please Specify any other terms and condition?"
              className="h-20 w-full border border-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 h-full gap-8 items-start">
            <div className="space-y-4 md:col-span-2">
              <div>
                <Label
                  htmlFor="orderTitle"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Order Title
                </Label>
                <Input
                  id="orderTitle"
                  placeholder="title"
                  className="w-full h-12 border border-black rounded-md"
                />
              </div>

              <div>
                <Label
                  htmlFor="orderType"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Order Type
                </Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger className="w-full h-12 border border-black rounded-md">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warehouse">Warehouse Shelf</SelectItem>
                    <SelectItem value="pallet">Pallet</SelectItem>
                    <SelectItem value="specific">Specific Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  className="w-full h-12 border border-black rounded-md"
                />
              </div>
            </div>

            <div className="md:col-span-3 border border-black rounded-md space-y-2 mt-4 mb-4 p-4 h-full">
              <img
                src={getImageForType()}
                alt="Order preview"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          <div className="mb-6 mt-10">
            <Textarea
              className="w-full h-20 border-2 border-black rounded-md resize-none"
              placeholder="Please specify other details if there is needed."
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <MediaandTerms />
    </div>
  );
}