import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const PageLayout = () => (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='content' style={{ flex: 1 }}>
            <Outlet />
        </div>
      </div>
);

export default PageLayout;