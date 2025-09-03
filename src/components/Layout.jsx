import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  // Access sidebar state from Redux
  const { isSidebarOpen } = useSelector((state) => state.ui);

  return (
    <>
      <div className="flex">
        {/* Sidebar (collapsible/expandable) */}
        <Sidebar />

        {/* Main content area */}
        <main
          className={`
            flex-1 min-h-screen p-4 mt-14 transition-all duration-300
            ${isSidebarOpen ? 'lg:ml-60' : 'md:ml-20'}
          `}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;