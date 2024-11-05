import { HeroParallax } from "../components/ui/hero-parallex";
import { Button } from "@/components/ui/button"
import Anakin from '../assets/anakin.png';
import Crate from '../assets/crate.png';
import Friends from '../assets/friends.png';
import Avengers from '../assets/avengers.png';
import Narnia from '../assets/narnia.png';
import Space from '../assets/space.png';
import Tata from '../assets/Tata.png';

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: Anakin,
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: Crate,
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: Friends,
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: Avengers,
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:  Narnia,
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: Space,
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: Tata,
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:  Anakin,
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:  Crate,
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:  Friends,
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:  Avengers,
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:  Narnia,
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:  Space,
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:  Tata,
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:  Anakin,
  },
];

export default function LandingPage2() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">YourLogo</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Home</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/about">About</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/contact">Contact</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="outline">Login</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-background to-background/80 py-24 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
                Monetisation on Twitter Made Easy.
              </span>
              <br />
              For Everyone
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground mt-6 text-xl">
              Unlock the potential of your Twitter presence and start earning today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
              The possibilities are endless
            </h2>
            <HeroParallax products={products} />
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 YourCompany. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}