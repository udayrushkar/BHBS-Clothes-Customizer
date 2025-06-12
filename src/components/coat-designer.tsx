"use client"

import type React from "react"
import { useState } from "react"

interface CoatDesignerProps {
  color1: string
  logos: (string | null)[]
  positions: { x: number; y: number }[]
  setPositions: (positions: { x: number; y: number }[]) => void
}

export default function CoatDesigner({ color1, logos, positions, setPositions }: CoatDesignerProps) {
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0)
  const [sizes] = useState([60, 60, 60])
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    const logo = logos[selectedLogoIndex]
    if (!logo) return

    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const logoRect = {
      x: rect.width / 2 + positions[selectedLogoIndex]?.x - sizes[selectedLogoIndex] / 2,
      y: rect.height / 2 + positions[selectedLogoIndex]?.y - sizes[selectedLogoIndex] / 2,
      width: sizes[selectedLogoIndex],
      height: sizes[selectedLogoIndex],
    }

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (
      mouseX >= logoRect.x &&
      mouseX <= logoRect.x + logoRect.width &&
      mouseY >= logoRect.y &&
      mouseY <= logoRect.y + logoRect.height
    ) {
      setDragOffset({
        x: mouseX - (rect.width / 2 + (positions[selectedLogoIndex]?.x || 0)),
        y: mouseY - (rect.height / 2 + (positions[selectedLogoIndex]?.y || 0)),
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !logos[selectedLogoIndex]) return

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const newPositions = [...positions]
    newPositions[selectedLogoIndex] = {
      x: mouseX - rect.width / 2 - dragOffset.x,
      y: mouseY - rect.height / 2 - dragOffset.y,
    }
    setPositions(newPositions)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative bg-white overflow-hidden cursor-move"
        style={{ width: "100%", height: "300px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Doctor's Coat with Stethoscope SVG */}
        <div className="w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full max-w-[250px] max-h-[250px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lab Coat Body */}
            <path
              d="M100 120 L100 350 L300 350 L300 120 L280 100 L250 80 L200 70 L150 80 L120 100 Z"
              fill={color1}
              stroke="#333"
              strokeWidth="2"
            />

            {/* Collar */}
            <path d="M150 80 L200 70 L250 80 L240 90 L200 85 L160 90 Z" fill={color1} stroke="#333" strokeWidth="2" />

            {/* Lapels */}
            <path d="M150 80 L120 100 L140 120 L160 90 Z" fill={color1} stroke="#333" strokeWidth="2" />
            <path d="M250 80 L280 100 L260 120 L240 90 Z" fill={color1} stroke="#333" strokeWidth="2" />

            {/* Pocket */}
            <rect x="130" y="150" width="40" height="30" fill="none" stroke="#333" strokeWidth="1.5" rx="3" />

            {/* Buttons */}
            <circle cx="200" cy="130" r="3" fill="#333" />
            <circle cx="200" cy="160" r="3" fill="#333" />
            <circle cx="200" cy="190" r="3" fill="#333" />
            <circle cx="200" cy="220" r="3" fill="#333" />

            {/* Stethoscope */}
            <path
              d="M180 100 Q160 110 150 130 Q140 150 160 170 Q180 180 200 170"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            />
            <path
              d="M220 100 Q240 110 250 130 Q260 150 240 170 Q220 180 200 170"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            />
            <circle cx="200" cy="170" r="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <circle cx="180" cy="100" r="6" fill="#374151" />
            <circle cx="220" cy="100" r="6" fill="#374151" />
          </svg>
        </div>

        {/* Logo overlays */}
        {logos.map(
          (logo, index) =>
            logo &&
            positions[index] && (
              <img
                key={index}
                src={logo || "/placeholder.svg"}
                alt={`Logo ${index + 1}`}
                className="absolute pointer-events-none select-none"
                style={{
                  width: `${sizes[index]}px`,
                  height: `${sizes[index]}px`,
                  left: `${50 + positions[index].x - sizes[index] / 2}%`,
                  top: `${50 + positions[index].y - sizes[index] / 2}%`,
                  objectFit: "contain",
                }}
                draggable="false"
              />
            ),
        )}
      </div>
    </div>
  )
}
