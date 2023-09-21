import { Outlet } from 'react-router-dom';
// import SideBar from "./SideBar";
import Header from './Header';
import Footer from '../screens/Footer';
import Background from '../components/Background';

const Layout = () => {
  return (
    <main className="d-flex">
      {/* <div className="w-auto">
                <SideBar/>
            </div> */}

      <div className="col colfooter">
        <Header />
        <Background style={{ zIndex: 1 }} />
        <Outlet className="" style={{ zIndex: 5 }} />
        <div className="footermt">
          {' '}
          <Footer className="mt-5" />
        </div>
      </div>
    </main>
  );
};

export default Layout;
