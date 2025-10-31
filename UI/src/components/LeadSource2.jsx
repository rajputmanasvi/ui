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

    // Handle individual checkbox toggle
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // Handle select all toggle
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
        } else {
            setSelectedIds(leadSources.map((lead) => lead.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle delete selected rows
    const handleDeleteSelected = () => {
        setLeadSources((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
        setSelectedIds([]);
        setSelectAll(false);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen text-gray-700">
            <div className="bg-white p-6 rounded-md shadow-md">
                {/* Header Section */}
                <div className="-mx-6 px-6 flex justify-between items-center pb-3 border-b border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-800">Lead Source</h2>
                    <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded">
                        Add Lead Source
                    </button>
                </div>

                {/* Search Section */}
                <div className="flex justify-end mt-4 mb-4 space-x-2">
                    <input
                        type="text"
                        placeholder="Lead Source"
                        className="border border-gray-300 px-3 py-2 rounded w-60 text-gray-700 placeholder-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>

                {/* Table Section */}
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
                                                className="border px-2 py-1 w-full rounded text-gray-700"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{lead.name}</span>
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {editingId === lead.id ? (
                                            <>
                                                <button
                                                    className="text-blue-600 font-semibold mr-2"
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
                                                <button
                                                    className="text-red-600 font-semibold"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
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
                    {/* Delete Button Section */}
                    <div className="mt-6 mb-6 ml-6">
                        <button
                            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                            onClick={handleDeleteSelected}
                            disabled={selectedIds.length === 0}
                        >
                            Delete
                        </button>
                    </div>


                </table>
            </div>
        </div>
    );
}
