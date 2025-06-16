import React from 'react'
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ColorPicker } from './ColorPicker';

function Form1() {
  return (
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
                    value='orderTitle'
                    
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
                    value='uniformType'
                    
                  >
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      
                        <SelectItem  value='type'>
                          type
                        </SelectItem>
                     
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
                  <Select value='gender'>
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      
                        <SelectItem  value='gendar'>
                          gendar
                        </SelectItem>
                    
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
                  <Select value='size' >
                    <SelectTrigger className="w-full h-12 border-2 border-black rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      
                        <SelectItem  value='size'>
                          size
                        </SelectItem>
                  
                    </SelectContent>
                  </Select>
                </div>
    
          
            {/* <div>
              <Label htmlFor="color">Color</Label>
              <ColorPicker color={color} setColor={setColor} />
            </div> */}
        
        </div>
        </div>
  )
}

export default Form1
