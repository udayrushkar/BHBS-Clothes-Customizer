import { ChromePicker } from "react-color"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"


import React from 'react'
import { Button } from "./ui/button"

function CustomPicker({custom,setShowCustom,setColor,color}:any) {
  return (
    <Dialog open={custom as boolean} onOpenChange={setShowCustom}>
  <DialogContent className="sm:max-w-[400px] mx-auto z-[999999]" onClick={(e)=>{
    e.stopPropagation()
  }}>
    <DialogHeader>
      <DialogTitle>Pick a Custom Color</DialogTitle>
    </DialogHeader>
    <ChromePicker
    className="!w-full"
   
      color={color?.value || "#ffffff"}
      onChangeComplete={(newColor) => {
        const hex = newColor.hex
        setColor({ name: "Custom", value: hex })
      }}
    />
    <DialogFooter>
      <Button onClick={() => setShowCustom(false)}>Done</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default CustomPicker