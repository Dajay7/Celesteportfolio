import { useEffect, useRef, useState } from 'react';

interface Object3D {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  type: 'pillar' | 'cube' | 'sphere';
  rotation?: number;
  animOffset?: number;
  label?: string;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const vehicleRef = useRef({
    x: 0,
    y: 0,
    z: 0,
    rotation: 0,
    velocityX: 0,
    velocityZ: 0,
  });
  
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  
  const cameraRef = useRef({
    x: 0,
    y: 20,
    z: 25,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const project3D = (x: number, y: number, z: number, cameraX: number, cameraY: number, cameraZ: number) => {
      const adjustedX = x - cameraX;
      const adjustedY = y - cameraY;
      const adjustedZ = z - cameraZ;
      const scale = 300 / (adjustedZ + 30);
      const screenX = canvas.width / 2 + adjustedX * scale;
      const screenY = canvas.height / 2 - adjustedY * scale;
      return { x: screenX, y: screenY, scale };
    };

    const getDepth = (obj: Object3D, cameraX: number, cameraZ: number) => {
      const dx = obj.x - cameraX;
      const dz = obj.z - cameraZ;
      return Math.sqrt(dx * dx + dz * dz + obj.y * obj.y);
    };

    const objects: Object3D[] = [
      { x: -25, y: 2, z: -25, width: 2, height: 4, depth: 2, color: '#ff6b6b', type: 'pillar', label: 'PROJETS' },
      { x: -22, y: 4.5, z: -22, width: 1, height: 1, depth: 1, color: '#ff8787', type: 'cube', rotation: 0, animOffset: 0 },
      { x: 25, y: 2.5, z: -25, width: 2, height: 5, depth: 2, color: '#4ecdc4', type: 'pillar', label: 'COMPÉTENCES' },
      { x: 22, y: 5, z: -22, width: 0.9, height: 0.9, depth: 0.9, color: '#6ee7e0', type: 'sphere', animOffset: 2 },
      { x: -25, y: 1.75, z: 25, width: 2, height: 3.5, depth: 2, color: '#ffe66d', type: 'pillar', label: 'À PROPOS' },
      { x: -22, y: 4, z: 28, width: 0.85, height: 0.85, depth: 0.85, color: '#fff89a', type: 'sphere', animOffset: 4 },
      { x: 25, y: 3, z: 25, width: 2, height: 6, depth: 2, color: '#a8e6cf', type: 'pillar', label: 'CONTACT' },
      { x: 22, y: 6.5, z: 22, width: 1.2, height: 1.2, depth: 1.2, color: '#c3f0d9', type: 'cube', rotation: 0, animOffset: 6 },
      { x: 0, y: 3, z: -12, width: 1.2, height: 1.2, depth: 1.2, color: '#ff6b6b', type: 'cube', rotation: 0, animOffset: 8 },
      { x: 12, y: 3.5, z: 0, width: 1, height: 1, depth: 1, color: '#4ecdc4', type: 'sphere', animOffset: 9 },
      { x: 0, y: 3, z: 12, width: 1.1, height: 1.1, depth: 1.1, color: '#ffe66d', type: 'cube', rotation: 0, animOffset: 10 },
      { x: -12, y: 3.2, z: 0, width: 0.95, height: 0.95, depth: 0.95, color: '#a8e6cf', type: 'sphere', animOffset: 11 },
    ];

    const lightenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, (num >> 16) + amt);
      const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
      const B = Math.min(255, (num & 0x0000FF) + amt);
      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    };

