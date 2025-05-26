import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import View from "./components/View";
import Navbar from "./components/Navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <Navbar />
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <Navbar />
          <View />
        </div>
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white font-sans flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl bg-[rgb(43,43,60)] rounded-2xl shadow-xl border border-[#3a3a4a] p-6">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
