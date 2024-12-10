import { Outlet } from 'react-router';
import Navbar from '../components/NavBar';

export const MainLayout = () => {
  return (
    <div className="lg:flex lg:h-screen">
      {/* Sidebar */}
      <Navbar />
      {/* Main content area */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
