import Hero from "./components/Hero";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <div className="relative ">
      <Navbar/>
      <div className="max-w-6xl  mx-auto pt-20">
        <Hero/>

      </div>
     
    </div>
  );
}
