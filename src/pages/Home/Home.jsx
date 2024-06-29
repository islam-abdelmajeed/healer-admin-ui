import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import axios from "../../axios.js";
import styles from "./home.module.scss";

export const data = [
  {
    name: 'Jan',
    uv: 1000,
  },
  {
    name: 'Feb',
    uv: 400,
  },
  {
    name: 'Mar',
    uv: 4000,
  },
  {
    name: 'Apr',
    uv: 3000,
  },
  {
    name: 'May',
    uv: 2000,
  },
  {
    name: 'Jun',
    uv: 2780,
  },
  {
    name: 'Jul',
    uv: 1890,
  },
  {
    name: 'Aug',
    uv: 2390,
  },
  {
    name: 'Sep',
    uv: 3490,
  },
  {
    name: 'Oct',
    uv: 1490,
  },
  {
    name: 'Nov',
    uv: 7990,
  },
  {
    name: 'Dec',
    uv: 3400,
  },
];

const Home = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [unacceptedDocsCount, setUnacceptedDocsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    // Fetch patients count
    axios.get('/api/admin/patients/count').then(response => {
      setPatientsCount(response.data.count);
    }).catch(error => {
      console.error("There was an error fetching the patients count!", error);
    });

    // Fetch doctors count
    axios.get('/api/admin/doctors/count').then(response => {
      setDoctorsCount(response.data.count);
    }).catch(error => {
      console.error("There was an error fetching the doctors count!", error);
    });

    // Fetch unaccepted documents doctors count
    axios.get('/api/admin/doctors/unaccepted/count').then(response => {
      setUnacceptedDocsCount(response.data.count);
    }).catch(error => {
      console.error("There was an error fetching the unaccepted documents doctors count!", error);
    });

    // Fetch reports count
    axios.get('/api/admin/reports/count').then(response => {
      setReportsCount(response.data.count);
    }).catch(error => {
      console.error("There was an error fetching the reports count!", error);
    });
  }, []);

  return (
    <div className={styles.home}>
      <div className="d-flex justify-content-between" style={{ paddingLeft: '40px' }}>
        <div className="flex-grow-1 pt-5">
          <div className="d-flex flex-grow-1 gap-4">
            <div className={`${styles.item} d-flex justify-content-between flex-grow-1`}>
              <div>
                <p>Patients</p>
                <p>{patientsCount}</p>
              </div>
            </div>
            <div className={`${styles.item} d-flex justify-content-between flex-grow-1`}>
              <div>
                <p>Doctors</p>
                <p>{doctorsCount}</p>
              </div>
            </div>
            <div className={`${styles.item} d-flex justify-content-between flex-grow-1`}>
              <div>
                <p>Unaccepted Document Doctors</p>
                <p>{unacceptedDocsCount}</p>
              </div>
            </div>
            <div className={`${styles.item} d-flex justify-content-between flex-grow-1`}>
              <div>
                <p>Reports</p>
                <p>{reportsCount}</p>
              </div>
            </div>
          </div>
          <div style={{ height: '600px', width: '100%' }} className="mt-4 bg-white p-5 pb-4 rounded-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="uv" fill="#F6AF05" width={10} maxBarSize={35} radius={[20, 20, 0, 0]} />
                <XAxis dataKey="name" scale="auto" className="text-info" />
                <YAxis dataKey="uv" scale="auto" className="text-info" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
