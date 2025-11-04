import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function LeadSource() {
  const [leadSources, setLeadSources] = useState([
    { id: 1, name: "Facebook" },
    { id: 2, name: "Google" },
    { id: 3, name: "Instagram" },
    { id: 4, name: "Internet" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState("");

  // ✅ Select All
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(newSelectAll ? leadSources.map((l) => l.id) : []);
  };

  // ✅ Select Row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // ✅ Edit + Update + Cancel
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleUpdate = (id) => {
    setLeadSources((prev) =>
      prev.map((l) => (l.id === id ? { ...l, name: editName } : l))
    );
    setEditingId(null);
    setEditName("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  // ✅ Delete Single Row
  const handleDelete = (id) => {
    setLeadSources((prev) => prev.filter((l) => l.id !== id));
  };

  // ✅ Delete Selected
  const handleDeleteSelected = () => {
    setLeadSources((prev) => prev.filter((l) => !selectedRows.includes(l.id)));
    setSelectedRows([]);
    setSelectAll(false);
  };

  // ✅ Add Lead Source
  const handleAddLead = () => {
    if (!newLead.trim()) return;
    const newEntry = { id: leadSources.length + 1, name: newLead.trim() };
    setLeadSources([...leadSources, newEntry]);
    setNewLead("");
    setShowModal(false);
  };

  // ✅ View Leads Button
  const handleViewLeads = (leadName) => {
    alert(`Viewing leads for: ${leadName}`);
  };

  // ✅ Search Filter
  const filteredLeads = leadSources.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex justify-center items-start mt-4 px-3 sm:px-6 py-4 bg-[#f4f5f7]">
      <div className="bg-white rounded-md shadow-md w-full max-w-[1100px] border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300 bg-white rounded-t-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Lead Source</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0b2447] hover:bg-[#19376d] text-white font-semibold px-5 py-2 rounded-md text-sm"
          >
            Add Lead Source
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end items-center p-4 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Lead Source"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition duration-200">
              Search
            </button>
          </div>
        </div>

        {/* 🖥️ Desktop Table */}
        <div className="p-4 overflow-x-auto hidden sm:block">
          <table className="w-full border-collapse text-sm">
            <thead style={{ backgroundColor: "rgb(211, 214, 220)" }}>
              <tr>
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-blue-600"
                  />
                </th>
                <th className="px-3 py-2 text-left">SR. NO.</th>
                <th className="px-3 py-2 text-left">LEAD SOURCE</th>
                <th className="px-3 py-2 text-center">EDIT</th>
                <th className="px-3 py-2 text-center">DELETE</th>
                <th className="px-3 py-2 text-center">VIEW LEADS</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((l, index) => (
                <tr key={l.id} className="hover:bg-gray-50 border-t border-gray-300">
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(l.id)}
                      onChange={() => handleSelectRow(l.id)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">
                    {editingId === l.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-[70%]"
                      />
                    ) : (
                      l.name
                    )}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {editingId === l.id ? (
                      <div className="flex justify-center gap-2 text-sm">
                        <button
                          onClick={() => handleUpdate(l.id)}
                          className="text-blue-600"
                        >
                          Update
                        </button>
                        <button onClick={handleCancel} className="text-gray-600">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(l.id, l.name)}
                        className="text-blue-600"
                      >
                        <FaPen />
                      </button>
                    )}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleViewLeads(l.name)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
                    >
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Button */}
          <div className="flex justify-start px-5 py-3 border-t border-b border-l border-r bg-white">
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-12 py-1.5 rounded-md hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* 📱 Mobile Cards */}
        <div className="block sm:hidden space-y-4 p-4">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                SELECT ALL
              </label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="accent-blue-600"
              />
            </div>

          {filteredLeads.map((l, index) => (
            <div key={l.id} className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 px-4 py-2 font-semibold text-gray-700 text-sm border-b">
                VIEW LEAD
              </div>

              <div className="divide-y divide-gray-200 text-sm text-gray-800">
                <p className="px-4 py-2"><strong>SR NO :</strong> {index + 1}</p>
                <p className="px-4 py-2"><strong>Category Name :</strong> {l.name}</p>
                <p className="px-4 py-2 flex items-center gap-2">
                  <strong>Edit :</strong>
                  <button onClick={() => handleEdit(l.id, l.name)} className="text-blue-600">
                    <FaPen />
                  </button>
                </p>
                <p className="px-4 py-2 flex items-center gap-2">
                  <strong>Delete :</strong>
                  <button onClick={() => handleDelete(l.id)} className="text-red-600">
                    <FaTrash />
                  </button>
                </p>
                <p className="px-4 py-2">
                  <button
                    onClick={() => handleViewLeads(l.name)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
                  >
                    View Leads
                  </button>
                </p>
              </div>
            </div>
          ))}
          {/* ✅ Delete Selected */}
            <div className="flex justify-left mt-3 mb-3 px-3">
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 text-white w-[40%] py-2 rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
        </div>
      </div>

      {/* 🧩 Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-lg shadow-lg mt-[70px] transition-transform">
            <div className="border-b px-6 py-3">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Add Lead Source
              </h3>
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-medium mb-2">
                Lead Source Name
              </label>
              <input
                type="text"
                placeholder="Enter Lead Source"
                value={newLead}
                onChange={(e) => setNewLead(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex justify-end gap-3 border-t px-6 py-3">
              <button
                onClick={handleAddLead}
                className="bg-[#0096FF] hover:bg-[#007bff] text-white px-6 py-2 rounded-md font-medium"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
