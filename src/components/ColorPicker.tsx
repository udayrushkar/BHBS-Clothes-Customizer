"use client"

import * as React from "react"
import { FixedSizeList as List } from "react-window"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { colornames } from "color-name-list"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CustomPicker from "./CustomPicker"

export function ColorPicker({ color, setColor }) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
    const [showCustom,setShowCustom] = React.useState(false)
  const filteredOptions = colornames.filter((opt: any) => {
    const input = inputValue.toLowerCase().replace('#', '')
    const name = opt.name.toLowerCase()
    const hex = opt.hex.toLowerCase().replace('#', '')
    return name.includes(input) || hex.includes(input)
  })

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = filteredOptions[index]
    const isSelected = color?.value === item.hex

    return (
      <div
        key={item.hex}
        style={style}
        onClick={() => {
          setColor({ name: item.name, value: item.hex })
          setOpen(false)
        }}
        className={cn(
          "cursor-pointer flex items-center px-4 py-2 hover:bg-accent",
          isSelected && "bg-accent"
        )}
      >
        <CheckIcon
          className={cn(
            "mr-2 h-4 w-4",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        />
        <span className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded"
            style={{ backgroundColor: item.hex }}
          ></span>
          {item.name} ({item.hex})
        </span>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="overflow-hidden">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between py-3 h-12 border-2 border-black rounded-md  overflow-hidden"
        >
          <span className="font-normal">
            {color?.name ? `${color.name} (${color.value})` : "Select color..."}
          </span>
          <div className={`w-6 h-6 rounded border shadow-sm`} style={{backgroundColor:`${color?.value || "#ffffff"}`}} onClick={(e)=>{
            e.stopPropagation()
            //color picker code 
            setOpen(false)
            setShowCustom(true)
          }}> </div>

         {showCustom && <CustomPicker custom={showCustom} setShowCustom={setShowCustom} setColor={setColor} color={color}/>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Search color..."
            value={inputValue}
            onValueChange={setInputValue}
            className="w-full h-16 bg-transparent"
          />
          {filteredOptions?.length == 0 && <CommandEmpty>No color found.</CommandEmpty>}
        </Command>
        {/* Custom scrollable container without CommandList */}
        <div className="max-h-[300px] overflow-auto">
          <List
            height={300}
            itemCount={filteredOptions.length}
            itemSize={40}
            width="100%"
          >
            {Row}
          </List>
        </div>
      </PopoverContent>
    </Popover>
  )
}
