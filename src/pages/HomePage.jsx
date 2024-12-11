import { FormSwitcher } from '../components/FormSwitcher';
import { BasicCard } from '../components/shared/BasicCard';
import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';
import Navbar from '../components/NavBar';

export default function HomePage() {
  const userData = useUserContext();

  const handleLogout = () => {
    userData.setUserLoggedOut();
  };

  const handleSearch = () => {};

  return (
    <main className="max-w-screen-xl h-screen mx-auto">
      <div className="flex flex-col xl:flex-row">
        {/* Jei vartotojas prisijungęs, rodome Navbar */}
        {userData.userId && (
          <div className="lg:h-full z-10 top-0 sticky xl:p-2">
            <Navbar />
          </div>
        )}
        
        {/* Pagrindinis turinys */}
        <div className="flex-grow">
          {userData.userId ? (
            <div className="w-full flex flex-col gap-4 p-4">
              <Search onSearch={(searchString) => handleSearch(searchString)} />
              <h2 className="heading-lg text-white font-outfit mb-8">
                Recommended for you{' '}
                <span
                  onClick={() => handleLogout()}
                  className="text-red hover:underline cursor-pointer"
                >
                  Logout
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <BasicCard />
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <FormSwitcher />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
