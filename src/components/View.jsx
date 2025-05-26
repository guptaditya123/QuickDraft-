import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function View() {
  const { id } = useParams(); // ✅ This reads /pastes/:id
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id.toString() === id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [paste]);

  if (!paste) {
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Paste not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-[95%] max-w-4xl mx-auto items-center font-sans">
      <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-between">
        <input
          type="text"
          disabled
          value={title}
          className="w-full sm:w-[70%] h-12 px-4 text-sm bg-[#2c2c3a] text-[#f1f1f1] border border-[#3c3c4e] rounded-xl focus:outline-none"
        />
      </div>

      <div className="w-full bg-[#2c2c3a] rounded-2xl p-4 shadow-inner border border-[#3c3c4e]">
        <textarea
          rows={18}
          value={content}
          disabled
          className="w-full h-full bg-transparent resize-none text-[#f1f1f1] placeholder-gray-400 focus:outline-none text-sm"
        ></textarea>
      </div>
    </div>
  );
}

export default View;
