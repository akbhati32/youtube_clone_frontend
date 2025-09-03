import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppRouter from './router/AppRouter';
import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggles sidebar (passed down to Header button)
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    // On app load, check if a token exists in localStorage
    const token = localStorage.getItem('token');

    // If token exists, try fetching the logged-in user
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  return (
    <>
      {/* Show header + sidebar */}
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      {/* Main layout wrapper that holds routed pages */}
      <Layout>
        {/* Pass down authentication state to handle protected routes */}
        <AppRouter isAuthenticated={!!user} />
      </Layout>

      {/* Toast notifications container (global) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;