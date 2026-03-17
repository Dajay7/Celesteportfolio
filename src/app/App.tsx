import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const projects = [
    {
      id: 1,
      title: "COSMIC BRANDING",
      category: "Brand Identity",
      year: "2026",
      image: "https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwYXJ0fGVufDF8fHx8MTc3MzczNjg4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#FF3366"
    },
    {
      id: 2,
      title: "URBAN SPACES",
      category: "Art Direction",
      year: "2026",
      image: "https://images.unsplash.com/photo-1634732957022-922f1c19d310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBibGFja3xlbnwxfHx8fDE3NzM3NjExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#00F0FF"
    },
    {
      id: 3,
      title: "NEON DREAMS",
      category: "Visual Design",
      year: "2025",
      image: "https://images.unsplash.com/photo-1772037440088-2ef162671434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ3JhZGllbnQlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzM3NjExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#FFD700"
    },
    {
      id: 4,
      title: "CREATIVE STUDIO",
      category: "Interior Design",
      year: "2025",
      image: "https://images.unsplash.com/photo-1763191213523-1489179a1088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzM3Mzk3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#9D4EDD"
    },
    {
      id: 5,
      title: "TYPE EXPERIMENT",
      category: "Typography",
      year: "2025",
      image: "https://images.unsplash.com/photo-1770581939371-326fc1537f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHR5cG9ncmFwaHklMjBwb3N0ZXJ8ZW58MXx8fHwxNzczNzYxMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#00FF88"
    },
    {
      id: 6,
      title: "ART INSTALLATION",
      category: "Exhibition",
      year: "2024",
      image: "https://images.unsplash.com/photo-1765376232529-a1aff86c6b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzczNzE4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#FF6B35"
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 mix-blend-difference"
      >
        <div className="flex items-center justify-between p-8">
          <motion.div
            className="text-2xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            ALEX TURNER
          </motion.div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-sm tracking-[0.2em] hover:tracking-[0.3em] transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </motion.nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 z-30 flex items-center justify-center"
          >
            <div className="grid grid-cols-1 gap-8 text-center">
              {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-6xl md:text-8xl font-bold tracking-tighter cursor-pointer hover:italic transition-all"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ opacity, scale }} className="text-center z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="text-sm tracking-[0.3em] mb-4 text-gray-400">ART DIRECTOR</div>
            <motion.h1
              className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              CREATIVE
            </motion.h1>
            <motion.h1
              className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter italic"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                background: 'linear-gradient(45deg, #FF3366, #00F0FF, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
              }}
            >
              VISION
            </motion.h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl tracking-wider max-w-2xl mx-auto px-4"
          >
            Crafting bold visual experiences that challenge conventions
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <motion.button
              className="px-8 py-4 border-2 border-white text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              EXPLORE WORK
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="min-h-screen py-32 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            SELECTED
          </h2>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic text-transparent"
              style={{
                WebkitTextStroke: '2px white',
              }}>
            WORKS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: project.color + '99' }}
                >
                  <span className="text-4xl font-bold">VIEW</span>
                </motion.div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 group-hover:italic transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 tracking-wider">{project.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-black opacity-20">{String(project.id).padStart(2, '0')}</div>
                  <div className="text-sm tracking-wider text-gray-400">{project.year}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen py-32 px-4 md:px-12 bg-gradient-to-br from-purple-950 via-black to-pink-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
                ABOUT
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6">
                I'm a creative director passionate about pushing boundaries and creating 
                <span className="italic font-bold text-pink-400"> unforgettable visual experiences</span>.
              </p>
              <p className="text-lg leading-relaxed text-gray-400 mb-8">
                With over 10 years in the industry, I've worked with global brands to 
                craft compelling narratives through bold design, innovative art direction, 
                and experimental typography.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                {[
                  { label: 'AWARDS', value: '24+' },
                  { label: 'PROJECTS', value: '150+' },
                  { label: 'CLIENTS', value: '60+' },
                  { label: 'YEARS', value: '10+' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-5xl font-black text-pink-400 mb-2">{stat.value}</div>
                    <div className="text-sm tracking-wider text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="relative z-10"
                whileHover={{ rotate: 3, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-lg" />
              </motion.div>
              <motion.div
                className="absolute top-8 left-8 w-full h-full border-4 border-white rounded-lg"
                initial={{ rotate: -5 }}
                whileHover={{ rotate: -8 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="min-h-screen py-32 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-20">SERVICES</h2>
          
          <div className="space-y-0">
            {[
              { title: 'BRAND IDENTITY', number: '01' },
              { title: 'ART DIRECTION', number: '02' },
              { title: 'VISUAL DESIGN', number: '03' },
              { title: 'CREATIVE STRATEGY', number: '04' },
              { title: 'TYPOGRAPHY', number: '05' },
            ].map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-gray-800 py-8 group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-4xl font-black text-gray-800 group-hover:text-pink-500 transition-colors">
                      {service.number}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter group-hover:translate-x-4 transition-transform">
                      {service.title}
                    </h3>
                  </div>
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ↗
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="min-h-screen py-32 px-4 md:px-12 bg-white text-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-8xl md:text-[12vw] font-black tracking-tighter mb-12 leading-none">
            LET'S
            <br />
            <span className="italic" style={{
              background: 'linear-gradient(45deg, #FF3366, #00F0FF, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              CREATE
            </span>
          </h2>
          
          <p className="text-2xl mb-12 tracking-wide">Something extraordinary together</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <motion.a
              href="mailto:alex@creative.studio"
              className="px-12 py-6 bg-black text-white text-xl font-bold tracking-wider hover:bg-pink-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              GET IN TOUCH
            </motion.a>
          </div>

          <div className="mt-16 flex justify-center gap-8 text-sm tracking-[0.2em]">
            {['INSTAGRAM', 'BEHANCE', 'LINKEDIN', 'DRIBBBLE'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="hover:text-pink-600 transition-colors"
                whileHover={{ y: -4 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-tighter">ALEX TURNER</div>
          <div className="text-sm tracking-wider text-gray-400">
            © 2026 ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
