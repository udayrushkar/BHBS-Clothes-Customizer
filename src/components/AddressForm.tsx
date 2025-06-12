"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
]

export default function AddressMapForm() {
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [mapUrl, setMapUrl] = useState("/placeholder.svg?height=300&width=300")

  useEffect(() => {
    if (address && country && city) {
      setMapUrl("/placeholder.svg?height=300&width=300")
    }
  }, [address, country, city])

  const handleGetDirections = () => {
    const fullAddress = `${address}, ${city}, ${region}, ${postalCode}, ${country}`
    alert(`Getting directions to: ${fullAddress}`)
  }

  return (
    <div className="mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Form Inputs */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input className="h-12"  id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="region">Region</Label>
              <Input className="h-12" id="region" value={region} onChange={(e) => setRegion(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input className="h-12" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="postal">Postal Code</Label>
              <Input className="h-12" id="postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Right - Map */}
        <div className="relative h-[300px] rounded-md overflow-hidden border">
          <div className="absolute max-h-[220px] inset-0 bg-gray-100">
            <img
              src={mapUrl}
              alt="Location map"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-black rounded-full p-2">
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Button onClick={handleGetDirections} className="bg-black text-white hover:bg-gray-800">
              Get Direction
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
