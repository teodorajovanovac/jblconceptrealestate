import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 