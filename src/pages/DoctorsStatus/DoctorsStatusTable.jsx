import React, { useEffect, useState } from "react";
import { BsChevronRight, BsChevronLeft, BsSearch, BsSliders } from "react-icons/bs";
import axios from "../../axios.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function DoctorsStatusTable() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [Refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch doctors from API
    axios.get('api/admin/doctors/pending-documents').then(response => {
      setDoctors(response.data);
    });
  }, [Refreshing]);

  const handleBlockStatusChange = (doctorId, status) => {
    const userType = 'doctor';
    const endpoint = status ? `/api/admin/block/${userType}/${doctorId}` : `/api/admin/unblock/${userType}/${doctorId}`;
    setDoctors(doctors.map(doctor => 
      doctor._id === doctorId ? { ...doctor, isBlocked: status } : doctor
    ));
    axios.put(endpoint).catch(error => {
      console.error("There was an error updating the doctor's block status!", error);
    });
  };

  const handleDocumentsAcceptedChange = (doctorId, status) => {
    const endpoint = status ? `/api/admin/doctors/${doctorId}/accept` : `/api/admin/doctors/${doctorId}/reject`;
    setDoctors(doctors.map(doctor => 
      doctor._id === doctorId ? { ...doctor, isDocumentsAccepted: status } : doctor
    ));
    axios.post(endpoint).then((response)=>{setRefreshing((prev)=>{return !prev})}).catch(error => {
      console.error("There was an error updating the doctor's documents status!", error);
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginations = Array.from({ length: Math.ceil(filteredDoctors.length / 8) }, (_, i) => i);

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
       <h2>Doctor Status</h2>
       <div className="path">
         <span>Doctor Status</span>
         <span>
           <BsChevronRight />
         </span>
         <span>Doctor Status List</span>
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
              <td>License Document</td>
              <td>Insurance Document</td>
              <td>Documents Accepted</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.slice(startItem, endItem).map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.email}</td>
                <td style={{ textAlign: "center", color: '#5c59e8' }} className="fw-bolder">{doctor.phone}</td>
                <td style={{ textAlign: "center" }}>{doctor.gender}</td>
                <td style={{ textAlign: "center" }}>
                  {doctor.licenseDocument && 
                    <img 
                      src={doctor.licenseDocument} 
                      alt="License Document" 
                      style={{ cursor: 'pointer', width: '50px', height: '50px' }} 
                      onClick={() => openModal(doctor.licenseDocument)} 
                    />}
                </td>
                <td style={{ textAlign: "center" }}>
                  {doctor.insuranceDocument && 
                    <img 
                      src={doctor.insuranceDocument}
                      alt="Insurance Document" 
                      style={{ cursor: 'pointer', width: '50px', height: '50px' }} 
                      onClick={() => openModal(doctor.insuranceDocument)} 
                    />}
                </td>
                <td className="actions d-flex justify-content-center align-items-center h-100">
                  <div style={dropdownContainerStyle}>
                    <select
                      onChange={(e) => handleDocumentsAcceptedChange(doctor._id, e.target.value === 'true')}
                      value={doctor.isDocumentsAccepted ? 'true' : 'false'}
                      style={dropdownStyle}
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                    <span style={arrowStyle}></span>
                  </div>
                </td>

                <td>
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
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Document Modal"
      >
        <h2>Document</h2>
        <img src={selectedImage} alt="Document" style={{ width: '100%' }} />
        <button className="btn btn-outline-danger mt-2" onClick={closeModal}>Close</button>
      </Modal>
      <ToastContainer />
    </div>
    </>
  );
}

export default DoctorsStatusTable;
