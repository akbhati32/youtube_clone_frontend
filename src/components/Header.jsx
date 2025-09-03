import { FiMoreVertical } from 'react-icons/fi';
import { Menu, Plus, LogIn, Tv, CircleUserRound } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../features/ui/uiSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchBar from './SearchBar';

// Header & Nav bar
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Extract user channels safely
  const userChannels = user?.channels || [];
  const hasChannel = userChannels.length > 0;

  // Handle case where channels may be stored as string IDs or objects
  const myChannelId =
    hasChannel && typeof userChannels[0] === "string"
      ? userChannels[0]
      : userChannels[0]?._id;

  // Auto-redirect to create-channel page if user is on channel route but has no channel
  useEffect(() => {
    if (!user) return;
    if (!hasChannel && location.pathname.startsWith("/channel/")) {
      const currentChannelId = location.pathname.split("/channel/")[1];

      if (!myChannelId || currentChannelId === myChannelId) {
        navigate("/create-channel", { replace: true });
      }
    }
  }, [user, location.pathname, navigate, hasChannel, myChannelId,]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white px-2 sm:px-4 md:px-6 flex items-center justify-between">
      {/* Left section: sidebar toggle + logo */}
      <div className="flex items-center gap-1 sm:gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-2xl hover:bg-gray-200 rounded-full p-2 transition cursor-pointer"
        >
          <Menu strokeWidth={1.25} />
        </button>
        <Link to="/" className="flex items-center">
          <img
            src="/yt_nav.png"
            alt="Logo"
            className="w-[70px] h-[50px] sm:w-[90px] sm:h-[65px] object-contain select-none"
          />
        </Link>
      </div>

      {/* Center section: search bar (only on home & video detail pages) */}
      {location.pathname === "/" || location.pathname.startsWith("/video/") ? (
        <SearchBar  />
      ) : null}

      {/* Right section: auth & channel actions */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-fit">
        {!user ? (
          // If not logged in → show sign-in button
          <Link
            to="/login"
            state={{ from: location }}
            className="flex items-center cursor-pointer px-3 py-1 border border-gray-200 text-blue-600 rounded-full hover:bg-blue-200 sm:px-4 sm:py-2"
          >
            <CircleUserRound className="w-5 h-5 mr-2" />
            <span className="text-sm sm:inline">Sign in</span>
          </Link>
        ) : (
          <>
            {/* Mobile dropdown toggle */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="sm:hidden p-2 rounded-full"
                aria-label="Toggle menu"
              >
                <FiMoreVertical className="text-xl" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {/* Profile info */}
                  <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-100">
                    <img
                      src={user?.profilePic?.trim() ? user.profilePic : '/default-avatar.jpg'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                    <span className="text-sm font-medium truncate">
                      {user.username}
                    </span>
                  </div>

                  {/* My Channel / Create Channel */}
                  {hasChannel ? (
                    <button
                      onClick={() => {
                        navigate(`/channel/${myChannelId}`);
                        setShowDropdown(false);
                      }}
                      className="flex gap-2 w-full text-left px-4 py-2 text-sm"
                    >
                      <Tv size={20} strokeWidth={1.25} /> My Channel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/create-channel");
                        setShowDropdown(false);
                      }}
                      className="flex gap-2 w-full text-left px-4 py-2 text-sm"
                    >
                      <Plus strokeWidth={1.25} /> Channel
                    </button>
                  )}

                  {/* Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="flex gap-2 w-full text-left px-4 py-2 text-sm"
                  >
                    <LogIn size={20} strokeWidth={1.25} /> Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Desktop: inline controls */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              <img
                src={user.profilePic || '/default-avatar.jpg'}
                alt="Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-300 hidden md:flex"
              />
              <span className="hidden sm:inline text-sm font-medium text-gray-700 truncate max-w-[100px]">
                {user.username}
              </span>

              {/* My Channel / Create Channel */}
              {hasChannel ? (
                <button
                  onClick={() => navigate(`/channel/${myChannelId}`)}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-full transition whitespace-nowrap cursor-pointer"
                >
                  <Tv size={20} strokeWidth={1.25} />
                  <span className="hidden lg:inline">My Channel</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/create-channel')}
                  className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 sm:px-4 sm:py-2 text-sm transition whitespace-nowrap"
                >
                  <Plus strokeWidth={1.25} />
                  <span className="hidden lg:inline">Channel</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm transition whitespace-nowrap px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <LogIn size={20} strokeWidth={1.25} />
                <span className="hidden lg:inline">Sign out</span>
              </button>
            </div>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;