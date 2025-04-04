import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default LayoutAdmin; 