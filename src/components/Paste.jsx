import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, Share2, Clipboard, Eye } from "lucide-react";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <input
        type="search"
        placeholder="Search pastes"
        className="bg-[#3a3a4a] text-white rounded-lg p-2 w-full mb-6 sm:mb-8 text-sm sm:text-base"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-[#3a3a4a] rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 md:gap-6"
            >
              {/* Content section with max width for readability */}
              <div className="flex-1 break-words max-w-full md:max-w-[70%]">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{paste.title}</h2>
                <p className="text-gray-200 text-sm sm:text-base whitespace-pre-wrap">{paste.content}</p>
              </div>

              {/* Buttons container: wraps nicely on small screens */}
              <div className="flex flex-wrap justify-start md:justify-end gap-3 md:gap-4 max-w-full md:max-w-[30%]">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition hover:scale-105 flex items-center justify-center w-10 h-10"
                  onClick={() => dispatch(removeFromPaste(paste._id))}
                  aria-label="Delete paste"
                >
                  <Trash2 size={20} />
                </button>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2 transition hover:scale-105 flex items-center justify-center w-10 h-10"
                  onClick={() => navigate(`/?id=${paste._id}`)}
                  aria-label="Edit paste"
                >
                  <Edit3 size={20} />
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition hover:scale-105 flex items-center justify-center w-10 h-10"
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Shareable link copied!");
                  }}
                  aria-label="Copy shareable link"
                >
                  <Share2 size={20} />
                </button>

                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition hover:scale-105 flex items-center justify-center w-10 h-10"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!");
                  }}
                  aria-label="Copy content"
                >
                  <Clipboard size={20} />
                </button>

                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-2 transition hover:scale-105 flex items-center justify-center w-10 h-10"
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                  aria-label="View paste"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg mt-10">No pastes found</p>
        )}
      </div>
    </div>
  );
}

export default Paste;
