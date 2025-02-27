import Faqs from "./components/Faqs";
import Features from "./components/Features";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import {checkUser} from "../lib/checkUser"

const Home=async()=> {
  await checkUser();
  return (
    <div className="relative ">
      <Navbar/>
      <div className="max-w-6xl sm:mt-10  md:mt-0  mx-auto pt-20">
        <Hero/>
        <Features/>
        <HowItWorks/>
        <Faqs/>

      </div>
     
    </div>
  );
}

export default Home;
