import {
  BriefcaseBusiness,
  ExternalLink,
  Image,
  Linkedin,
  Mail,
  Menu,
  PenLine,
  Send,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";

const services = [
  {
    title: "Branding",
    description:
      "Presentation of identity creation projects around a brand or a brand universe.",
    icon: PenLine,
  },
  {
    title: "Ui Design",
    description: "UI Design projects for various digital client accounts.",
    icon: Smartphone,
  },
  {
    title: "Graphic Design",
    description:
      "Creation of graphic projects and development of advertising campaigns.",
    icon: Image,
  },
];

const references = [
  "Lacoste",
  "change_",
  "elite",
  "BNP Paribas",
  "Carrefour",
  "Unibail",
  "Le Carrousel",
  "sante magazine",
  "Mitsubishi Electric",
];

const navItems = ["Home", "Portfolio", "About", "Contact"];

function Logo() {
  return (
    <a
      href="#home"
      aria-label="Jean-Jacques Celeste home"
      className="grid h-12 w-8 place-items-center border-2 border-[#65ff24] text-[#65ff24] shadow-[0_0_18px_rgba(101,255,36,0.45)]"
    >
      <span className="relative h-8 w-5">
        <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-current" />
        <span className="absolute left-1/2 top-4 h-4 w-0.5 -translate-x-1/2 bg-current" />
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-current" />
        <span className="absolute bottom-2 left-0 h-0.5 w-2 bg-current" />
      </span>
    </a>
  );
}

function NeonButton({
  children,
  href,
  large = false,
}: {
  children: ReactNode;
  href: string;
  large?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-fuchsia-300/80 bg-white/10 font-bold uppercase tracking-wide text-[#ff45df] shadow-[inset_0_0_18px_rgba(255,255,255,0.25),0_0_18px_rgba(255,69,223,0.7)] transition hover:bg-fuchsia-400/20 hover:text-white ${
        large ? "min-h-16 px-12 text-lg" : "min-h-10 px-9 text-xs"
      }`}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#220949] text-white">
      <section
        id="home"
        className="relative min-h-[880px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(30, 0, 56, 0.96) 0%, rgba(52, 5, 92, 0.7) 43%, rgba(37, 8, 89, 0.38) 100%), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85')",
        }}
      >
        <header className="fixed left-0 right-0 top-0 z-40 bg-[#2b0b58]/92 shadow-[0_10px_28px_rgba(9,0,24,0.45)] backdrop-blur">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
            <Logo />

            <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="transition hover:text-[#65ff24]"
                >
                  {item}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              className="grid h-11 w-11 place-items-center rounded-full text-[#ff45df] transition hover:bg-white/10"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-white/10 bg-[#2b0b58]/95 px-6 py-5 md:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-4 text-sm font-semibold">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full px-4 py-3 transition hover:bg-white/10 hover:text-[#65ff24]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </header>

        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-32 md:px-10 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="mb-1 text-5xl font-light leading-none text-[#ff45df] [text-shadow:0_0_18px_rgba(255,69,223,0.65)] md:text-6xl">
              Jean-Jacques
            </p>
            <h1 className="text-[4.8rem] font-black uppercase leading-[0.88] tracking-tight text-[#ff45df] [text-shadow:0_0_24px_rgba(255,69,223,0.45)] sm:text-8xl md:text-[8.4rem]">
              Celeste
            </h1>
            <p className="mt-8 text-2xl font-semibold text-[#65ff24]">
              Directeur Artistique / UI designer
            </p>

            <div className="mt-9 flex flex-wrap gap-9">
              <NeonButton href="#about">Resume</NeonButton>
              <NeonButton href="#portfolio">Portfolio</NeonButton>
            </div>
          </motion.div>

          <div className="mt-auto grid gap-5 lg:grid-cols-3 lg:px-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="rounded-2xl bg-[#54218c]/86 p-8 shadow-[0_18px_60px_rgba(15,0,42,0.45)] backdrop-blur-md"
                >
                  <Icon className="mb-4 h-11 w-11 text-[#65ff24]" strokeWidth={1.8} />
                  <h2 className="mb-5 text-2xl font-semibold text-violet-100">
                    {service.title}
                  </h2>
                  <p className="min-h-14 max-w-sm text-sm leading-6 text-violet-100/76">
                    {service.description}
                  </p>
                  <a
                    href="#portfolio"
                    className="mt-5 inline-flex items-center gap-2 text-lg font-black text-[#ff45df] transition hover:text-[#65ff24]"
                  >
                    Know more <ExternalLink className="h-4 w-4" />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#4b2784] via-[#7c36c8] to-[#3b0d75] py-7 shadow-[0_-16px_45px_rgba(20,0,54,0.45)]">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <p className="mb-6 text-base">
            <span className="text-[#65ff24]">P</span>rofessional References
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-lg font-black text-white/35 grayscale">
            {references.map((reference) => (
              <span key={reference}>{reference}</span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="bg-[radial-gradient(circle_at_56%_35%,rgba(89,138,235,0.35),transparent_26%),linear-gradient(120deg,#2f0b62_0%,#442087_52%,#24074a_100%)] py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-[0.95fr_1.05fr] md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-6 rounded-[2rem] bg-violet-200/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=950&q=80"
              alt="Creative desk illustration"
              className="relative h-full w-full rounded-[2rem] object-cover opacity-70 mix-blend-screen saturate-50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h2 className="mb-12 text-7xl font-light leading-none md:text-8xl">
              <span className="font-black text-[#65ff24]">P</span>ortfolio
            </h2>
            <p className="mb-8 text-2xl font-medium text-violet-100">
              Come See Closer !
            </p>
            <p className="mx-auto mb-10 max-w-xl text-base leading-8 text-violet-100/86 md:ml-auto">
              immerse yourself in my creative universe where each pixel, each
              line, tells a unique story. welcome to my portfolio, where art and
              graphic design meet to inspire and captivate
            </p>
            <NeonButton href="#contact">Works & projects</NeonButton>
          </motion.div>
        </div>
      </section>

      <section className="h-40 bg-[radial-gradient(circle_at_58%_20%,rgba(135,100,244,0.85),transparent_26%),linear-gradient(120deg,#3b0e72,#7748bd_55%,#2d075d)] md:h-56" />

      <section
        id="about"
        className="bg-[radial-gradient(circle_at_55%_35%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(120deg,#2c075d_0%,#5a2394_50%,#32115d_100%)] py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-[1fr_0.9fr] md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-16 text-7xl font-light leading-none md:text-8xl">
              <span className="font-black text-[#65ff24]">A</span>bout Me
            </h2>
            <h3 className="mb-9 text-2xl font-black text-violet-100">Hello !</h3>
            <p className="max-w-xl text-base leading-8 text-violet-100/88">
              welcome to my website! with over 20 years' experience as an art
              director and web designer based in paris, i'm passionate about
              creating compelling visual experiences for the web. explore my
              portfolio to discover how i can bring your online project to life
              with a unique artistic touch. together, let's turn your vision
              into a remarkable digital reality.
            </p>

            <div className="mt-14 flex items-center gap-3">
              <span className="h-12 w-12 rounded-full border border-fuchsia-300 bg-fuchsia-400/20 shadow-[0_0_18px_rgba(255,69,223,0.85)]" />
              <span className="h-1 w-full max-w-sm rounded-full bg-violet-200/55 shadow-[0_0_12px_rgba(255,255,255,0.55)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-8 rounded-full bg-violet-100/15 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=850&q=80"
              alt="Designer working with digital devices"
              className="relative aspect-[4/3] w-full rounded-2xl object-cover opacity-60 mix-blend-screen saturate-50"
            />
          </motion.div>
        </div>
      </section>

      <section className="h-44 bg-[radial-gradient(circle_at_55%_30%,rgba(151,112,246,0.9),transparent_28%),linear-gradient(120deg,#2c075d,#7c4fc5_55%,#2f085d)] md:h-64" />

      <section
        id="contact"
        className="bg-[radial-gradient(circle_at_52%_35%,rgba(138,87,214,0.65),transparent_24%),linear-gradient(120deg,#25064d,#57338e_55%,#26074f)] px-6 py-28 text-center md:px-10 md:py-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <p className="text-6xl font-light uppercase leading-none md:text-7xl">
            Let&apos;s
          </p>
          <h2 className="text-7xl font-black uppercase leading-none text-[#65ff24] md:text-9xl">
            Create
          </h2>
          <p className="mt-8 text-3xl font-light text-violet-100 md:text-4xl">
            Something Extraordinary Together
          </p>
          <div className="mt-12">
            <NeonButton href="mailto:contact@jeanjacquesceleste.com" large>
              Get in touch
            </NeonButton>
          </div>
          <div className="mt-10 flex justify-center gap-5 text-[#65ff24]">
            {[Linkedin, Send, Mail, BriefcaseBusiness].map((Icon, index) => (
              <a
                key={index}
                href="#contact"
                className="grid h-7 w-7 place-items-center rounded border border-current transition hover:bg-[#65ff24] hover:text-[#220949]"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#24074a] px-6 py-9 text-center shadow-[0_-12px_30px_rgba(12,0,35,0.35)] md:px-10">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-8 text-sm text-violet-100/80">
          <a href="#home" className="transition hover:text-[#65ff24]">
            Home
          </a>
          <a href="#about" className="transition hover:text-[#65ff24]">
            About
          </a>
          <Logo />
          <a href="#portfolio" className="transition hover:text-[#65ff24]">
            Portfolio
          </a>
          <a href="#contact" className="transition hover:text-[#65ff24]">
            Contact
          </a>
        </div>
        <a
          href="#home"
          className="mt-7 inline-block text-sm text-[#ff45df] transition hover:text-[#65ff24]"
        >
          Mentions Légales
        </a>
      </footer>
    </main>
  );
}
