import { useEffect, useRef } from 'react'

const ArcticBgTwo = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes = []

    // Create snowflakes with slower speed & smaller sizes
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Smaller snowflakes (0.5 to 2)
        speedY: Math.random() * 0.8 + 0.2, // Slower downward speed (0.2 to 0.8)
        speedX: Math.random() * 0.3 - 0.15, // Slight horizontal drift
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Arctic night gradient (lighter than before)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#205c87') // Lighter Arctic blue
      gradient.addColorStop(0.5, '#183f64') // Deep ocean blue
      gradient.addColorStop(1, '#102233') // Dark navy at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw snowflakes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      snowflakes.forEach((snowflake) => {
        snowflake.x += snowflake.speedX
        snowflake.y += snowflake.speedY

        if (snowflake.x > canvas.width) snowflake.x = 0
        if (snowflake.x < 0) snowflake.x = canvas.width
        if (snowflake.y > canvas.height) snowflake.y = 0

        ctx.beginPath()
        ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
}

export default ArcticBgTwo
