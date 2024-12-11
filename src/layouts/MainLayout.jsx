import { Outlet } from 'react-router';
import { useUserContext } from '../service/UserContextProvider';
import Navbar from '../components/NavBar';
import { FormSwitcher } from '../components/FormSwitcher';

export const MainLayout = () => {
  const userData = useUserContext();

  return (
    <main className='max-w-screen-xl h-screen mx-auto'>
      {userData.userId ? (
        <>
          <div className='flex flex-col lg:flex-row h-full'>
            <Navbar />
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='max-w-md mx-auto'>
            <FormSwitcher />
          </div>
        </>
      )}
    </main>
  );
};
