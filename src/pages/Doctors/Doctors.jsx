
import React, { useEffect, useState } from "react";
import { BsSearch, BsSliders, BsChevronRight, BsChevronLeft, BsCheckLg, BsEye, BsPencil, BsTrash } from "react-icons/bs";
import _ from "lodash";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const DoctorsListTable = () => {
  const [searchByDoctor, setSearchByDoctor] = useState("");
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors from API
    axios.get("/api/admin/doctors").then(response => {
      setDoctors(response.data);
    });
  }, []);

  const handleBlockStatusChange = (doctorId, status) => {
    const userType = "doctor";
    const endpoint = status ? `/api/admin/block/${userType}/${doctorId}` : `/api/admin/unblock/${userType}/${doctorId}`;
    setDoctors(doctors.map(doctor =>
      doctor._id === doctorId ? { ...doctor, isBlocked: status } : doctor
    ));
    axios.put(endpoint).catch(error => {
      console.error("There was an error updating the doctor's block status!", error);
    });
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchByDoctor.toLowerCase())
  );

  const paginations = _.range(0, Math.ceil(filteredDoctors.length / 8));

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
         <h2>doctor</h2>
         <div className="path">
           <span>doctor</span>
           <span>
             <BsChevronRight />
           </span>
           <span>Doctors List</span>
         </div>
       </div>
     </div>
    <div className="doctor-list">
  
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
            {filteredDoctors.slice(startItem, endItem).map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.email}</td>
                <td style={{ textAlign: "center", color: '#5c59e8' }} className="fw-bolder">{doctor.phone}</td>
                <td style={{ textAlign: "center" }}>{doctor.gender}</td>
                <td className="actions d-flex justify-content-center align-items-center h-100">
                  <div style={dropdownContainerStyle}>
                    <select
                      onChange={(e) => handleBlockStatusChange(doctor._id, e.target.value === 'block')}
                      value={doctor.isBlocked ? 'block' : 'unblock'}
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
            {endItem < filteredDoctors.length ? (
              <span>
                Showing {startItem + 1}-{endItem} from {filteredDoctors.length}
              </span>
            ) : (
              <span>
                Showing {startItem + 1}-{filteredDoctors.length} from {filteredDoctors.length}
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
};

export default DoctorsListTable;
