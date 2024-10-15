import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV, FaChevronLeft, FaBars, FaList } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Loading.css';
import templatesData from './templates.json'; // Import dummy templates


const PatientHistory = ({ history }) => (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Patient's History</h2>
      <input type="text" value={history} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100 mb-6" />
    </section>
  );
  

  const PatientDetails = ({ patientData }) => (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Patient Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Reference Patient ID</label>
          <input type="text" value={patientData.referencePatientId} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Patient Name</label>
          <input type="text" value={patientData.patientName} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">First Name <span className="text-red-600">*</span></label>
          <input type="text" value={patientData.firstName} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Gender</label>
          <input type="text" value={patientData.gender} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Age</label>
          <input type="text" value={patientData.age} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Upload Time</label>
          <input type="text" value={patientData.uploadTime} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
          <p className="text-sm text-gray-500 mt-1">{patientData.timezone}</p>
        </div>
        <div>
          <label className="block font-semibold">Location</label>
          <input type="text" value={patientData.location} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Body Part</label>
          <input type="text" value={patientData.bodyPart} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
          <div className="flex items-center mt-2">
            <input type="checkbox" checked={patientData.isChest} readOnly className="mr-2" />
            <span>Is Chest</span>
          </div>
        </div>
      </div>
    </section>
  );
  const PendingFeedback = ({ status, feedback,isEditable }) => (
    (status === 'Pending' || isEditable) && (
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold">Transaction Status <span className="text-red-600">*</span></label>
            <select value={status} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100">
              <option>Need More Info</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Doctor's Feedback <span className="text-red-600">*</span></label>
            <textarea value={feedback} readOnly={!isEditable} className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
          </div>
        </div>
      </section>
    )
  );
const ReportTemplate = ({ reportTemplate, findings, impression, isEditable, setSelectedTemplate, selectedTemplate }) => (
  <section className="bg-white p-6 rounded-lg shadow mb-6">
    <h3 className="font-semibold mb-2">Report Template</h3>
    
    {/* Searchable dropdown */}
    {isEditable ? (
      <select
        value={selectedTemplate?.heading || ''}
        onChange={(e) => {
          const selected = templatesData.find(t => t.heading === e.target.value);
          setSelectedTemplate(selected);
        }}
        className="mt-1 w-full p-2 border rounded-lg bg-gray-100"
      >
        <option value="">Select a template</option>
        {templatesData.map((template, index) => (
          <option key={index} value={template.heading}>
            {template.heading}
          </option>
        ))}
      </select>
    ) : (
      <input type="text" value={reportTemplate} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
    )}

    <div className="p-4 bg-gray-100 rounded-lg">
      <h4 className="font-bold">Findings:</h4>
      {isEditable && selectedTemplate
        ? selectedTemplate.findings.map((finding, index) => <p key={index}>{finding}</p>)
        : findings.map((finding, index) => <p key={index}>{finding}</p>)}

      <h4 className="font-bold mt-4">Impression:</h4>
      {isEditable && selectedTemplate ? <p>{selectedTemplate.impression}</p> : <p>{impression}</p>}
    </div>
  </section>
);

const PatientDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state;
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false); // Editable state
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Selected template from dropdown

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.reload(); // Refresh page after saving
    }, 1500);
  };

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
        className="p-6 bg-gray-800 text-white w-64"
      >
        <button onClick={toggleSidebar} className="text-xl mb-4">Close Sidebar</button>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/templates')}>Templates</li>
        </ul>
      </Drawer>

      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-lg p-2 mr-3 md:hidden"><FaBars /></button>
            <button onClick={() => navigate('/reports')} className="text-lg p-2 mr-3"><FaChevronLeft /></button>
            <h1 className="text-2xl font-semibold">{patientData.id}</h1>
            <span className={`ml-4 ${patientData.status === 'Complete' ? 'text-green-600' : 'text-blue-600'} flex items-center`}>
              <FaCheckCircle className="mr-2" /> {patientData.status}
            </span>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/reports')} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">Go to Reports List</button>
            {patientData.status === 'Complete' && !isEditingTemplate ? (
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => {
                console.log("dsfdsbfjsdb")
                setIsEditingTemplate(true)
              }}>
                Submit For Revision
              </button>
            ) : (
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleSave}>
                Save
              </button>
            )}
            <button className="text-gray-700 p-2"><FaEllipsisV /></button>
          </div>
        </header>

        <PatientDetails patientData={patientData} />
        <PatientHistory history={patientData.history} />
        <ReportTemplate
          reportTemplate={patientData.reportTemplate}
          findings={patientData.findings}
          impression={patientData.impression}
          isEditable={isEditingTemplate}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        {patientData.status === 'Pending' && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <p className="text-red-600 font-semibold">
              Doctor has <span className="font-bold">asked for more information for this XRay</span>. Please add necessary details and submit it back to the doctor.
            </p>
          </div>
        )}
    <PendingFeedback status={patientData.status} feedback={patientData.doctor_feedback} isEditable={isEditingTemplate}/>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
