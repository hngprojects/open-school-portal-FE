import HomeForWho from "./_components/HomeForWho";
import HomeHero from "./_components/HomeHero";
import HomeWhyUs from "./_components/HomeWhyUs";

export default function Home() {
  return (
    <div className="min-h-screen">
     <HomeHero />
     <HomeWhyUs	 />
		 <HomeForWho />
    </div>
  )
}
