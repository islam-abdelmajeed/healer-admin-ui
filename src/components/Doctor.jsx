import { createContext } from "react";
import TitleOne from "../pages/Patient/TitleOne";
import PatientsListTable from "../pages/Patient/PatientsListTable";


export const DoctorContext = createContext();
function Doctor() {
  return (
    <div className="customer">
          <TitleOne />
          <PatientsListTable />
    </div>
  )
}
export default Doctor;


