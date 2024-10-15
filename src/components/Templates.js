import React, { useState } from 'react';
import templatesData from './templates.json'; // Dummy data for templates

const TemplatesPage = () => {
  const [templates, setTemplates] = useState(templatesData); // State for all templates
  const [editingIndex, setEditingIndex] = useState(null);    // State for editing a template
  const [editedTemplate, setEditedTemplate] = useState(null);// State for edited template
  const [isAddingTemplate, setIsAddingTemplate] = useState(false); // State to manage adding template
  const [newTemplate, setNewTemplate] = useState({ heading: '', findings: [], impression: '' }); // State for the new template

  // Handle editing a template
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedTemplate({ ...templates[index] });
  };

  // Handle saving a template after editing
  const handleSaveClick = () => {
    const updatedTemplates = [...templates];
    updatedTemplates[editingIndex] = editedTemplate;
    setTemplates(updatedTemplates);
    setEditingIndex(null);
    setEditedTemplate(null);
  };

  // Handle adding a new template
  const handleAddTemplate = () => {
    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    setNewTemplate({ heading: '', findings: [], impression: '' }); // Reset form fields
    setIsAddingTemplate(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Report Templates</h1>

      {/* Add Template button */}
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsAddingTemplate(true)}
        >
          Add Template
        </button>
      </div>

      {/* Add Template Form */}
      {isAddingTemplate && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Template</h2>
          <input
            type="text"
            placeholder="Template Heading"
            value={newTemplate.heading}
            onChange={(e) => setNewTemplate({ ...newTemplate, heading: e.target.value })}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <textarea
            placeholder="Findings (comma-separated)"
            value={newTemplate.findings.join(', ')}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, findings: e.target.value.split(',').map(f => f.trim()) })
            }
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <textarea
            placeholder="Impression"
            value={newTemplate.impression}
            onChange={(e) => setNewTemplate({ ...newTemplate, impression: e.target.value })}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg mr-4"
            onClick={handleAddTemplate}
          >
            Save Template
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsAddingTemplate(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* List Existing Templates */}
      {templates.map((template, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow mb-6">
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={editedTemplate.heading}
                onChange={(e) => setEditedTemplate({ ...editedTemplate, heading: e.target.value })}
                className="w-full mb-4 p-2 border rounded-lg"
              />
              <textarea
                value={editedTemplate.findings.join('\n')}
                onChange={(e) =>
                  setEditedTemplate({ ...editedTemplate, findings: e.target.value.split('\n') })
                }
                className="w-full mb-4 p-2 border rounded-lg"
              />
              <textarea
                value={editedTemplate.impression}
                onChange={(e) =>
                  setEditedTemplate({ ...editedTemplate, impression: e.target.value })
                }
                className="w-full mb-4 p-2 border rounded-lg"
              />
              <button onClick={handleSaveClick} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold">{template.heading}</h2>
              <p className="mb-2"><strong>Findings:</strong> {template.findings.join(', ')}</p>
              <p><strong>Impression:</strong> {template.impression}</p>
              <button
                onClick={() => handleEditClick(index)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mt-4"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
