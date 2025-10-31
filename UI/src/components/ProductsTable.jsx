import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const ProductsTable = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Bandhani" },
    { id: 2, name: "Galaxy S1" },
    { id: 3, name: "Galaxy S2" },
    { id: 4, name: "Lenovo Ideapad" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Select All
  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedRows(products.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  // ✅ Select Individual Row
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // ✅ Edit Functions
  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleUpdate = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, name: editValue } : p
    );
    setProducts(updated);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  // ✅ Delete Single Row
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  // ✅ Delete Selected Rows
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    const updated = products.filter((p) => !selectedRows.includes(p.id));
    setProducts(updated);
    setSelectedRows([]);
    setSelectAll(false);
  };

  // ✅ Add Product
  const handleSaveProduct = () => {
    if (newProduct.trim() === "") return;
    const newItem = {
      id: products.length + 1,
      name: newProduct,
    };
    setProducts([...products, newItem]);
    setNewProduct("");
    setShowPopup(false);
  };

  // ✅ Filtered Products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-6xl rounded-md shadow-md border border-gray-400 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-400">
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end items-center p-4">
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-4 py-4">
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead
              style={{
                backgroundColor: "rgb(211, 214, 220)",
                borderColor: "rgb(211, 214, 220)", // ✅ same as background
              }}
            >
              <tr className="text-gray-700">
                <th
                  className="py-3 px-4 border text-center"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  className="py-3 px-4 border text-left"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  SR. NO.
                </th>
                <th
                  className="py-3 px-4 border text-left font-semibold"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  PRODUCT NAME
                </th>
                <th
                  className="py-3 px-3 border text-center font-semibold"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  EDIT
                </th>
                <th
                  className="py-3 px-6 border text-center font-semibold"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  DELETE
                </th>
                <th
                  className="py-3 px-1 border text-center font-semibold"
                  style={{ borderColor: "rgb(211, 214, 220)" }}
                >
                  VIEW LEADS
                </th>
              </tr>
            </thead>

            <tbody className="font-medium">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p, index) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 transition ${
                      selectedRows.includes(p.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(p.id)}
                        onChange={() => handleRowSelect(p.id)}
                      />
                    </td>
                    <td className="py-3 px-4 border text-left">{index + 1}</td>
                    <td className="py-3 px-4 border">
                      {editingId === p.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        />
                      ) : (
                        p.name
                      )}
                    </td>
                    <td className="py-3 px-3 border text-center">
                      {editingId === p.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleUpdate(p.id)}
                            className="text-blue-600 font-semibold"
                          >
                            Update
                          </button>
                          <span className="text-gray-400">|</span>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(p.id, p.name)}
                          className="text-gray-700 hover:text-blue-600"
                        >
                          <FaPen size={16} />
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-6 border text-center">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                    <td className="border py-3 text-center">
                      <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm">
                        View Leads
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 border"
                  >
                    No products found
                  </td>
                </tr>
              )}
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
      </div>

      {/* ✅ Add Product Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
          <style>
            {`
              @keyframes fadeSlideDown {
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

          <div
            className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[40%] h-[27%] animate-[fadeSlideDown_0.4s_ease-out]"
            style={{
              marginTop: "10%",
            }}
          >
            <div className="border-b px-6 py-3 bg-white rounded-t-md">
              <h2 className="text-xl font-normal text-gray-800 text-center">
                Add Product
              </h2>
            </div>

            <div className="px-6 py-5 bg-gray-200">
              <label className="block text-lg text-gray-800 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                className="w-[60%] border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 px-6 py-3 bg-gray-100 border-t rounded-b-md">
              <button
                onClick={handleSaveProduct}
                className="bg-blue-600 hover:bg-blue-700 text-lg text-white px-6 py-1 rounded-md transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="border border-gray-400 text-lg text-gray-700 px-6 py-1 rounded-md hover:bg-gray-200 transition duration-200"
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

export default ProductsTable;
