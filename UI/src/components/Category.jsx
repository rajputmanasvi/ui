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
  const [newCategory, setNewCategory] = useState("");

  // ✅ Select all
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

  // ✅ Delete
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
    if (newCategory.trim() === "") return alert("Enter category name");
    const newItem = {
      id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name: newCategory,
    };
    setCategories([...categories, newItem]);
    setNewCategory("");
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
        <div className="flex justify-end items-center p-4 bg-white">
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

        {/* 🖥️ Desktop Table */}
        <div className="p-4 overflow-x-auto hidden sm:block">
          <table className="w-full border-collapse text-sm">
            <thead
              className="text-gray-800"
              style={{
                backgroundColor: "#e0e0e0",
                border: "none",
              }}
            >
              <tr>
                <th className="px-3 py-2 font-semibold text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-blue-600"
                  />
                </th>
                <th className="px-3 py-2 text-left font-semibold">SR. NO.</th>
                <th className="px-3 py-2 text-left font-semibold">
                  CATEGORY NAME
                </th>
                <th className="px-3 py-2 text-center font-semibold">EDIT</th>
                <th className="px-3 py-2 text-center font-semibold">DELETE</th>
                <th className="px-3 py-2 text-center font-semibold">
                  VIEW LEADS
                </th>
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

              {/* ✅ Delete Selected Row (inside table) */}
              {categories.length > 0 && (
                <tr className="border-t border-l border-b border-r">
                  <td colSpan="6" className="text-left border-t px-4 py-3 bg-white">
                    <button
                      onClick={handleDeleteSelected}
                      className="bg-red-600 text-white px-12 py-1.5 rounded-md hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📱 Mobile Cards */}
        <div className="block sm:hidden p-4">
          <div className="border border-gray-300 rounded-md overflow-hidden">
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

            <div className="bg-[#e0e0e0] p-3 text-left font-semibold text-gray-700 text-sm border-b border-gray-300">
              VIEW LEAD
            </div>

            {filteredCategories.map((c, index) => (
              <div
                key={c.id}
                className="p-0 border-b border-gray-300 bg-white last:border-b-0"
              >
                <div className="px-3 py-2 border-b border-gray-200 text-sm">
                  <span className="font-semibold text-gray-700">SR NO :</span>{" "}
                  {index + 1}
                </div>

                <div className="px-3 py-2 border-b border-gray-200 text-sm">
                  <span className="font-semibold text-gray-700">
                    Category Name :
                  </span>{" "}
                  {editingId === c.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm w-[60%]"
                    />
                  ) : (
                    c.name
                  )}
                </div>

                <div className="px-3 py-2 border-b border-gray-200 text-sm">
                  <span className="font-semibold text-gray-700">Edit :</span>{" "}
                  {editingId === c.id ? (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleUpdate(c.id)}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(c.id, c.name)}
                      className="text-blue-600"
                    >
                      <FaPen size={13} />
                    </button>
                  )}
                </div>

                <div className="px-3 py-2 border-b border-gray-200 text-sm">
                  <span className="font-semibold text-gray-700">Delete :</span>{" "}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>

                {/* ✅ View Leads Button */}
                <div className="flex justify-left bg-white pt-4 pb-5 pl-2">
                  <button
                    className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm font-medium py-2 rounded-md shadow-sm transition-all"
                    style={{
                      width: "100px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    View Leads
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-left mt-3 mb-3 px-3">
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 text-white w-[50%] py-2 rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Add Category Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[500px] mt-16 animate-slideDown">
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
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
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

      {/* ✅ Animation Keyframes */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CategoriesPage;
