import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loader from '../components/Loader';

// Lazy-loaded page components (code splitting for performance)
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ChannelPage = lazy(() => import('../pages/ChannelPage'));
const CreateChannel = lazy(() => import('../pages/CreateChannel'));
const UploadVideo = lazy(() => import('../pages/UploadVideo'));
const EditVideoPage = lazy(() => import('../pages/EditVideoPage'));
const VideoWatchPage = lazy(() => import('../pages/VideoWatchPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRouter = ({ isAuthenticated }) => {
  const location = useLocation(); // track current location (useful for redirects)

  return (
    // Suspense shows loader while lazy-loaded components are being fetched
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoWatchPage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              // If already logged in, redirect back to previous page or home
              <Navigate to={location.state?.from?.pathname || '/'} replace />
            )
          }
        />

        {/* Register route */}
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to={location.state?.from?.pathname || '/'} replace />
            )
          }
        />

        {/* Protected routes (only accessible if authenticated) */}
        <Route
          path="/create-channel"
          element={
            isAuthenticated ? (
              <CreateChannel />
            ) : (
              // If not logged in, redirect to login and remember original location
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
        <Route
          path="/upload-video/:id"
          element={
            isAuthenticated ? (
              <UploadVideo />
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
        <Route
          path="/videos/:id/edit"
          element={
            isAuthenticated ? (
              <EditVideoPage />
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;