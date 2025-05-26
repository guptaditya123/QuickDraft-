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
    <div>
      <input
        type="search"
        placeholder="Search pastes"
        className="bg-[#3a3a4a] text-white rounded-lg p-2 w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="bg-[#3a3a4a] flex justify-between rounded-lg p-4 mb-4"
              >
                <div>
                  <h2 className="text-xl font-bold">{paste.title}</h2>
                  <p>{paste.content}</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition transform hover:scale-105"
                    onClick={() => dispatch(removeFromPaste(paste._id))}
                  >
                    <Trash2 size={20} />
                  </button>

                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2 transition transform hover:scale-105"
                    onClick={() => navigate(`/?id=${paste._id}`)}
                  >
                    <Edit3 size={20} />
                  </button>

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition transform hover:scale-105"
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Shareable link copied!");
                    }}
                  >
                    <Share2 size={20} />
                  </button>

                  <button
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition transform hover:scale-105"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <Clipboard size={20} />
                  </button>

                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-2 transition transform hover:scale-105 inline-flex items-center"
                    onClick={() => navigate(`/pastes/${paste._id}`)}
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No pastes found</p>
        )}
      </div>
    </div>
  );
}

export default Paste;
