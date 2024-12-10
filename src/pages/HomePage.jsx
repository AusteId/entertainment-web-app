import { BasicCard } from "../components/shared/BasicCard";
import NavBar from "./../components/NavBar";

export default function HomePage() {
  return (
    <>
    <NavBar />
    <main>
      <h1 className='heading-lg'>Home page cia</h1>
    </main>
    <div>
    <h2 className="heading-lg text-white font-outfit mb-8">Recommended for you</h2>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
    <BasicCard />
    </div>
    </div>
    </>
  );
}
