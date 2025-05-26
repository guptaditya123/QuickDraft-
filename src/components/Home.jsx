import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const id = searchParam.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // This ensures paste loads correctly when in edit mode
  useEffect(() => {
    if (id && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id.toString() === id);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        // ID exists but not found in state, maybe invalid or not yet loaded
        console.warn("Paste not found for id:", id);
      }
    }
  }, [id, allPastes]);

useEffect(() => {
  if (!id) {
    setTitle("");
    setValue("");
  }
}, [id]);


  function createPaste() {
    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: id || Date.now().toString(), // ensure ID is a string
      createdAt: new Date().toISOString(),
    };

    if (id) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // Reset form and navigate back
   setTitle("");
    setValue("");
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-8 w-[95%] max-w-4xl mx-auto items-center font-sans">
      {/* Title and Button Row */}
      <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-between">
        <input
          type="text"
          placeholder="Enter your title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full sm:w-[70%] h-12 px-4 text-sm bg-[#2c2c3a] text-[#f1f1f1] border border-[#3c3c4e] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 transition-all"
        />
        <button
          onClick={createPaste}
          className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          {id ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* Text Area Box */}
      <div className="w-full bg-[#2c2c3a] rounded-2xl p-4 shadow-inner border border-[#3c3c4e]">
        <textarea
          rows={18}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full bg-transparent resize-none text-[#f1f1f1] placeholder-gray-400 focus:outline-none text-sm"
          placeholder="Start typing your paste here..."
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
