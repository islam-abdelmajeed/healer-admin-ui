import React, { useEffect, useState } from "react";
import { BsChevronRight, BsChevronLeft, BsSearch, BsSliders } from "react-icons/bs";
import axios from "../../axios.js";

function ReportsListTable() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);

  useEffect(() => {
    // Fetch reports from API
    axios.get('/api/report/all').then(response => {
      setReports(response.data);
    }).catch(error => {
      console.error("There was an error fetching the reports!", error);
    });
  }, []);

  const filteredReports = reports.filter(report => 
    report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    report.reported.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginations = Array.from({ length: Math.ceil(filteredReports.length / 8) }, (_, i) => i);

  const editCulc = (value) => {
    setStartItem((value - 1) * 8);
    setEndItem(value * 8);
  };

  return (
    <>
    <div className="title d-flex justify-content-between align-items-center">
    <div>
       <h2>Report</h2>
       <div className="path">
         <span>Report</span>
         <span>
           <BsChevronRight />
         </span>
         <span>Reports List</span>
       </div>
     </div>
   </div>
    <div className="report-list">
      <div className="table">
        <table className="">
          <thead>
            <tr className="" style={{ background: '#f9f9fc' }}>
              <td>Reporter Name</td>
              <td>Reporter Email</td>
              <td>Reporter Model</td>
              <td>Reported Name</td>
              <td>Reported Email</td>
              <td>Reported Model</td>
              <td>Reason</td>
              <td>Details</td>
              <td>Created At</td>
            </tr>
          </thead>
          <tbody>
            {filteredReports.slice(startItem, endItem).map((report) => (
              <tr key={report._id}>
                <td>{report.reporter.name}</td>
                <td>{report.reporter.email}</td>
                <td>{report.reporterModel}</td>
                <td>{report.reported.name}</td>
                <td>{report.reported.email}</td>
                <td>{report.reportedModel}</td>
                <td>{report.reason}</td>
                <td>{report.details}</td>
                <td>{new Date(report.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tfooter">
          <div className="showing">
            {endItem < filteredReports.length ? (
              <span>
                Showing {startItem + 1}-{endItem} from {filteredReports.length}
              </span>
            ) : (
              <span>
                Showing {startItem + 1}-{filteredReports.length} from {filteredReports.length}
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

export default ReportsListTable;
