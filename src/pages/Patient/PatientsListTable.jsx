import React, { useEffect, useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import axios from "../../axios.js";

function PatientsListTable() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);

  useEffect(() => {
    // Fetch patients from API
    axios.get('/api/admin/patients').then(response => {
      setPatients(response.data);
    });
  }, []);

  const handleBlockStatusChange = (patientId, status) => {
    const userType = 'patient';
    const endpoint = status ? `/api/admin/block/${userType}/${patientId}` : `/api/admin/unblock/${userType}/${patientId}`;
    setPatients(patients.map(patient => 
      patient._id === patientId ? { ...patient, isBlocked: status } : patient
    ));
    axios.put(endpoint).catch(error => {
      console.error("There was an error updating the patient's block status!", error);
    });
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginations = Array.from({ length: Math.ceil(filteredPatients.length / 8) }, (_, i) => i);

  const editCulc = (value) => {
    setStartItem((value - 1) * 8);
    setEndItem(value * 8);
  };

  const dropdownStyle = {
    appearance: "none",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    outline: "none",
    position: "relative",
    display: "inline-block"
  };

  const dropdownContainerStyle = {
    position: "relative",
    display: "inline-block"
  };

  const arrowStyle = {
    content: "'\\25BC'",
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#333"
  };

  return (
   <>
    <div className="title d-flex justify-content-between align-items-center">
    <div>
       <h2>Patient</h2>
       <div className="path">
         <span>Patient</span>
         <span>
           <BsChevronRight />
         </span>
         <span>Patients List</span>
       </div>
     </div>
   </div>
    <div className="patient-list">
      <div className="inps d-flex justify-content-between">
        {/* Search and filter components can go here */}
      </div>
      <div className="table">
        <table className="">
          <thead>
            <tr className="" style={{ background: '#f9f9fc' }}>
              <td>Email</td>
              <td>Phone</td>
              <td>Gender</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.slice(startItem, endItem).map((patient) => (
              <tr key={patient._id}>
                <td>{patient.email}</td>
                <td style={{ textAlign: "center", color: '#5c59e8' }} className="fw-bolder">{patient.phone}</td>
                <td style={{ textAlign: "center" }}>{patient.gender}</td>
                <td className="actions d-flex justify-content-center align-items-center h-100">
                  <div style={dropdownContainerStyle}>
                    <select
                      onChange={(e) => handleBlockStatusChange(patient._id, e.target.value === 'block')}
                      value={patient.isBlocked ? 'block' : 'unblock'}
                      style={dropdownStyle}
                    >
                      <option value="unblock">Unblock</option>
                      <option value="block">Block</option>
                    </select>
                    <span style={arrowStyle}></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tfooter">
          <div className="showing">
            {endItem < filteredPatients.length ? (
              <span>
                Showing {startItem + 1}-{endItem} from {filteredPatients.length}
              </span>
            ) : (
              <span>
                Showing {startItem + 1}-{filteredPatients.length} from {filteredPatients.length}
              </span>
            )}
          </div>
          <ul>
            <li
              onClick={() => {
                if (startItem >= 8) {
                  setStartItem(startItem - 8);
                  setEndItem(endItem - 8);
                }
              }}
            >
              <BsChevronLeft />
            </li>
            {paginations.map((value) => (
              <li
                key={value}
                className={`${startItem === value * 8 && "active"}`}
                onClick={() => editCulc(value + 1)}
              >
                {value + 1}
              </li>
            ))}
            <li
              onClick={() => {
                if (startItem <= 8 * (paginations.length - 2)) {
                  setStartItem(startItem + 8);
                  setEndItem(endItem + 8);
                }
              }}
            >
              <BsChevronRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
   </>
  );
}

export default PatientsListTable;
