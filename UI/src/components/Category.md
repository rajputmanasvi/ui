import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

const CategoriesPage = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Food" },
    { id: 3, name: "Grocery" },
    { id: 4, name: "Laptops" },
    { id: 5, name: "Mobile Phones" },
    { id: 6, name: "Sarees" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // ✅ Checkbox Handling
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(newSelectAll ? categories.map((c) => c.id) : []);
  };

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
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName } : c))
    );
    setEditingId(null);
    setEditName("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDeleteSelected = () => {
    setCategories((prev) => prev.filter((c) => !selectedRows.includes(c.id)));
    setSelectedRows([]);
    setSelectAll(false);
  };

  // ✅ Search Filter
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Add Category
  const handleAddCategory = () => {
    if (newCategoryName.trim() === "")
      return alert("Please enter category name");

    const newCategory = {
      id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
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
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300 bg-white rounded-t-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0d223f] hover:bg-[#112d57] text-white text-sm sm:text-base font-medium px-5 py-2 rounded-md transition-all shadow-sm"
          >
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end items-center p-4 bg-white ">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Category Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition duration-200">
              Search
            </button>
          </div>
        </div>

        {/* 🖥️ Table View (Desktop) */}
        <div className="p-4 overflow-x-auto hidden sm:block">
          <table className="w-full border-collapse text-sm">
            <thead
              style={{
                backgroundColor: "rgb(211, 214, 220)",
                borderColor: "#e0e0e0",
              }}
            >
              <tr>
                <th className="border px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-blue-600"
                  />
                </th>
                <th className="border px-3 py-2 text-left">SR. NO.</th>
                <th className="border px-3 py-2 text-left">CATEGORY NAME</th>
                <th className="border px-3 py-2 text-center">EDIT</th>
                <th className="border px-3 py-2 text-center">DELETE</th>
                <th className="border px-3 py-2 text-center">VIEW LEADS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((c, index) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(c.id)}
                      onChange={() => handleSelectRow(c.id)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">
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
                  <td className="border px-3 py-2 text-center">
                    {editingId === c.id ? (
                      <div className="flex justify-center gap-2 text-sm">
                        <button
                          onClick={() => handleUpdate(c.id)}
                          className="text-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600"
                        >
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
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-gray-700 hover:text-red-600"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs px-4 py-1 rounded">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Button */}
          <div className="flex justify-start px-5 py-3 border-t bg-white">
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-12 py-1.5 rounded-md hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* 📱 Mobile View */}
        <div className="block sm:hidden space-y-3 p-4">
          {filteredCategories.map((c, index) => (
            <div
              key={c.id}
              className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              {editingId === c.id ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      SR. NO: {index + 1}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(c.id)}
                      onChange={() => handleSelectRow(c.id)}
                      className="accent-blue-600"
                    />
                  </div>

                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 w-full mb-3 text-sm"
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(c.id)}
                        className="text-green-600 font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs px-4 py-1 rounded">
                      View Leads
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {index + 1}. {c.name}
                    </h3>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(c.id)}
                      onChange={() => handleSelectRow(c.id)}
                      className="accent-blue-600"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(c.id, c.name)}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        <FaPen size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-gray-700 hover:text-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs px-3 py-1 rounded">
                      View Leads
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-3">
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white w-full py-2 rounded-md hover:bg-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[500px] mt-16 animate-[slideDown_0.4s_ease-out]">
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
                Add Category
              </h3>
            </div>

            <div className="p-5 bg-[#f0f2f5]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

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
