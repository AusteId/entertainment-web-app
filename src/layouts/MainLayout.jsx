import { Outlet } from 'react-router';
import { useUserContext } from '../service/UserContextProvider';
import Navbar from '../components/NavBar';
import { FormSwitcher } from '../components/FormSwitcher';

export const MainLayout = () => {
  const userData = useUserContext();

  return (
    <main className='max-w-[1440px] h-screen mx-auto'>
      {userData.userId ? (
        <>
          <div className='flex flex-col xl:flex-row'>
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
