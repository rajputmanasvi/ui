import { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function LeadSource() {
  const [leadSources, setLeadSources] = useState([
    { id: 1, name: "Facebook" },
    { id: 2, name: "Google" },
    { id: 3, name: "Instagram" },
    { id: 4, name: "Internet" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) setSelectedIds([]);
    else setSelectedIds(leadSources.map((lead) => lead.id));
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    setLeadSources((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    setSelectedIds([]);
    setSelectAll(false);
  };

  const handleAddLeadSource = () => {
    if (newLeadName.trim() === "") return;
    const newLead = {
      id: leadSources.length + 1,
      name: newLeadName.trim(),
    };
    setLeadSources([...leadSources, newLead]);
    setNewLeadName("");
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-700 relative">
      <div className="bg-white p-6 rounded-md shadow-md">
        {/* Header */}
        <div className="-mx-6 px-6 flex justify-between items-center pb-3 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800">Lead Source</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Add Lead Source
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end mt-4 mb-4 space-x-2">
          <input
            type="text"
            placeholder="Search Lead Source"
            className="border border-gray-300 px-3 py-2 rounded w-60 text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        {/* Table */}
        <table className="w-full border border-gray-300 border-t-0 text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-gray-800 font-medium">
              <th className="border px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="border px-3 py-2">SR. NO.</th>
              <th className="border px-3 py-2">LEAD SOURCE</th>
              <th className="border px-3 py-2">EDIT</th>
              <th className="border px-3 py-2">DELETE</th>
              <th className="border px-3 py-2">VIEW LEADS</th>
            </tr>
          </thead>

          <tbody>
            {leadSources
              .filter((l) =>
                l.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((lead, index) => (
                <tr
                  key={lead.id}
                  className="text-center hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead.id)}
                      onChange={() => handleCheckboxChange(lead.id)}
                    />
                  </td>
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">
                    {editingId === lead.id ? (
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border px-2 py-1 w-[70%] rounded text-gray-700"
                      />
                    ) : (
                      <span className="text-gray-700">{lead.name}</span>
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {editingId === lead.id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="text-blue-600 font-semibold"
                          onClick={() => {
                            setLeadSources((prev) =>
                              prev.map((l) =>
                                l.id === lead.id
                                  ? { ...l, name: editedName }
                                  : l
                              )
                            );
                            setEditingId(null);
                          }}
                        >
                          Update
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          className="text-red-600 font-semibold"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setEditingId(lead.id);
                          setEditedName(lead.name);
                        }}
                      >
                        <FaPen />
                      </button>
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        setLeadSources((prev) =>
                          prev.filter((l) => l.id !== lead.id)
                        )
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border px-3 py-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          {/* ✅ Delete Button Row */}
            <tfoot>
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
            </tfoot>
        </table>

        
      </div>

      {/* ✅ MODAL POPUP WITH ANIMATION */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-start items-start z-50">
          <style>
            {`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-40px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          <div
            className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[600px] animate-[slideDown_0.4s_ease-out]"
            style={{
              marginTop: "0px",
              marginLeft: "300px",
            }}
          >
            <div className="border-b px-5 py-3">
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
                className="w-[60%] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 w-[50%]"
              />
            </div>

            <div className="flex justify-end gap-3 px-5 pb-4 mt-3">
              <button
                onClick={handleAddLeadSource}
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
}
 