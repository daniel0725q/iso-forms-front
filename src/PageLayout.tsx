import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const PageLayout = () => (
      <>
        <Sidebar />
        <div className='content'>
            <Outlet />
        </div>
      </>
);

export default PageLayout;