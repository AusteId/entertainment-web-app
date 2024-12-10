import { FormSwitcher } from '../components/FormSwitcher';
import { BasicCard } from '../components/shared/BasicCard';
import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';

export default function HomePage() {
  const userData = useUserContext();

  const handleLogout = () => {
    userData.setUserLoggedOut();
  };

  const handleSearch = () => {};

  return (
    <main className='lg:flex-col lg:flex gap-3 p-4'>
      {userData.userId ? (
        <>
          <div className='flex-1'>
            <div className='w-full flex flex-col gap-4 body-md p-4'>
              <Search onSearch={(searchString) => handleSearch(searchString)} />
              <h2 className='heading-lg text-white font-outfit mb-8'>
                Recommended for you{' '}
                <span
                  onClick={() => handleLogout()}
                  className='text-red hover:underline cursor-pointer'
                >
                  Logout
                </span>
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                <BasicCard />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='max-w-md mx-auto'>
          <FormSwitcher />
        </div>
      )}
    </main>
  );
}
