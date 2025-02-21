import { useEffect, useRef } from "react";

const ArcticBgOne = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numBubbles = 50;
    const bubbles = [];
    const waves = [];

    // Create floating bubbles
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5, // Smaller size (5-15px)
        speedX: (Math.random() - 0.5) * 0.5, // Slower random horizontal movement
        speedY: (Math.random() - 0.5) * 0.5, // Slower vertical movement
      });
    }

    // Create wavy ocean effect
    for (let i = 0; i < canvas.width; i += 20) {
      waves.push({
        x: i,
        y: canvas.height * 0.7 + Math.sin(i * 0.05) * 10,
        amplitude: Math.random() * 10 + 5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ocean background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#00AEEF");
      gradient.addColorStop(1, "#0A192F");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, waves[0].y);
      for (let i = 0; i < waves.length; i++) {
        waves[i].y = canvas.height * 0.7 + Math.sin(waves[i].x * 0.05 + Date.now() * 0.002) * waves[i].amplitude;
        ctx.lineTo(waves[i].x, waves[i].y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Move and draw bubbles
      ctx.fillStyle = "rgba(240, 248, 255, 0.3)";
      bubbles.forEach((bubble) => {
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Reset position if out of bounds
        if (bubble.x > canvas.width) bubble.x = 0;
        if (bubble.x < 0) bubble.x = canvas.width;
        if (bubble.y > canvas.height) bubble.y = 0;
        if (bubble.y < 0) bubble.y = canvas.height;

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default ArcticBgOne;
