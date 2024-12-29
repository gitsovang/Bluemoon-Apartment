import {React} from 'react'
import Homes from './homes/Homes'
import { Routes, Route} from 'react-router-dom';
import Abouts from './abouts/Abouts';
import NotFound from './components/NotFound';
import Admindashboard from './Admin/Admindashboard';
import UserFee from './Admin/UserFee';
import Statistic from './Admin/Statistic';
import UserInfo from './Admin/UserInfo';
import Report from './Admin/Report';
import UserDashBoard from './User/UserDashBoard';
import UserInform from './User/UserInform';
import UserSeeFee from './User/UserSeeFee';
import AdminRoute from './Routes/AdminRoute';
import UserRoute from './Routes/UserRoute';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/about" element={<Abouts />} />
        <Route path="*" element={<NotFound />} />
        {/* Admin Route */}
        <Route path="/userfee" 
        element = {
          <AdminRoute path="/userfee" element={<UserFee/>} />
        }
        />
        <Route path="/admin" 
        element = {
          <AdminRoute path="/admin" element={<Admindashboard />} />
        }
        />
        <Route path="/statistic" 
        element = {
          <AdminRoute path="/statistic" element={<Statistic/>} />
        }/>
        <Route path="/userinfo" 
        element = {
          <AdminRoute path="/userinfo" element={<UserInfo/>} />
        }/>
        <Route path="/report" 
        element = {
          <AdminRoute path="/report" element={<Report/>} />
        }
        />
        {/* User Route */}
        <Route path="/user" 
        element = {
          <UserRoute path="/user" element={<UserDashBoard/>} />
        }/>
        <Route path="/info" 
        element = {
          <UserRoute path="/info" element={<UserInform/>} />
        }/>
        <Route path="/fee" 
        element = {
          <UserRoute path="/fee" element={<UserSeeFee/>} />
        }/>
      </Routes>
    </> 
  )
}

export default App;
