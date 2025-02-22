import { useEffect, useRef, useState } from 'react'

const ArcticBgTwo = () => {
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false) // Start as false

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const audio = audioRef.current

    // Try to autoplay the audio on load
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.log('Autoplay blocked, waiting for user interaction...')
      }
    }

    playAudio() // Attempt to autoplay

    // Canvas setup
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes = []
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.8 + 0.2,
        speedX: Math.random() * 0.3 - 0.15,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Arctic night gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#205c87')
      gradient.addColorStop(0.5, '#183f64')
      gradient.addColorStop(1, '#102233')
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

    // Handle user interaction if autoplay fails
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('User interaction needed:', err))
      }
      document.removeEventListener('click', handleFirstInteraction)
    }
    document.addEventListener('click', handleFirstInteraction)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('click', handleFirstInteraction)
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const toggleSound = () => {
    const audio = audioRef.current
    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />

      {/* Background Music */}
      <audio ref={audioRef} src='/sound.mp3' preload='auto' />

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className='fixed right-10 bottom-36 z-10 p-1 rounded-full bg-opacity-50 bg-blue-600 hover:bg-blue-700 transition-colors'
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </>
  )
}

export default ArcticBgTwo
