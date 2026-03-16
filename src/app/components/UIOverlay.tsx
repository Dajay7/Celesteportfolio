import { useState } from 'react';
import { Github, Linkedin, Mail, Code2, Briefcase, User, MessageSquare } from 'lucide-react';

export function UIOverlay() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Header */}
      <header className="p-8 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Portfolio 3D</h1>
            <p className="text-gray-300">Développeur Créatif</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Mail className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </header>

      {/* Instructions */}
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
            <div className="flex items-center gap-3 pt-2 border-t border-white/20">
              <span className="text-xs text-gray-300">Utilisez la souris pour faire pivoter la caméra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des sections */}
      <div className="absolute bottom-8 right-8 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-4">
          <h3 className="font-semibold mb-4 text-white text-center">Sections</h3>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setActiveSection('projects')}
              className="flex items-center gap-3 px-4 py-3 bg-[#ff6b6b]/20 hover:bg-[#ff6b6b]/40 rounded-lg transition-all text-white border border-[#ff6b6b]/50"
            >
              <Briefcase className="w-5 h-5" />
              <span>Projets</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('skills')}
              className="flex items-center gap-3 px-4 py-3 bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/40 rounded-lg transition-all text-white border border-[#4ecdc4]/50"
            >
              <Code2 className="w-5 h-5" />
              <span>Compétences</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('about')}
              className="flex items-center gap-3 px-4 py-3 bg-[#ffe66d]/20 hover:bg-[#ffe66d]/40 rounded-lg transition-all text-white border border-[#ffe66d]/50"
            >
              <User className="w-5 h-5" />
              <span>À propos</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('contact')}
              className="flex items-center gap-3 px-4 py-3 bg-[#a8e6cf]/20 hover:bg-[#a8e6cf]/40 rounded-lg transition-all text-white border border-[#a8e6cf]/50"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de section */}
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
              <button 
                onClick={() => setActiveSection(null)}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="text-gray-300 space-y-4">
              {activeSection === 'projects' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Application Web Interactive</h3>
                    <p className="text-sm">Une application React avec Three.js pour des expériences 3D immersives.</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-3 py-1 bg-[#ff6b6b]/20 rounded-full text-xs">React</span>
                      <span className="px-3 py-1 bg-[#4ecdc4]/20 rounded-full text-xs">Three.js</span>
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
                      <li>• Three.js / WebGL</li>
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
                      <li>• Three.js</li>
                      <li>• React Three Fiber</li>
                      <li>• Blender</li>
                      <li>• GSAP</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeSection === 'about' && (
                <div className="space-y-4">
                  <p>
                    Développeur créatif passionné par la création d'expériences web uniques et immersives. 
                    Spécialisé dans le développement frontend avec une expertise particulière en 3D et animations web.
                  </p>
                  <p>
                    J'aime explorer les possibilités infinies qu'offrent les technologies modernes comme 
                    Three.js, React et WebGL pour créer des interfaces qui sortent de l'ordinaire.
                  </p>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-white mb-2">💡 Philosophie</h3>
                    <p className="text-sm">
                      "Le web n'est pas seulement fonctionnel, il peut être magnifique, immersif et mémorable."
                    </p>
                  </div>
                </div>
              )}
              
              {activeSection === 'contact' && (
                <div className="space-y-4">
                  <p>Intéressé par une collaboration ? N'hésitez pas à me contacter !</p>
                  <div className="space-y-3">
                    <a href="mailto:contact@example.com" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <Mail className="w-6 h-6 text-[#a8e6cf]" />
                      <div>
                        <div className="font-semibold text-white">Email</div>
                        <div className="text-sm">contact@example.com</div>
                      </div>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <Github className="w-6 h-6 text-[#a8e6cf]" />
                      <div>
                        <div className="font-semibold text-white">GitHub</div>
                        <div className="text-sm">@votre-username</div>
                      </div>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <Linkedin className="w-6 h-6 text-[#a8e6cf]" />
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
  );
}
