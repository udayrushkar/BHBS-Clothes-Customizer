
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from "lucide-react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Basicinformationform() {
  const [isOpen, setIsOpen] = useState(true);
  const [issuanceDate, setIssuanceDate] = useState<Date | undefined>();
  const [phone, setPhone] = useState('');

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-4 bg-[#dedede] rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent >
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 gap-4 p-4 bg-transperant ">

        <div>
          <Label htmlFor="unifiedNumber"  className="text-sm font-medium text-gray-700 mb-2 block">Unified National Number</Label>
          <Input id="unifiedNumber" placeholder="7000000000" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="businessName"  className="text-sm font-medium text-gray-700 mb-2 block">Business Name</Label>
          <Input id="businessName" placeholder="" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
        <Label htmlFor="businessName"  className="text-sm font-medium text-gray-700 mb-2 block">Property Type</Label>

          <Select>
            <SelectTrigger className="h-12 border-1   border-black rounded-md w-full">
              <SelectValue placeholder=" type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main</SelectItem>
              <SelectItem value="branch">Branch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        Issuance Date
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 border border-black rounded-md justify-between text-left font-normal px-4"
          >
            {issuanceDate ? format(issuanceDate, "PPP") : <span>Select date</span>}

            {/* Calendar icon on the right side */}
            <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={issuanceDate}
            onSelect={setIssuanceDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
        <div>
          <Label htmlFor="commercialActivity"  className="text-sm font-medium text-gray-700 mb-2 block">Commercial activity</Label>
          <Input id="commercialActivity" placeholder="" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div className="w-full">
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        Facility Official Phone Number
      </Label>

      <PhoneInput
        country={'sa'}
        value={phone}
        onChange={setPhone}
        inputStyle={{
          width: '100%',
          height: '48px',
          borderRadius: '0.375rem',
          border: '1px solid black',
          paddingLeft: '48px',
        }}
        buttonStyle={{
          borderTopLeftRadius: '0.375rem',
          borderBottomLeftRadius: '0.375rem',
        }}
        containerStyle={{ width: '100%' }}
      />
    </div>

        <div>
          <Label htmlFor="hasBranches"  className="text-sm font-medium text-gray-700 mb-2 block">Do you have Branches? (Yes/No)</Label>
          <Select>
            <SelectTrigger className="h-12 border-1 border-black rounded-md w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="registeringAsBranch"  className="text-sm font-medium text-gray-700 mb-2 block">Are you registering as a Branch? (Yes/No)</Label>
          <Select>
            <SelectTrigger className="h-12 border-1 border-black rounded-md w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="branchNumber"  className="text-sm font-medium text-gray-700 mb-2 block">Branch Number</Label>
          <Input id="branchNumber" placeholder="" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="facilityEmail"  className="text-sm font-medium text-gray-700 mb-2 block">Facility Email</Label>
          <Input id="facilityEmail" placeholder="example@email.com" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="facilityWebsite"  className="text-sm font-medium text-gray-700 mb-2 block">Facility Website</Label>
          <Input id="facilityWebsite" placeholder="https://example.com" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="postOfficeBox"  className="text-sm font-medium text-gray-700 mb-2 block">Post Office Box</Label>
          <Input id="postOfficeBox" placeholder="" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="contactName"  className="text-sm font-medium text-gray-700 mb-2 block">Contact Person Name</Label>
          <Input id="contactName" placeholder="" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="contactEmail"  className="text-sm font-medium text-gray-700 mb-2 block">Contact Person Email</Label>
          <Input id="contactEmail" placeholder="example@email.com" className="h-12 border-1 border-black rounded-md" />
        </div>

        <div>
          <Label htmlFor="validityTime"  className="text-sm font-medium text-gray-700 mb-2 block">Choose Post Validity Time</Label>
          <Select>
            <SelectTrigger className="h-12 border-1 border-black rounded-md w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="2">2 Years</SelectItem>
              <SelectItem value="3">3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
   </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