    const drawCube = (ctx: CanvasRenderingContext2D, obj: Object3D, time: number, camera: typeof cameraRef.current) => {
      const animY = Math.sin(time * 0.002 + (obj.animOffset || 0)) * 0.5;
      const currentY = obj.y + animY;
      const rotation = (obj.rotation || 0) + time * 0.001;
      const hw = obj.width / 2;
      const hh = obj.height / 2;
      const hd = obj.depth / 2;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      const corners = [
        { x: -hw, y: -hh, z: -hd }, { x: hw, y: -hh, z: -hd },
        { x: hw, y: hh, z: -hd }, { x: -hw, y: hh, z: -hd },
        { x: -hw, y: -hh, z: hd }, { x: hw, y: -hh, z: hd },
        { x: hw, y: hh, z: hd }, { x: -hw, y: hh, z: hd },
      ].map(corner => {
        const rx = corner.x * cos - corner.z * sin;
        const rz = corner.x * sin + corner.z * cos;
        return project3D(obj.x + rx, currentY + corner.y, obj.z + rz, camera.x, camera.y, camera.z);
      });

      ctx.fillStyle = obj.color;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      ctx.lineTo(corners[1].x, corners[1].y);
      ctx.lineTo(corners[2].x, corners[2].y);
      ctx.lineTo(corners[3].x, corners[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = lightenColor(obj.color, 20);
      ctx.beginPath();
      ctx.moveTo(corners[3].x, corners[3].y);
      ctx.lineTo(corners[2].x, corners[2].y);
      ctx.lineTo(corners[6].x, corners[6].y);
      ctx.lineTo(corners[7].x, corners[7].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, obj: Object3D, time: number, camera: typeof cameraRef.current) => {
      const animY = Math.cos(time * 0.002 + (obj.animOffset || 0)) * 0.5;
      const currentY = obj.y + animY;
      const projected = project3D(obj.x, currentY, obj.z, camera.x, camera.y, camera.z);
      const radius = obj.width / 2 * projected.scale;

      const gradient = ctx.createRadialGradient(
        projected.x - radius * 0.3, projected.y - radius * 0.3, 0,
        projected.x, projected.y, radius
      );
      gradient.addColorStop(0, lightenColor(obj.color, 40));
      gradient.addColorStop(1, obj.color);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPillar = (ctx: CanvasRenderingContext2D, obj: Object3D, camera: typeof cameraRef.current) => {
      drawCube(ctx, obj, 0, camera);

      if (obj.label) {
        const projected = project3D(obj.x, obj.y + obj.height / 2 + 1, obj.z, camera.x, camera.y, camera.z);
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${14 * projected.scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(obj.label, projected.x, projected.y);
      }

      const ringY = obj.y + obj.height / 2 + 0.5;
      const projected = project3D(obj.x, ringY, obj.z, camera.x, camera.y, camera.z);
      const radius = 1.2 * projected.scale;
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 5 * projected.scale;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawVehicle = (ctx: CanvasRenderingContext2D, vehicle: typeof vehicleRef.current, camera: typeof cameraRef.current) => {
      const cos = Math.cos(vehicle.rotation);
      const sin = Math.sin(vehicle.rotation);
      const bodyWidth = 1.5, bodyHeight = 0.7, bodyDepth = 2;
      const hw = bodyWidth / 2, hh = bodyHeight / 2, hd = bodyDepth / 2;

      const bodyCorners = [
        { x: -hw, y: 0, z: -hd }, { x: hw, y: 0, z: -hd },
        { x: hw, y: bodyHeight, z: -hd }, { x: -hw, y: bodyHeight, z: -hd },
        { x: -hw, y: 0, z: hd }, { x: hw, y: 0, z: hd },
        { x: hw, y: bodyHeight, z: hd }, { x: -hw, y: bodyHeight, z: hd },
      ].map(corner => {
        const rx = corner.x * cos - corner.z * sin;
        const rz = corner.x * sin + corner.z * cos;
        return project3D(vehicle.x + rx, vehicle.y + corner.y, vehicle.z + rz, camera.x, camera.y, camera.z);
      });

      ctx.fillStyle = '#ff6b6b';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bodyCorners[0].x, bodyCorners[0].y);
      ctx.lineTo(bodyCorners[1].x, bodyCorners[1].y);
      ctx.lineTo(bodyCorners[2].x, bodyCorners[2].y);
      ctx.lineTo(bodyCorners[3].x, bodyCorners[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = lightenColor('#ff6b6b', 20);
      ctx.beginPath();
      ctx.moveTo(bodyCorners[3].x, bodyCorners[3].y);
      ctx.lineTo(bodyCorners[2].x, bodyCorners[2].y);
      ctx.lineTo(bodyCorners[6].x, bodyCorners[6].y);
      ctx.lineTo(bodyCorners[7].x, bodyCorners[7].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawFloor = (ctx: CanvasRenderingContext2D, camera: typeof cameraRef.current) => {
      const gridSize = 5, gridRange = 50;
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (let x = -gridRange; x <= gridRange; x += gridSize) {
        const start = project3D(x, 0, -gridRange, camera.x, camera.y, camera.z);
        const end = project3D(x, 0, gridRange, camera.x, camera.y, camera.z);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      for (let z = -gridRange; z <= gridRange; z += gridSize) {
        const start = project3D(-gridRange, 0, z, camera.x, camera.y, camera.z);
        const end = project3D(gridRange, 0, z, camera.x, camera.y, camera.z);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      const zones = [
        { x: -25, z: -25, color: '#ff6b6b' },
        { x: 25, z: -25, color: '#4ecdc4' },
        { x: -25, z: 25, color: '#ffe66d' },
        { x: 25, z: 25, color: '#a8e6cf' },
      ];

      zones.forEach(zone => {
        const size = 12;
        const corners = [
          project3D(zone.x - size/2, 0, zone.z - size/2, camera.x, camera.y, camera.z),
          project3D(zone.x + size/2, 0, zone.z - size/2, camera.x, camera.y, camera.z),
          project3D(zone.x + size/2, 0, zone.z + size/2, camera.x, camera.y, camera.z),
          project3D(zone.x - size/2, 0, zone.z + size/2, camera.x, camera.y, camera.z),
        ];

        ctx.fillStyle = zone.color + '30';
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        ctx.lineTo(corners[1].x, corners[1].y);
        ctx.lineTo(corners[2].x, corners[2].y);
        ctx.lineTo(corners[3].x, corners[3].y);
        ctx.closePath();
        ctx.fill();
      });
    };

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

    let animationId: number;

    const animate = (time: number) => {
      const vehicle = vehicleRef.current;
      const keys = keysRef.current;
      const camera = cameraRef.current;

      const speed = 0.15;
      const rotationSpeed = 0.05;
      const friction = 0.92;

      if (keys.left) vehicle.rotation += rotationSpeed;
      if (keys.right) vehicle.rotation -= rotationSpeed;

      if (keys.forward) {
        vehicle.velocityX += Math.sin(vehicle.rotation) * speed;
        vehicle.velocityZ += Math.cos(vehicle.rotation) * speed;
      }
      if (keys.backward) {
        vehicle.velocityX -= Math.sin(vehicle.rotation) * speed;
        vehicle.velocityZ -= Math.cos(vehicle.rotation) * speed;
      }

      vehicle.velocityX *= friction;
      vehicle.velocityZ *= friction;
      vehicle.x += vehicle.velocityX;
      vehicle.z += vehicle.velocityZ;
      vehicle.x = Math.max(-45, Math.min(45, vehicle.x));
      vehicle.z = Math.max(-45, Math.min(45, vehicle.z));

      camera.x = vehicle.x * 0.1;
      camera.z = vehicle.z * 0.1;

      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawFloor(ctx, camera);

      const sortedObjects = [...objects].sort((a, b) => 
        getDepth(b, camera.x, camera.z) - getDepth(a, camera.x, camera.z)
      );

      sortedObjects.forEach(obj => {
        if (obj.type === 'pillar') drawPillar(ctx, obj, camera);
        else if (obj.type === 'cube') drawCube(ctx, obj, time, camera);
        else if (obj.type === 'sphere') drawSphere(ctx, obj, time, camera);
      });

      drawVehicle(ctx, vehicle, camera);

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
    <div className="w-screen h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="fixed inset-0 pointer-events-none z-10">
        <header className="p-8 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Portfolio 3D</h1>
              <p className="text-gray-300">Développeur Créatif</p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:contact@example.com"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <div className="absolute bottom-8 left-8 pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 text-white max-w-md">
            <h3 className="font-semibold mb-3 text-lg">🎮 Contrôles</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/20 rounded">W/↑</kbd>
                <span>Avancer</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/20 rounded">S/↓</kbd>
                <span>Reculer</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/20 rounded">A/←</kbd>
                <span>Tourner à gauche</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/20 rounded">D/→</kbd>
                <span>Tourner à droite</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-white text-center">Sections</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => setActiveSection('projects')}
                className="flex items-center gap-3 px-4 py-3 bg-[#ff6b6b]/20 hover:bg-[#ff6b6b]/40 rounded-lg transition-all text-white border border-[#ff6b6b]/50">
                <span>💼</span>
                <span>Projets</span>
              </button>
              <button onClick={() => setActiveSection('skills')}
                className="flex items-center gap-3 px-4 py-3 bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/40 rounded-lg transition-all text-white border border-[#4ecdc4]/50">
                <span>⚡</span>
                <span>Compétences</span>
              </button>
              <button onClick={() => setActiveSection('about')}
                className="flex items-center gap-3 px-4 py-3 bg-[#ffe66d]/20 hover:bg-[#ffe66d]/40 rounded-lg transition-all text-white border border-[#ffe66d]/50">
                <span>👨‍💻</span>
                <span>À propos</span>
              </button>
              <button onClick={() => setActiveSection('contact')}
                className="flex items-center gap-3 px-4 py-3 bg-[#a8e6cf]/20 hover:bg-[#a8e6cf]/40 rounded-lg transition-all text-white border border-[#a8e6cf]/50">
                <span>📬</span>
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>

        {activeSection && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {activeSection === 'projects' && '💼 Mes Projets'}
                  {activeSection === 'skills' && '⚡ Compétences'}
                  {activeSection === 'about' && '👨‍💻 À propos'}
                  {activeSection === 'contact' && '📬 Contact'}
                </h2>
                <button onClick={() => setActiveSection(null)} className="text-white hover:text-gray-300 text-2xl">✕</button>
              </div>
              
              <div className="text-gray-300 space-y-4">
                {activeSection === 'projects' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-2">Application Web Interactive</h3>
                      <p className="text-sm">Une application React avec des expériences 3D immersives.</p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-3 py-1 bg-[#ff6b6b]/20 rounded-full text-xs">React</span>
                        <span className="px-3 py-1 bg-[#4ecdc4]/20 rounded-full text-xs">Canvas</span>
                        <span className="px-3 py-1 bg-[#ffe66d]/20 rounded-full text-xs">TypeScript</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-2">Plateforme E-commerce</h3>
                      <p className="text-sm">Solution complète avec gestion des produits et paiement en ligne.</p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-3 py-1 bg-[#ff6b6b]/20 rounded-full text-xs">Next.js</span>
                        <span className="px-3 py-1 bg-[#4ecdc4]/20 rounded-full text-xs">Stripe</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'skills' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-white mb-2">Frontend</h3>
                      <ul className="text-sm space-y-1">
                        <li>• React / Next.js</li>
                        <li>• TypeScript</li>
                        <li>• Canvas / WebGL</li>
                        <li>• Tailwind CSS</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-white mb-2">Backend</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Node.js</li>
                        <li>• PostgreSQL</li>
                        <li>• REST API</li>
                        <li>• GraphQL</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-white mb-2">Outils</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Git / GitHub</li>
                        <li>• Docker</li>
                        <li>• VS Code</li>
                        <li>• Figma</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-white mb-2">3D / Creative</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Canvas 2D/3D</li>
                        <li>• WebGL</li>
                        <li>• Blender</li>
                        <li>• GSAP</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeSection === 'about' && (
                  <div className="space-y-4">
                    <p>Développeur créatif passionné par la création d'expériences web uniques et immersives. Spécialisé dans le développement frontend avec une expertise particulière en 3D et animations web.</p>
                    <p>J'aime explorer les possibilités infinies qu'offrent les technologies modernes comme Canvas, React et WebGL pour créer des interfaces qui sortent de l'ordinaire.</p>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-white mb-2">💡 Philosophie</h3>
                      <p className="text-sm">"Le web n'est pas seulement fonctionnel, il peut être magnifique, immersif et mémorable."</p>
                    </div>
                  </div>
                )}
                
                {activeSection === 'contact' && (
                  <div className="space-y-4">
                    <p>Intéressé par une collaboration ? N'hésitez pas à me contacter !</p>
                    <div className="space-y-3">
                      <a href="mailto:contact@example.com" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                        <span className="text-2xl">📧</span>
                        <div>
                          <div className="font-semibold text-white">Email</div>
                          <div className="text-sm">contact@example.com</div>
                        </div>
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                        <span className="text-2xl">💻</span>
                        <div>
                          <div className="font-semibold text-white">GitHub</div>
                          <div className="text-sm">@votre-username</div>
                        </div>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                        <span className="text-2xl">💼</span>
                        <div>
                          <div className="font-semibold text-white">LinkedIn</div>
                          <div className="text-sm">@votre-profil</div>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
