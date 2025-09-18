import { useCloudConfig } from "../../hooks/useCloudConfig";
import React, { useState } from "react";

export default function Navbar({ user }) {
  const { addAgent } = useCloudConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await addAgent({ prompt }); // ab response milega
    console.log("Agent Response:", res);

    if (Array.isArray(res)) {
      setResponseData(res);
    } else if (res && typeof res === "object") {
      setResponseData([res]);
    } else {
      setResponseData([]);
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error);
  } finally {
    setLoading(false);
  }
};




  // Collect unique columns across all objects
  const columns = responseData.length
    ? Array.from(new Set(responseData.flatMap((row) => Object.keys(row))))
    : [];

  return (
    <>
      {/* Header */}
      <header className="relative p-[13px] border-b bg-white border-gray-200 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-xl leading-5 text-black font-semibold">
            Dashboard
          </div>

          <div className="flex gap-5 items-center">
            <button
              onClick={toggleModal}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              ⚡ AI Agent
            </button>

            {user && (
              <div className="flex gap-2 items-center text-[15px] text-[#1E1E1E] font-semibold">
                Welcome {user.name}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl p-10 relative animate-scaleIn border border-yellow-200">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-yellow-600 transition text-xl"
            >
              ✖
            </button>

            {/* Modal Header */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-4xl">🤖</span>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent tracking-tight">
                  AWS AI Agent
                </h2>
              </div>
              <p className="text-gray-600 text-[20px] max-w-2xl mx-auto leading-relaxed">
                Automate your{" "}
                <span className="font-semibold text-yellow-600">AWS tasks</span>{" "}
                with natural language.
                <br />
                Example:{" "}
                <span className="italic">
                  “Create an EC2 instance with 2 vCPUs and 4GB RAM”
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Your Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your AWS request here..."
                  className="w-full text-lg p-5 border rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md resize-none transition"
                  rows={6}
                  required
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:opacity-95 transition shadow-md disabled:opacity-50"
                >
                  {loading ? "⏳ Processing..." : "✨ Send Prompt"}
                </button>
              </div>
            </form>

            {/* Dynamic Table */}
            {loading && (
              <p className="text-center text-yellow-600 mt-6">
                ⏳ Processing your request...
              </p>
            )}

          {responseData.length > 0 && (
  <div className="overflow-x-auto mt-10 border rounded-xl shadow max-h-[400px] overflow-y-auto">
    <table className="min-w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((key) => (
            <th
              key={key}
              className="border px-4 py-2 text-left font-semibold"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {responseData.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((key) => (
              <td
                key={key}
                className="border px-4 py-2 max-w-[250px] truncate"
              >
                {typeof row[key] === "object" ? (
                  <details className="cursor-pointer">
                    <summary className="text-blue-600">View</summary>
                    <pre className="text-xs bg-gray-50 p-2 rounded max-h-40 overflow-auto">
                      {JSON.stringify(row[key], null, 2)}
                    </pre>
                  </details>
                ) : (
                  String(row[key] ?? "-")
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

          </div>
        </div>
      )}
    </>
  );
}
