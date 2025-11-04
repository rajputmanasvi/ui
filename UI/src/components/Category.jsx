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

        {/* 🖥️ Table View (Desktop) */}
        <div className="p-4 overflow-x-auto hidden sm:block">
          <table className="w-full border-collapse text-sm">
            <thead
              style={{
                backgroundColor: "rgb(211, 214, 220)",
                border: "none",
              }}
              className="border-0"
            >
              <tr className="border-0">
                <th className="px-3 py-2 text-left w-[50px] border-0">
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="accent-blue-600"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 text-left border-0">SR. NO.</th>
                <th className="px-3 py-2 text-left border-0">CATEGORY NAME</th>
                <th className="px-3 py-2 text-center border-0">EDIT</th>
                <th className="px-3 py-2 text-center border-0">DELETE</th>
                <th className="px-3 py-2 text-center border-0">VIEW LEADS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((c, index) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 w-[50px]">
                    <div className="flex justify-start">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(c.id)}
                        onChange={() => handleSelectRow(c.id)}
                        className="accent-blue-600"
                      />
                    </div>
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
        <div className="block sm:hidden p-4">
          {filteredCategories.map((c, index) => (
            <div
              key={c.id}
              className="border rounded-md p-3 mb-3 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">
                  {index + 1}. {c.name}
                </p>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(c.id)}
                  onChange={() => handleSelectRow(c.id)}
                  className="accent-blue-600"
                />
              </div>
              <div className="flex justify-between items-center">
                {editingId === c.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm w-[60%]"
                    />
                    <div className="flex gap-2 text-sm">
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
                  </>
                ) : (
                  <>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(c.id, c.name)}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        <FaPen size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-gray-700 hover:text-red-600"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs px-4 py-1 rounded">
                      View Leads
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {selectedRows.length > 0 && (
            <div className="flex justify-start mt-2">
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 text-white px-8 py-1.5 rounded-md hover:bg-red-700 text-sm"
              >
                Delete
              </button> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
