import { useEffect, useRef } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation?: number;
  type: 'pillar' | 'cube' | 'circle';
  animOffset?: number;
  label?: string;
}

export function CanvasPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vehicleRef = useRef({
    x: 400,
    y: 300,
    rotation: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const cameraRef = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game objects (portfolio sections)
    const objects: GameObject[] = [
      // Projets (rouge) - top left
      { x: -600, y: -600, width: 80, height: 120, color: '#ff6b6b', type: 'pillar', label: 'PROJETS' },
      { x: -550, y: -550, width: 40, height: 40, color: '#ff8787', type: 'cube', rotation: 0, animOffset: 0 },
      { x: -650, y: -650, width: 35, height: 35, color: '#ffa07a', type: 'circle', animOffset: 1 },
      
      // Compétences (cyan) - top right
      { x: 600, y: -600, width: 80, height: 140, color: '#4ecdc4', type: 'pillar', label: 'COMPÉTENCES' },
      { x: 650, y: -550, width: 40, height: 40, color: '#6ee7e0', type: 'circle', animOffset: 2 },
      { x: 550, y: -650, width: 45, height: 45, color: '#95e1d3', type: 'cube', rotation: 0, animOffset: 3 },
      
      // À propos (jaune) - bottom left
      { x: -600, y: 600, width: 80, height: 100, color: '#ffe66d', type: 'pillar', label: 'À PROPOS' },
      { x: -550, y: 650, width: 40, height: 40, color: '#fff89a', type: 'circle', animOffset: 4 },
      { x: -650, y: 550, width: 38, height: 38, color: '#ffeb3b', type: 'cube', rotation: 0, animOffset: 5 },
      
      // Contact (vert) - bottom right
      { x: 600, y: 600, width: 80, height: 160, color: '#a8e6cf', type: 'pillar', label: 'CONTACT' },
      { x: 650, y: 650, width: 50, height: 50, color: '#c3f0d9', type: 'cube', rotation: 0, animOffset: 6 },
      { x: 550, y: 550, width: 45, height: 45, color: '#b8f3dc', type: 'circle', animOffset: 7 },
      
      // Décorations centrales
      { x: 0, y: -300, width: 50, height: 50, color: '#ff6b6b', type: 'cube', rotation: 0, animOffset: 8 },
      { x: 300, y: 0, width: 45, height: 45, color: '#4ecdc4', type: 'circle', animOffset: 9 },
      { x: 0, y: 300, width: 45, height: 45, color: '#ffe66d', type: 'cube', rotation: 0, animOffset: 10 },
      { x: -300, y: 0, width: 40, height: 40, color: '#a8e6cf', type: 'circle', animOffset: 11 },
    ];

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keysRef.current.forward = true;
      if (key === 's' || key === 'arrowdown') keysRef.current.backward = true;
      if (key === 'a' || key === 'arrowleft') keysRef.current.left = true;
      if (key === 'd' || key === 'arrowright') keysRef.current.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keysRef.current.forward = false;
      if (key === 's' || key === 'arrowdown') keysRef.current.backward = false;
      if (key === 'a' || key === 'arrowleft') keysRef.current.left = false;
      if (key === 'd' || key === 'arrowright') keysRef.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Draw grid
    const drawGrid = (ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
      const gridSize = 100;
      const gridWidth = 3000;
      const gridHeight = 3000;

      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (let x = -gridWidth; x <= gridWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, -gridHeight + offsetY);
        ctx.lineTo(x + offsetX, gridHeight + offsetY);
        ctx.stroke();
      }

      for (let y = -gridHeight; y <= gridHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-gridWidth + offsetX, y + offsetY);
        ctx.lineTo(gridWidth + offsetX, y + offsetY);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    // Draw vehicle
    const drawVehicle = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(-25, -35, 50, 70);

      // Body
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(-20, -30, 40, 60);

      // Cabin
      ctx.fillStyle = '#4ecdc4';
      ctx.fillRect(-15, -25, 30, 25);

      // Wheels
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(-25, -20, 8, 15);
      ctx.fillRect(17, -20, 8, 15);
      ctx.fillRect(-25, 5, 8, 15);
      ctx.fillRect(17, 5, 8, 15);

      // Window
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(-10, -20, 20, 15);

      ctx.restore();
    };

    // Draw game object
    const drawObject = (ctx: CanvasRenderingContext2D, obj: GameObject, time: number, offsetX: number, offsetY: number) => {
      const animY = Math.sin(time * 0.002 + (obj.animOffset || 0)) * 10;
      const screenX = obj.x + offsetX;
      const screenY = obj.y + offsetY + animY;

      ctx.save();
      ctx.translate(screenX, screenY);

      if (obj.type === 'pillar') {
        // Draw pillar with gradient
        const gradient = ctx.createLinearGradient(0, -obj.height / 2, 0, obj.height / 2);
        gradient.addColorStop(0, obj.color);
        gradient.addColorStop(1, obj.color + '88');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
        
        // Top decoration
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, -obj.height / 2 - 15, 25, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        if (obj.label) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(obj.label, 0, obj.height / 2 + 30);
        }
      } else if (obj.type === 'cube') {
        ctx.rotate((obj.rotation || 0) + time * 0.001);
        ctx.fillStyle = obj.color;
        ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
      } else if (obj.type === 'circle') {
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(0, 0, obj.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Update vehicle
      const vehicle = vehicleRef.current;
      const keys = keysRef.current;
      const speed = 3;
      const rotationSpeed = 0.05;
      const friction = 0.92;

      if (keys.left) vehicle.rotation -= rotationSpeed;
      if (keys.right) vehicle.rotation += rotationSpeed;

      if (keys.forward) {
        vehicle.velocityX += Math.sin(vehicle.rotation) * speed;
        vehicle.velocityY -= Math.cos(vehicle.rotation) * speed;
      }
      if (keys.backward) {
        vehicle.velocityX -= Math.sin(vehicle.rotation) * speed;
        vehicle.velocityY += Math.cos(vehicle.rotation) * speed;
      }

      vehicle.velocityX *= friction;
      vehicle.velocityY *= friction;

      vehicle.x += vehicle.velocityX;
      vehicle.y += vehicle.velocityY;

      // Limit movement area
      vehicle.x = Math.max(-1000, Math.min(1000, vehicle.x));
      vehicle.y = Math.max(-1000, Math.min(1000, vehicle.y));

      // Update camera to follow vehicle
      cameraRef.current.x = canvas.width / 2 - vehicle.x;
      cameraRef.current.y = canvas.height / 2 - vehicle.y;

      // Clear canvas
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, cameraRef.current.x, cameraRef.current.y);

      // Draw floor zones
      const zones = [
        { x: -600, y: -600, color: '#ff6b6b' },
        { x: 600, y: -600, color: '#4ecdc4' },
        { x: -600, y: 600, color: '#ffe66d' },
        { x: 600, y: 600, color: '#a8e6cf' },
      ];

      zones.forEach(zone => {
        ctx.fillStyle = zone.color + '22';
        ctx.fillRect(
          zone.x - 150 + cameraRef.current.x,
          zone.y - 150 + cameraRef.current.y,
          300,
          300
        );
      });

      // Draw objects
      objects.forEach(obj => {
        drawObject(ctx, obj, currentTime, cameraRef.current.x, cameraRef.current.y);
      });

      // Draw vehicle
      drawVehicle(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        vehicle.rotation
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
