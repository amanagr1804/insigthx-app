import React, { useState } from 'react';
import templatesData from './templates.json';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState(templatesData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTemplate, setEditedTemplate] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedTemplate({ ...templates[index] });
  };

  const handleSaveClick = () => {
    const updatedTemplates = [...templates];
    updatedTemplates[editingIndex] = editedTemplate;
    setTemplates(updatedTemplates);
    setEditingIndex(null);
    setEditedTemplate(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Report Templates</h1>
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
