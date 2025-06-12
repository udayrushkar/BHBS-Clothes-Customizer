/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Upload, ImagePlus, Trash } from "lucide-react"
import TShirtDesigner from "./Coat"

const uniformTypes = ["Scrub", "Lab Coat", "Surgical Gown"]
const genders = ["Male", "Female"]
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"]

export default function UniformOrderForm() {
  const [orderTitle, setOrderTitle] = useState("Doctor Lab Coat")
  const [uniformType, setUniformType] = useState("Lab Coat")
  const [gender, setGender] = useState("Male")
  const [size, setSize] = useState("L")
  const [color, setColor] = useState("#DDDDDD")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [color1, setColor1] = useState("#EAE6E6");
  const [confirmInfo, setConfirmInfo] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(false)
const [logos, setLogos] = useState<(string | null)[]>([null, null, null])
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

  // === YOUR FUNCTION ===
  const handleFileUpload = (index: number, fileEvent: File) => {
    const file = fileEvent
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newLogos = [...logos]
        newLogos[index] = e.target?.result as string
        setLogos(newLogos)

        const newPositions = [...positions]
        newPositions[index] = { x: 0, y: 0 }
        setPositions(newPositions)
      }
      reader.readAsDataURL(file)
    }
  }

  

const handleMultiUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3) // only first 3 images
    files.forEach((file, i) => {
      handleFileUpload(i, file)
    })
  }

  const handleRemove = (index: number) => {
    const newLogos = [...logos]
    newLogos[index] = null
    setLogos(newLogos)

    const newPositions = [...positions]
    newPositions[index] = { x: 0, y: 0 }
    setPositions(newPositions)
  }
  return (
    <div className=" mx-auto p-3 w-full space-y-6  rounded-lg shadow-md bg-white">
      {/* Grid form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="orderTitle">Order Title</Label>
            <Input className="h-12" id="orderTitle" value={orderTitle} onChange={(e) => setOrderTitle(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="uniformType">Uniform Type</Label>
            <Select value={uniformType} onValueChange={setUniformType}>
              <SelectTrigger>
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

          <div className="space-y-1">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
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

          <div className="space-y-1">
            <Label htmlFor="size">Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 relative">
            <Label htmlFor="color">Color</Label>
            <Input 
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 w-full"
            />
            <Input 
              type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              className="h-12 right-0 absolute w-10 p-1 border-none top-[18px]"
            />
          </div>
        </div>

        {/* Right - Uniform Image */}
        <div className="flex items-center justify-center border rounded-md p-4 border-black">
         <TShirtDesigner color1={color} logos={logos} positions={positions} setPositions={setPositions}/>
        </div>
      </div>

{/* File Upload */}
       <div className="relative border-2 border-dashed rounded-md p-6 bg-muted/20 text-center">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultiUpload}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Upload className="w-6 h-6" />
          <p className="text-sm">Drag or click to upload images</p>
          <p className="text-xs">Allowed: JPG, PNG • Max: 3 images</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {logos.map((logo, index) =>
          logo ? (
            <div key={index} className="relative border rounded-md overflow-hidden">
              <img
                src={logo}
                alt={`Uploaded ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-white/70"
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ) : null
        )}
      </div>
      {/* Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Checkbox id="confirmInfo" checked={confirmInfo} onCheckedChange={(val) => setConfirmInfo(!!val)} />
          <Label htmlFor="confirmInfo" className="text-sm leading-5">
            I confirm as a Facility Owner that all the information I provided is correct and I am obligated for it.
          </Label>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="confirmOrder" checked={confirmOrder} onCheckedChange={(val) => setConfirmOrder(!!val)} />
          <Label htmlFor="confirmOrder" className="text-sm leading-5">
            I confirm as a Facility Owner that I placed the order. I will be obligated to pay commission charges to Salwa.
          </Label>
        </div>
      </div>
    </div>
  )
}
