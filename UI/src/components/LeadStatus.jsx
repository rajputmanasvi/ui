import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function LeadStatusTable() {
  const [statuses, setStatuses] = useState([
    { id: 1, name: "Closed" },
    { id: 2, name: "Open" },
    { id: 3, name: "Pending" },
    { id: 4, name: "Special" },
  ]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ Delete a status
  const handleDelete = (id) => {
    setStatuses(statuses.filter((s) => s.id !== id));
  };

  // ✅ Edit a status
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleUpdate = (id) => {
    setStatuses(
      statuses.map((s) => (s.id === id ? { ...s, name: editName } : s))
    );
    setEditId(null);
    setEditName("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName("");
  };

  // ✅ Add new status
  const handleAdd = () => {
    if (!newStatus.trim()) return;
    const newId = statuses.length ? Math.max(...statuses.map((s) => s.id)) + 1 : 1;
    setStatuses([...statuses, { id: newId, name: newStatus }]);
    setNewStatus("");
    setShowModal(false);
  };

  // ✅ Search filter
  const filteredStatuses = statuses.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Select all
  const handleSelectAll = () => {
    if (selectedIds.length === filteredStatuses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStatuses.map((s) => s.id));
    }
  };

  // ✅ Select individual
  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // ✅ Delete selected
  const handleDeleteSelected = () => {
    setStatuses(statuses.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  return (
    <div className="w-[95%] md:w-[85%] max-w-[1600px] mx-auto bg-white rounded-md mt-10 border border-gray-200 shadow">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700">Lead Status</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm"
        >
          Add Lead Status
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end items-center px-6 py-3 bg-white gap-3">
        <input
          type="text"
          placeholder="Lead Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Search
        </button>
      </div>

      {/* TABLE VIEW */}
      <div className="hidden md:block px-6 py-6 overflow-x-auto">
        <table className="w-full border border-gray-100 text-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-3 py-2 text-left w-[10%]">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={
                    selectedIds.length === filteredStatuses.length &&
                    filteredStatuses.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-semibold">SR. NO.</th>
              <th className="px-3 py-2 text-left font-semibold">LEAD STATUS</th>
              <th className="px-3 py-2 text-center font-semibold">EDIT</th>
              <th className="px-3 py-2 text-center font-semibold">DELETE</th>
              <th className="px-3 py-2 text-center font-semibold">VIEW LEAD</th>
            </tr>
          </thead>

          <tbody>
            {filteredStatuses.length > 0 ? (
              filteredStatuses.map((s, index) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  {/* ✅ Checkbox column */}
                  <td className="px-3 py-2 border text-left">
                    {s.name === "Special" ? (
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedIds.includes(s.id)}
                        onChange={() => handleSelect(s.id)}
                      />
                    ) : (
                      <span className="text-gray-500">--</span>
                    )}
                  </td>

                  <td className="px-3 py-2 border text-left text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-2 py-2 border text-gray-700 text-left">
                    {editId === s.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border px-2 py-1 rounded w-[70%]"
                      />
                    ) : (
                      s.name
                    )}
                  </td>

                  {/* ✅ EDIT column */}
                  <td className="px-3 py-2 border text-center">
                    {editId === s.id ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(s.id)}
                          className="text-blue-600 font-medium"
                        >
                          Update
                        </button>
                        <span>|</span>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : s.name === "Special" ? (
                      <button
                        onClick={() => handleEdit(s.id, s.name)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                    ) : (
                      <span className="text-gray-500">--</span>
                    )}
                  </td>

                  {/* ✅ DELETE column */}
                  <td className="px-3 py-2 border text-center">
                    {s.name === "Special" ? (
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <span className="text-gray-500">--</span>
                    )}
                  </td>

                  <td className="px-3 py-2 border text-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 border">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
           {/* Bottom Delete Button */}
        <div className="flex justify-start mt-4 pb-2 pl-2 ">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2 rounded ${
              selectedIds.length === 0
                ? "bg-red-600 text-gray-200"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Delete
          </button>
        </div>
      
        </table>
</div>
       

      {/* ✅ MOBILE CARD VIEW */}
      <div className="block md:hidden px-4 py-6">
        <div className="bg-gray-100 border border-gray-300 rounded-md mb-5 p-3 text-left">
          <p className="font-semibold text-gray-700 text-sm mb-1">SELECT ALL</p>
          <input
            type="checkbox"
            className="w-4 h-4 mb-2"
            checked={
              selectedIds.length === filteredStatuses.length &&
              filteredStatuses.length > 0
            }
            onChange={handleSelectAll}
          />
          <p className="font-semibold text-gray-700 text-sm mt-2">VIEW LEAD</p>
        </div>

        {filteredStatuses.length > 0 ? (
          filteredStatuses.map((s, index) => (
            <div
              key={s.id}
              className="border border-gray-300 rounded-md bg-white mb-5 overflow-hidden"
            >
              {/* SR NO */}
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-gray-800 text-sm font-semibold text-left">
                  SR NO : <span className="font-normal text-gray-700">{index + 1}</span>
                </p>
              </div>

              {/* LEAD STATUS */}
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-gray-800 text-sm font-semibold text-left">
                  Lead Status :{" "}
                  {editId === s.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-gray-700 w-28 text-sm ml-1"
                    />
                  ) : (
                    <span className="font-normal text-gray-700">{s.name}</span>
                  )}
                </p>
              </div>

              {/* EDIT */}
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-gray-800 text-sm font-semibold flex items-center gap-2">
                  Edit :
                  {editId === s.id ? (
                    <span className="ml-2 flex gap-3">
                      <button
                        onClick={() => handleUpdate(s.id)}
                        className="text-blue-600 font-medium text-sm"
                      >
                        Update
                      </button>
                      <span>|</span>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : s.name === "Special" ? (
                    <button
                      onClick={() => handleEdit(s.id, s.name)}
                      className="text-gray-600 hover:text-blue-600 ml-2"
                    >
                      <Pencil size={16} />
                    </button>
                  ) : (
                    <span className="text-gray-500 ml-2">--</span>
                  )}
                </p>
              </div>

              {/* DELETE */}
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-gray-800 text-sm font-semibold flex items-center gap-2">
                  Delete :
                  {s.name === "Special" ? (
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-gray-600 hover:text-red-600 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <span className="text-gray-500 ml-2">--</span>
                  )}
                </p>
              </div>

              {/* VIEW LEADS */}
              <div className="flex justify-start px-4 py-3 bg-white">
                <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-1.5 rounded text-sm">
                  View Leads
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}

        {/* Bottom Delete Button */}
        <div className="flex justify-start mt-4">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2 rounded ${
              selectedIds.length === 0
                ? "bg-red-600 text-gray-200"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Add Lead Status Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[500px] mt-4 animate-[slideDown_0.4s_ease-out]">
            <style>
              {`
                @keyframes slideDown {
                  from { opacity: 0; transform: translateY(-25px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>

            <div className="border-b px-5 py-3">
              <h3 className="text-center text-gray-800 font-semibold text-base">
                Add Lead Status
              </h3>
            </div>

            <div className="p-5 bg-[#f0f2f5] text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead Status
              </label>
              <input
                type="text"
                placeholder="Enter Lead Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full max-w-[250px] focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex justify-end gap-3 px-5 pb-4 mt-3">
              <button
                onClick={handleAdd}
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