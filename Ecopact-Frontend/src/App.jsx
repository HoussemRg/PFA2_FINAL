import 'normalize.css';
import {Routes,Route,Navigate,useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboards/Dashboard';
import './index.css'
import { ToastContainer } from "react-toastify";
import { SidebarNav } from './components/SidebarNav';
import {useSelector} from 'react-redux'
import ShowUser from './pages/ShowUser';
import DeleteUser from './pages/DeleteUser';
import UpdateUser from './pages/UpdateUser';
import VerifyEmail from './pages/VerifyEmail';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import ThresholdExceededReport from './pages/Reports/ThresholdExceededReport';
import ClientThresholdExceededReport from './pages/Reports/ClientThresholdExceededReport';
import NH4HistoryRates from './pages/Dashboards/NH4HistoryRates';
import PxOyHistoryRates from './pages/Dashboards/PxOyHistoryRates';
import NO3HistoryRates from './pages/Dashboards/NO3HistoryRates';
import NH4PredictionRates from './pages/Dashboards/NH4PredictionRates';
import PxOyPredictionRates from './pages/Dashboards/PxOyPredictionRates';
import NO3PredictionRates from './pages/Dashboards/NO3PredictionRates';
import ANPEAlertList from './pages/ALertLists/ANPEAlertList';
import ClientAlertsList from './pages/ALertLists/ClientAlertsList';
import NotFound from './pages/NotFound';


function App() {
  const user=useSelector(state => state.auth.user);
  const location=useLocation();
  const isDashboardRoute = location.pathname.includes('/Dashboard');
  
  return (
      
      <div className={isDashboardRoute ? 'flex' : ''}>
        <ToastContainer theme="colored" position="top-center" />
        {isDashboardRoute && <SidebarNav />}
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Admin' element={user && user.isAdmin ? <AdminDashboard/> : <Navigate to="/" />} ></Route>
        <Route path='/Register' element={ <Register/>} />
        <Route path='/Login' element={!user ? <Login/> : user.isAdmin  ? <Navigate to="/Admin" /> : <Navigate to="/" /> }/>
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Dashboard' element={user && !user.isAdmin ? <Dashboard/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/NH4HistoyRates' element={user && !user.isAdmin  ? <NH4HistoryRates/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/PxOyHistoyRates' element={user && !user.isAdmin  ? <PxOyHistoryRates/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/NO3HistoyRates' element={user && !user.isAdmin  ? <NO3HistoryRates/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/NH4PredictionRates' element={user && !user.isAdmin  ? <NH4PredictionRates/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/PxOyPredictionRates' element={user && !user.isAdmin  ? <PxOyPredictionRates/> : <Navigate to="/" />} ></Route>
        <Route path='/Dashboard/NO3PredictionRates' element={user && !user.isAdmin  ? <NO3PredictionRates/> : <Navigate to="/" />} ></Route>
        
        <Route path={`/users/details/:id`} element={user ? <ShowUser/> : <Navigate to="/" /> } ></Route>
        <Route path={`/users/delete/:id`} element={user ? <DeleteUser/> : <Navigate to="/" /> } ></Route>
        <Route path={`/users/edit/:id`} element={user   ? <UpdateUser/> : <Navigate to="/" /> } ></Route>

        <Route path={`/alerts/ANPE/alertList`} element={ <ANPEAlertList/>  } ></Route>
        <Route path={`/alerts/client/alertList`} element={ <ClientAlertsList/>  } ></Route>
        <Route path={`/alerts/report/:id`} element={ <ThresholdExceededReport/>  } ></Route>
        <Route path={`/alerts/client/report/:id`} element={ <ClientThresholdExceededReport/>  } ></Route>

        

        <Route path='*' element={<NotFound />} />
      </Routes>
      </div>
      
    
  )
}

export default App