import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes, useLocation } from "react-router-dom";
import "./components/dashboard.css";
import Home from "@pages/Home/Home";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import DoctorsListTable from "./pages/Doctors/Doctors";
import DoctorsStatusTable from "./pages/DoctorsStatus/DoctorsStatusTable";
import Login from "./pages/Login/Login.jsx";
import PatientsListTable from "./pages/Patient/PatientsListTable.jsx";
import ReportsListTable from "./pages/ReportsList/ReportsListTable";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";
import PublicRoute from "./components/publicRouting/PublicRoute.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <div className={'d-flex '}>

      {location.pathname !== "/login" &&
       <Sidebar />

       }

        <div className={' flex-grow-1 '}>
        {location.pathname !== "/login" && <Header />}
          <div>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
              </ProtectedRoute>

              } />
              <Route path="/patient" element={
                <ProtectedRoute>

              <PatientsListTable />
              </ProtectedRoute>

              } />
              <Route path="/doctor" element={
                <ProtectedRoute>
                
              <DoctorsListTable />
              </ProtectedRoute>

              } />
              <Route path="/doctorstatus" element={
                <ProtectedRoute>
                
              <DoctorsStatusTable />
              </ProtectedRoute>

              } />
              <Route path="/report" element={
                <ProtectedRoute>

              <ReportsListTable />
              </ProtectedRoute>
              
              } />
              <Route path="/login" element={
              <PublicRoute>
              <Login />
              </PublicRoute>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
