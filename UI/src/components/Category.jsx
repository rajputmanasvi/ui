import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Food" },
    { id: 3, name: "Gadgets" },
    { id: 4, name: "Laptops" },
    { id: 5, name: "Mobile Phones" },
    { id: 6, name: "Sarees" },
    { id: 7, name: "Home Appliances" },
  ]);

  const [selected, setSelected] = useState([]);

  // ✅ Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(categories.map((cat) => cat.id));
    } else {
      setSelected([]);
    }
  };

  // ✅ Handle single row selection
  const handleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ Handle delete
  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    setCategories((prev) => prev.filter((cat) => !selected.includes(cat.id)));
    setSelected([]);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center py-8">
      <div className="bg-white border border-[#d9d9d9] w-[95%] md:w-[90%] p-6 rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
          <button className="bg-[#1b2b41] hover:bg-[#142336] text-white text-sm font-medium px-4 py-2 rounded">
            Add Category
          </button>
        </div>

        {/* Divider (full-width inside card) */}
<div className="-mx-6 border-b border-[#d9d9d9] mt-3 mb-7"></div>


        {/* Search */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Category Name"
            className="border border-[#d9d9d9] rounded-sm px-3 py-2 text-sm focus:outline-none text-gray-700"
          />
          <button className="bg-[#00b4d8] hover:bg-[#0096c7] text-white text-sm font-medium px-4 py-2 rounded-sm">
            Search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#d9d9d9] rounded-md">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-[#f1f1f1] text-gray-800 font-semibold">
              <tr>
                <th className="border border-[#d9d9d9] p-2 text-left w-12">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === categories.length && categories.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border border-[#d9d9d9] p-2 text-left">SR. NO.</th>
                <th className="border border-[#d9d9d9] p-2 text-left">
                  CATEGORY NAME
                </th>
                <th className="border border-[#d9d9d9] p-2 text-center">EDIT</th>
                <th className="border border-[#d9d9d9] p-2 text-center">DELETE</th>
                <th className="border border-[#d9d9d9] p-2 text-center">
                  VIEW LEADS
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className="text-gray-700 hover:bg-gray-50 transition"
                >
                  <td className="border border-[#d9d9d9] p-2 text-left">
                    <input
                      type="checkbox"
                      checked={selected.includes(cat.id)}
                      onChange={() => handleSelectRow(cat.id)}
                    />
                  </td>
                  <td className="border border-[#d9d9d9] p-2">{index + 1}</td>
                  <td className="border border-[#d9d9d9] p-2">{cat.name}</td>
                  <td className="border border-[#d9d9d9] p-2 text-center">
                    <button className="text-gray-700 hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                  </td>
                  <td className="border border-[#d9d9d9] p-2 text-center">
                    <button className="text-gray-700 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </td>
                  <td className="border border-[#d9d9d9] p-2 text-center">
                    <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm px-4 py-1 rounded-sm">
                      View Leads
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Delete Button */}
          <div className="p-4">
            <button
              onClick={handleDeleteSelected}
              className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm font-medium px-8 py-2 rounded-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
