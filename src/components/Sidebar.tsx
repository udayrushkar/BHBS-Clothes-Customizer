"use client"

import { Home, BarChart, FileText, MessageCircle, Users, ClipboardList, Package, Truck, Bell, Wallet, LifeBuoy } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { label: "Services Dashboard", icon: Home },
  { label: "Analysis", icon: BarChart },
  { label: "Report", icon: FileText },
  { label: "Messages", icon: MessageCircle },
  { label: "Employee Database", icon: Users },
  { label: "Requests", icon: ClipboardList },
  { label: "Orders", icon: Package },
  { label: "Providers", icon: Truck },
  { label: "Notifications", icon: Bell },
  { label: "Wallet", icon: Wallet },
  { label: "Support & Ticket System", icon: LifeBuoy },
]

export default function Sidebar() {
  return (
    <aside className="sticky top-0 w-full h-screen bg-[#1F1F1F] text-white p-4 space-y-1">
  {sidebarItems.map((item, index) => (
    <button
      key={index}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted/20 transition",
        index === 0 && "bg-muted/20 text-white border-l-4 border-white"
      )}
    >
      <item.icon className="w-4 h-4 text-muted-white" />
      <span>{item.label}</span>
    </button>
  ))}
</aside>

  )
}
