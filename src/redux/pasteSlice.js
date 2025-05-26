import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

let pastes = [];
try {
  const stored = localStorage.getItem("pastes"); // yes pastes m data kaha se aara 
  if (stored && stored !== "undefined") {
    pastes = JSON.parse(stored);
  }
} catch (error) {
  console.error("Failed to parse localStorage data:", error);
}

const initialState = {
  pastes: pastes,  
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Success message!");
    },
    updateToPaste: (state, action) => {
        const updatedPaste = action.payload;
        const index = state.pastes.findIndex((p) => p._id === updatedPaste._id);
        if (index !== -1) {
            state.pastes[index] = updatedPaste;
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
        }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes removed!");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed!");
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
