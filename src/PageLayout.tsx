import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';


const PageLayout = () => (
      <div style={{ display: 'flex' }}>
        <TopBar />
        <Sidebar />
        <div className='content' style={{ flex: 1 }}>
            <Outlet />
        </div>
      </div>
);

export default PageLayout;