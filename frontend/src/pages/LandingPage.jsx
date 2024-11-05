import { HeroParallax } from "../components/ui/hero-parallex";
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

const LandingPage = () => {
  return (
    <div>

      <div className="h-16 w-full bg-black">
        <div className="flex text-white justify-between items-center h-full px-4 sm:px-8 md:px-16 lg:px-20">
          <div className="text-black">Logo</div>
          <div className="flex gap-4">
            <div >Home</div>
            <div >About</div>
            <div >Contact</div>
            <div >Login</div>
          </div>
        </div>
      </div>

      <div className="bg-[#1B1D23] h-screen w-full items-center flex flex-col">
        <div className="mt-32 flex flex-col gap-3">
          <h1 className="text-white text-center font-bold text-5xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Monetisation on Twitter Made Easy.</h1>
          <h1 className="text-white text-center font-bold text-5xl">For Everyone</h1>
        </div>
      </div>

      <div className="bg-[#15202b] w-full px-10 py-6 flex flex-col gap-3">
        <h2 className="font-bold text-white text-2xl px-10 ">The possibilities are endless</h2>
        <div className="h-[400px] overflow-x-auto flex gap-4 no-scrollbar">
          <img src={Anakin} alt="" className="h-full"/>
          <img src={Crate} alt="" className="h-full"/>
          <img src={Friends} alt="" className="h-full"/>
          <img src={Avengers} alt="" className="h-full"/>
          <img src={Narnia} alt="" className="h-full"/>
          <img src={Space} alt="" className="h-full"/>
          <img src={Tata} alt="" className="h-full"/>
        </div>
      </div>
      {/* <HeroParallax products={products} />; */}

    </div>
  )
}

export default LandingPage;