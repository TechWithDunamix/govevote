"use client"

import { useEffect, useRef } from "react"

export default function NigeriaMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simple Anambra state outline
    const drawAnambraMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set styles
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2

      // Draw a simplified Anambra state shape
      ctx.beginPath()

      // These are simplified coordinates to represent Anambra's shape
      ctx.moveTo(120, 50) // Start at top
      ctx.lineTo(180, 80) // Northeast
      ctx.lineTo(200, 150) // East
      ctx.lineTo(160, 220) // Southeast
      ctx.lineTo(100, 240) // South
      ctx.lineTo(60, 180) // Southwest
      ctx.lineTo(80, 100) // West
      ctx.lineTo(120, 50) // Back to top

      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Add some dots representing major cities in Anambra
      const cities = [
        { x: 140, y: 120, name: "Awka" },
        { x: 180, y: 150, name: "Onitsha" },
        { x: 100, y: 180, name: "Nnewi" },
        { x: 120, y: 90, name: "Agulu" },
        { x: 160, y: 200, name: "Ekwulobia" },
      ]

      cities.forEach((city) => {
        ctx.beginPath()
        ctx.arc(city.x, city.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        // Add city names
        ctx.fillStyle = "white"
        ctx.font = "10px Arial"
        ctx.fillText(city.name, city.x + 8, city.y + 3)
      })

      // Add "ANAMBRA STATE" label
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("ANAMBRA STATE", canvas.width / 2, 30)
    }

    drawAnambraMap()

    // Optional: Add animation or interactivity
    let animationFrame: number
    let angle = 0

    const animate = () => {
      angle += 0.01
      const pulse = Math.sin(angle) * 0.1 + 0.9

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Apply pulsing effect
      ctx.save()
      ctx.scale(pulse, pulse)
      ctx.translate((1 - pulse) * (canvas.width / 2), (1 - pulse) * (canvas.height / 2))

      drawAnambraMap()

      ctx.restore()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} width={300} height={300} className="max-w-full h-auto" />
}
