import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar />

      <div className="flex-grow pl-60 pr-16">
        <TopNavbar />
        <main className="pt-20 px-8">
          {/* Renders the matched nested route here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
