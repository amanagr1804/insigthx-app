import React, { useState, useEffect } from 'react';
import { FaBars, FaCheckCircle, FaEllipsisV, FaFilter } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const generateReportsData = (count) => {
  const reports = [];
  const xrayImages = [
    'https://i.imgur.com/1bX5QH6.jpg',
    'https://i.imgur.com/3g7nmJC.jpg',
    'https://i.imgur.com/oYiTqum.jpg'
  ];
  for (let i = 1; i <= count; i++) {
    reports.push({
      id: `00978${i.toString().padStart(3, '0')}-2024-10`,
      status: i % 3 === 0 ? 'Pending' : i % 2 === 0 ? 'Complete' : 'Duplicate',
      patientName: `Patient ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      age: `${20 + (i % 50)}Y`,
      uploadTime: `14-10-2024 18:${i % 60}:${i % 60}`,
      timezone: 'Asia/Kolkata',
      location: 'USMANPURA IMAGING CENTRE',
      bodyPart: 'X-RAY CHEST',
      isChest: true,
      xrayFiles: [
        { imageUrl: xrayImages[i % 3] },
        {},
        {}
      ],
      history: 'COLD COUGH BREATHLESSNESS',
      reportTemplate: 'Chest Normal',
      findings: [
        'Haziness noted in left lower lung zone, p/o pleural effusion',
        'Rest of the lung fields display a normal appearance with no evident abnormalities.',
        'Trachea and mediastinum are in a normal position without any deviation.',
        'Both hila are symmetrical and of normal size.',
        'The transverse cardiac diameter is within normal limits.',
        'Great vessels show no signs of abnormalities.',
        'Right costophrenic angles appear clear, and diaphragms are in a normal position and contour.',
        'The bony rib cage and soft tissue shadows appear normal.'
      ],
      impression: 'Haziness in left lower lung zone, p/o pleural effusion',
      doctor_feedback: 'history?',
      createdOn: `${i % 24} h ago`
    });
  }
  return reports;
};

const AllReportsPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;
  const reportsData = generateReportsData(100);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    console.log("reportsData",reportsData)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Pagination Logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reportsData.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reportsData.length / reportsPerPage);

  const paginate = (pageNumber) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
    }, 500);
  };

  const filterOptions = [
    { value: 'Complete', label: 'Complete' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Duplicate', label: 'Duplicate' },
  ];

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);
  };

  const filteredReports = selectedFilter
    ? reportsData.filter(report => report.status === selectedFilter.value)
    : reportsData;

  const paginatedReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Drawer
        open={sidebarOpen}
        onClose={toggleSidebar}
        direction="left"
        style={{background:"#1f2937"}}
        className="p-6 bg-gray-800 text-white w-64"
      >
        <button onClick={toggleSidebar} className="text-xl mb-4">Close Sidebar</button>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
          <li className="mb-4 cursor-pointer" onClick={()=> navigate('/templates')}>Templates</li>
          <li className="mb-4 cursor-pointer">Profile</li>
        </ul>
      </Drawer>

      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <button onClick={toggleSidebar} className="text-lg p-2"><FaBars /></button>
            <h1 className="text-2xl font-semibold">Reports</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaFilter className="mr-2 text-gray-600" />
              <Select
                value={selectedFilter}
                onChange={handleFilterChange}
                options={filterOptions}
                placeholder="Filter by Status"
                className="w-64"
              />
            </div>
            <button className="text-gray-700 p-2">
              <FaEllipsisV />
            </button>
          </div>
        </header>

        <section className="bg-white p-6 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Age</th>
                <th className="p-3">Upload Time</th>
                <th className="p-3">Created On</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((report, index) => (
                <tr key={index} onClick={() => navigate('/patient-details', { state: report })} className="cursor-pointer hover:bg-gray-100">
                  <td className="p-3 text-blue-600 underline">{report.id}</td>
                  <td className="p-3">
                    <span className={`flex items-center ${report.status === 'Complete' ? 'text-green-600' : 'text-gray-600'}`}>
                      <FaCheckCircle className="mr-2" /> {report.status}
                    </span>
                  </td>
                  <td className="p-3">{report.patientName}</td>
                  <td className="p-3">{report.gender}</td>
                  <td className="p-3">{report.age}</td>
                  <td className="p-3">{report.uploadTime}</td>
                  <td className="p-3">{report.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <p>Page {currentPage} of {totalPages}</p>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllReportsPage;