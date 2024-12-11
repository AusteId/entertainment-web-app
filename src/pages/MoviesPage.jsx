import { Search } from '../components/Search';
import NavBar from './../components/NavBar';

export default function MoviesPage() {
  return (
    <main className='max-w-screen-xl h-screen mx-auto border border-white p-1'>
      <div className='flex flex-col lg:flex-row h-full gap-1'>
        <NavBar />
        <div className='flex-1 border border-emerald-500'>
          <div className='w-full'>
            <Search />
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed saepe
              vitae cumque. Laborum veritatis minima natus magnam, aliquam rem
              nam cumque nobis dolores quaerat aut blanditiis fugiat velit
              tempore eius!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
