import { Outlet } from 'react-router-dom';
// import SideBar from "./SideBar";
import Header from './Header';
import Footer from '../screens/Footer';

const Layout = () => {
  return (
    <main className="d-flex">
      {/* <div className="w-auto">
                <SideBar/>
            </div> */}

      <div className="col colfooter">
        <Header />
        <Outlet />
        <div className="footermt">
          {' '}
          <Footer className="mt-5" />
        </div>
      </div>
    </main>
  );
};

export default Layout;
