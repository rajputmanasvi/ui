import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa"; // ✅ using only this library

const CategoriesPage = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Food" },
    { id: 3, name: "g" },
    { id: 4, name: "Laptops" },
    { id: 5, name: "Mobile Phones" },
    { id: 6, name: "Sarees" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Select All
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(newSelectAll ? categories.map((c) => c.id) : []);
  };

  // Select single row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Edit
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // Update
  const handleUpdate = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName } : c))
    );
    setEditingId(null);
    setEditName("");
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  // Delete single
  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Delete selected
  const handleDeleteSelected = () => {
    setCategories((prev) => prev.filter((c) => !selectedRows.includes(c.id)));
    setSelectedRows([]);
    setSelectAll(false);
  };

  // Search filter
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new category (popup)
  const handleAddCategory = () => {
    if (newCategoryName.trim() === "")
      return alert("Please enter category name");

    const newCategory = {
      id: categories.length
        ? Math.max(...categories.map((c) => c.id)) + 1
        : 1,
      name: newCategoryName,
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-start mt-4 px-3 sm:px-6 py-4 bg-[#f4f5f7]">
      <div className="bg-white rounded-md shadow-md w-full max-w-[1100px] border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-300">
          <h2 className="text-base font-semibold text-gray-800">Categories</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0d223f] hover:bg-[#162e52] text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Add Category
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end gap-2 px-5 py-3 border-gray-200">
          <input
            type="text"
            placeholder="Category Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[200px] focus:outline-none"
          />
          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-md">
            Search
          </button>
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead style={{
    backgroundColor: "rgb(211, 214, 220)",
    borderColor: "#e0e0e0",
  }}>

              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left bg-#fff">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-blue-600"
                  />
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">SR. NO.</th>
                <th className="border border-gray-300 px-3 py-2 text-left">CATEGORY NAME</th>
                <th className="border border-gray-300 px-3 py-2 text-center">EDIT</th>
                <th className="border border-gray-300 px-3 py-2 text-center">DELETE</th>
                <th className="border border-gray-300 px-3 py-2 text-center">VIEW LEADS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((c, index) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(c.id)}
                      onChange={() => handleSelectRow(c.id)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">{index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    {editingId === c.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-[70%]"
                      />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {editingId === c.id ? (
                      <div className="flex justify-center gap-2 text-sm">
                        <button
                          onClick={() => handleUpdate(c.id)}
                          className="text-blue-600"
                        >
                          Update
                        </button>
                        <span>|</span>
                        <button onClick={handleCancel} className="text-gray-600 text-xs">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(c.id, c.name)}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        <FaPen size={14} />
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-gray-700 hover:text-red-600"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs px-4 py-1 rounded">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-3 text-gray-500 border border-gray-300"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
            {/* ✅ Delete Button Row */}
            <tfoot>
              <tr>
                <td colSpan="6" className="px-3 py-3 text-left border-b border-l border border-gray-300">
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
      </div>

     {/* Modal Popup */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-start items-start z-50">
    {/* 🔹 Popup Box with Animation */}
    <div
      className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[600px] animate-[slideDown_0.4s_ease-out]"
      style={{
        marginTop: "40px",   // push down slightly
        marginLeft: "380px", // move slightly to the right
      }}
    >
      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Header */}
      <div className="border-b px-5 py-3">
        <h3 className="text-center text-gray-800 font-semibold text-base">
          Add Category
        </h3>
      </div>

      {/* Body */}
      <div className="p-5 bg-[#f0f2f5]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          placeholder="Category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-[70%] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-5 pb-4 mt-3">
        <button
          onClick={handleAddCategory}
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

export default CategoriesPage;
