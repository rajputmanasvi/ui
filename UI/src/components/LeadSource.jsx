import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const LeadSource = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [leads, setLeads] = useState([
    { id: 1, name: "Facebook" },
    { id: 2, name: "Google" },
    { id: 3, name: "Instagram" },
    { id: 4, name: "Internet" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Popup modal state
  const [showModal, setShowModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");

  // Select All
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(newSelectAll ? leads.map((l) => l.id) : []);
  };

  // Select Row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Edit
  const handleEdit = (id, name) => {
    setEditingId(id);
    setNewName(name);
  };

  // Update Lead
  const handleUpdate = (id) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, name: newName } : l))
    );
    setEditingId(null);
    setNewName("");
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);
    setNewName("");
  };

  // Delete Single
  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Delete Selected
  const handleDeleteSelected = () => {
    setLeads((prev) => prev.filter((l) => !selectedRows.includes(l.id)));
    setSelectedRows([]);
    setSelectAll(false);
  };

  // Search
  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add New Lead (from popup)
  const handleAddLead = () => {
    if (newLeadName.trim() === "") return alert("Please enter Lead Source name");
    const newLead = {
      id: leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1,
      name: newLeadName,
    };
    setLeads([...leads, newLead]);
    setNewLeadName("");
    setShowModal(false);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-start mt-4 px-3 sm:px-6 py-4 "
      style={{ backgroundColor: "#f5f6fa" }}
    >
      <div className="bg-white rounded-lg w-full max-w-[1200px] overflow-hidden shadow-md h-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Lead Source</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0d223f] hover:bg-[#162e52] text-white text-sm font-medium px-4 py-1 rounded-md transition"
          >
            Add Lead Source
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4">
          <div className="flex w-full sm:w-auto items-center gap-2">
            <input
              type="text"
              placeholder="Search Lead Source"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#d9d9d9] rounded-md px-3 py-2 w-full sm:w-[190px] text-sm focus:outline-none"
            />
            <button className="bg-sky-500 text-white px-5 py-2 rounded-md hover:bg-sky-600 text-sm whitespace-nowrap">
              Search
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="hidden sm:block overflow-x-auto p-4">
          <table
            className="w-full border-collapse text-sm sm:text-base"
            style={{ border: "1.5px solid #d9d9d9" }}
          >
            <thead
              style={{
                backgroundColor: "#f2f2f2",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              <tr>
                <th className="px-3 py-1.5 text-left text-sm">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-blue-600"
                  />
                </th>
                <th className="px-3 py-1.5 text-left">SR. NO.</th>
                <th className="px-3 py-1.5 text-left">LEAD SOURCE</th>
                <th className="px-3 py-1.5 text-center">EDIT</th>
                <th className="px-3 py-1.5 text-center">DELETE</th>
                <th className="px-3 py-1.5 text-center">VIEW LEADS</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((l, index) => (
                <tr
                  key={l.id}
                  className="hover:bg-gray-50 transition text-xs"
                  style={{
                    borderTop: "1.5px solid #d9d9d9",
                    borderBottom: "1.5px solid #d9d9d9",
                  }}
                >
                  <td className="px-3 py-1 border text-left text-xs">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(l.id)}
                      onChange={() => handleSelectRow(l.id)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="px-3 py-1 border">{index + 1}</td>

                  <td className="px-3 py-1 border text-xs">
                    {editingId === l.id ? (
                      <input
                        type="text"
                        placeholder="Lead Source"
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 w-[60%]" 
                      />
                    ) : (
                      l.name
                    )}
                  </td>

                  <td className="px-3 py-1 border text-center">
                    {editingId === l.id ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(l.id)}
                          className="text-blue-600 hover: text-xs"
                        >
                          Update
                        </button>
                        <span>|</span>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover: text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(l.id, l.name)}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                  </td>

                  <td className="px-3 py-1 border text-center">
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="text-gray-700 hover:text-red-600 "
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>

                  <td className="px-3 py-1 border text-center">
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white px-4 py-1 rounded-md text-xs">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-3 text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}

              <tr>
                <td colSpan="6" className="px-3 py-3 text-left border-t">
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 text-white px-12 py-1.5 rounded-md hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL POPUP */}
  {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-start items-start z-50">
    <div
      className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[600px]"
      style={{
        marginTop: "0px",  // 👈 Push the popup lower to show table heading behind
        marginLeft: "300px", // keep left alignment
      }}
    >
      <div className="border-b px-5 py-3 ">
        <h3 className="text-center text-gray-800 font-semibold text-base">
          Add Lead Source
        </h3>
      </div>

      <div className="p-5 bg-[#f0f2f5]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lead Source
        </label>
        <input
          type="text"
          placeholder="Lead Source"
          value={newLeadName}
          onChange={(e) => setNewLeadName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <div className="flex justify-end gap-3 px-5 pb-4 mt-3">
  <button
    onClick={handleAddLead}
    className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-5 py-2 rounded-md"
  >
    Save
  </button>
  <button
    onClick={() => setShowModal(false)}
    className="border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium px-5 py-2 rounded-md"
  >
    Close
  </button>
</div>

    </div>
  </div>
)}



    </div>
  );
};

export default LeadSource;
